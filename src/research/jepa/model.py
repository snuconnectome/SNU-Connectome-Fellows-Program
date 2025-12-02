"""
Brain-JEPA: Joint-Embedding Predictive Architecture for Brain Dynamics
=======================================================================

Implementation based on:
"Brain-JEPA: Brain Dynamics Foundation Model with Gradient Positioning"
NeurIPS 2024

Key innovations:
1. Predicts in latent space (not pixel space) for robustness
2. Gradient positioning encoding for spatial structure
3. Spatiotemporal masking strategies
4. EMA-updated target encoder
"""

import math
import copy
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Optional, Tuple, Dict, List
from einops import rearrange, repeat

from .config import BrainJEPAConfig


class GradientPositionalEncoding(nn.Module):
    """
    Gradient-based positional encoding for brain ROIs.
    
    Encodes the spatial position of ROIs based on their
    anatomical gradient (e.g., anterior-posterior, dorsal-ventral).
    """
    
    def __init__(self, d_model: int, num_rois: int = 400, gradient_dim: int = 64):
        super().__init__()
        
        self.d_model = d_model
        self.num_rois = num_rois
        self.gradient_dim = gradient_dim
        
        # Learnable gradient embeddings
        # In practice, these would be initialized from brain atlases
        self.gradient_embed = nn.Parameter(
            torch.randn(1, num_rois, gradient_dim)
        )
        
        # Project to model dimension
        self.projection = nn.Linear(gradient_dim, d_model)
    
    def forward(self, batch_size: int) -> torch.Tensor:
        """
        Args:
            batch_size: Batch size
        Returns:
            (batch, num_rois, d_model) - Gradient positional encodings
        """
        grad_pos = repeat(self.gradient_embed, '1 r g -> b r g', b=batch_size)
        return self.projection(grad_pos)


class TemporalPositionalEncoding(nn.Module):
    """Sinusoidal temporal positional encoding."""
    
    def __init__(self, d_model: int, max_len: int = 5000):
        super().__init__()
        
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        
        self.register_buffer('pe', pe.unsqueeze(0))
    
    def forward(self, seq_len: int) -> torch.Tensor:
        """Returns (1, seq_len, d_model)"""
        return self.pe[:, :seq_len]


class MaskGenerator:
    """
    Generates masks for JEPA training.
    
    Supports multiple masking strategies:
    - cross_region: Mask entire brain regions
    - cross_time: Mask entire time windows
    - dual: Combine both strategies
    """
    
    def __init__(
        self,
        num_rois: int,
        seq_len: int,
        mask_ratio: float = 0.5,
        min_patches: int = 4,
        max_patches: int = 16,
        strategy: str = "dual",
    ):
        self.num_rois = num_rois
        self.seq_len = seq_len
        self.mask_ratio = mask_ratio
        self.min_patches = min_patches
        self.max_patches = max_patches
        self.strategy = strategy
    
    def generate(self, batch_size: int, device: torch.device) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Generate context and target masks.
        
        Returns:
            context_mask: (batch, seq_len, num_rois) - 1 for visible
            target_mask: (batch, seq_len, num_rois) - 1 for target
        """
        if self.strategy == "cross_region":
            return self._cross_region_mask(batch_size, device)
        elif self.strategy == "cross_time":
            return self._cross_time_mask(batch_size, device)
        else:  # dual
            return self._dual_mask(batch_size, device)
    
    def _cross_region_mask(
        self, 
        batch_size: int, 
        device: torch.device
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """Mask entire brain regions across all time points."""
        num_masked = int(self.num_rois * self.mask_ratio)
        
        masks = []
        for _ in range(batch_size):
            # Random ROIs to mask
            masked_rois = torch.randperm(self.num_rois)[:num_masked]
            mask = torch.ones(self.seq_len, self.num_rois, device=device)
            mask[:, masked_rois] = 0
            masks.append(mask)
        
        context_mask = torch.stack(masks)
        target_mask = 1 - context_mask
        
        return context_mask, target_mask
    
    def _cross_time_mask(
        self, 
        batch_size: int, 
        device: torch.device
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """Mask entire time windows across all ROIs."""
        num_masked = int(self.seq_len * self.mask_ratio)
        
        masks = []
        for _ in range(batch_size):
            # Random time points to mask
            masked_times = torch.randperm(self.seq_len)[:num_masked]
            mask = torch.ones(self.seq_len, self.num_rois, device=device)
            mask[masked_times, :] = 0
            masks.append(mask)
        
        context_mask = torch.stack(masks)
        target_mask = 1 - context_mask
        
        return context_mask, target_mask
    
    def _dual_mask(
        self, 
        batch_size: int, 
        device: torch.device
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """Combine region and time masking."""
        # Mask some regions
        num_masked_rois = int(self.num_rois * self.mask_ratio / 2)
        num_masked_times = int(self.seq_len * self.mask_ratio / 2)
        
        masks = []
        for _ in range(batch_size):
            mask = torch.ones(self.seq_len, self.num_rois, device=device)
            
            # Mask some ROIs
            masked_rois = torch.randperm(self.num_rois)[:num_masked_rois]
            mask[:, masked_rois] = 0
            
            # Mask some time points
            masked_times = torch.randperm(self.seq_len)[:num_masked_times]
            mask[masked_times, :] = 0
            
            masks.append(mask)
        
        context_mask = torch.stack(masks)
        target_mask = 1 - context_mask
        
        return context_mask, target_mask


class TransformerEncoder(nn.Module):
    """Transformer encoder for context/target encoding."""
    
    def __init__(
        self,
        d_model: int,
        n_heads: int,
        n_layers: int,
        d_ff: int,
        dropout: float = 0.1,
    ):
        super().__init__()
        
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model,
            nhead=n_heads,
            dim_feedforward=d_ff,
            dropout=dropout,
            activation='gelu',
            batch_first=True,
            norm_first=True,  # Pre-norm
        )
        
        self.layers = nn.TransformerEncoder(
            encoder_layer,
            num_layers=n_layers,
        )
        
        self.norm = nn.LayerNorm(d_model)
    
    def forward(self, x: torch.Tensor, mask: Optional[torch.Tensor] = None) -> torch.Tensor:
        """
        Args:
            x: (batch, seq_len, d_model)
            mask: Optional attention mask
        Returns:
            (batch, seq_len, d_model)
        """
        x = self.layers(x, src_key_padding_mask=mask)
        return self.norm(x)


class Predictor(nn.Module):
    """
    Predictor network for JEPA.
    
    Predicts target representations from context representations
    given the positions of targets.
    """
    
    def __init__(
        self,
        d_model: int,
        hidden_dim: int,
        n_layers: int,
        n_heads: int,
        dropout: float = 0.1,
    ):
        super().__init__()
        
        self.target_tokens = nn.Parameter(torch.randn(1, 1, d_model))
        
        # Cross-attention layers
        self.layers = nn.ModuleList([
            nn.TransformerDecoderLayer(
                d_model=d_model,
                nhead=n_heads,
                dim_feedforward=hidden_dim * 4,
                dropout=dropout,
                activation='gelu',
                batch_first=True,
                norm_first=True,
            )
            for _ in range(n_layers)
        ])
        
        self.norm = nn.LayerNorm(d_model)
        self.projection = nn.Linear(d_model, d_model)
    
    def forward(
        self,
        context: torch.Tensor,
        target_positions: torch.Tensor,
    ) -> torch.Tensor:
        """
        Args:
            context: (batch, context_len, d_model) - Encoded context
            target_positions: (batch, target_len, d_model) - Target position encodings
            
        Returns:
            (batch, target_len, d_model) - Predicted target representations
        """
        batch_size, target_len, _ = target_positions.shape
        
        # Initialize target tokens
        targets = repeat(self.target_tokens, '1 1 d -> b n d', b=batch_size, n=target_len)
        targets = targets + target_positions
        
        # Cross-attend to context
        for layer in self.layers:
            targets = layer(targets, context)
        
        targets = self.norm(targets)
        return self.projection(targets)


class BrainJEPA(nn.Module):
    """
    Brain-JEPA: Joint-Embedding Predictive Architecture for Brain Dynamics
    
    Key differences from standard masked autoencoders:
    1. Predicts in latent space, not input space
    2. Target encoder is EMA-updated (stop gradient)
    3. Uses gradient-based positional encoding
    4. Multiple masking strategies for robustness
    """
    
    def __init__(self, config: BrainJEPAConfig):
        super().__init__()
        self.config = config
        
        # Input projection
        self.input_proj = nn.Linear(config.num_rois, config.d_model)
        
        # Positional encodings
        self.temporal_pos = TemporalPositionalEncoding(config.d_model, config.max_seq_len)
        
        if config.use_gradient_pos:
            self.gradient_pos = GradientPositionalEncoding(
                config.d_model,
                config.num_rois,
                config.gradient_pos_dim
            )
        
        # Context encoder (online)
        self.context_encoder = TransformerEncoder(
            config.d_model,
            config.n_heads,
            config.n_encoder_layers,
            config.d_ff,
            config.dropout,
        )
        
        # Target encoder (EMA updated, no gradients)
        self.target_encoder = TransformerEncoder(
            config.d_model,
            config.n_heads,
            config.n_encoder_layers,
            config.d_ff,
            config.dropout,
        )
        
        # Initialize target encoder as copy of context encoder
        self.target_encoder.load_state_dict(self.context_encoder.state_dict())
        for param in self.target_encoder.parameters():
            param.requires_grad = False
        
        # Predictor
        self.predictor = Predictor(
            config.d_model,
            config.predictor_hidden_dim,
            config.n_predictor_layers,
            config.n_heads,
            config.dropout,
        )
        
        # Mask generator
        self.mask_generator = MaskGenerator(
            config.num_rois,
            config.max_seq_len,
            config.mask_ratio,
            config.min_mask_patches,
            config.max_mask_patches,
            config.mask_strategy,
        )
    
    @torch.no_grad()
    def _update_target_encoder(self):
        """Update target encoder with EMA."""
        for param_q, param_k in zip(
            self.context_encoder.parameters(),
            self.target_encoder.parameters()
        ):
            param_k.data = (
                self.config.ema_decay * param_k.data +
                (1 - self.config.ema_decay) * param_q.data
            )
    
    def _prepare_input(self, x: torch.Tensor) -> torch.Tensor:
        """Prepare input with positional encodings."""
        batch_size, seq_len, num_rois = x.shape
        
        # Project input
        x = self.input_proj(x)  # (batch, seq_len, d_model)
        
        # Add temporal position
        x = x + self.temporal_pos(seq_len)
        
        # Add gradient position (if using)
        if self.config.use_gradient_pos:
            # Average gradient pos across time for simplicity
            grad_pos = self.gradient_pos(batch_size)
            x = x + grad_pos.mean(dim=1, keepdim=True)
        
        return x
    
    def forward(
        self,
        x: torch.Tensor,
        context_mask: Optional[torch.Tensor] = None,
        target_mask: Optional[torch.Tensor] = None,
    ) -> Dict[str, torch.Tensor]:
        """
        Forward pass.
        
        Args:
            x: (batch, seq_len, num_rois) - fMRI time series
            context_mask: (batch, seq_len, num_rois) - 1 for context
            target_mask: (batch, seq_len, num_rois) - 1 for target
            
        Returns:
            Dict with predictions, targets, and embeddings
        """
        batch_size, seq_len, _ = x.shape
        
        # Generate masks if not provided
        if context_mask is None or target_mask is None:
            context_mask, target_mask = self.mask_generator.generate(
                batch_size, x.device
            )
        
        # Prepare input
        x_prepared = self._prepare_input(x)
        
        # Encode context (visible parts)
        context_input = x_prepared * context_mask.unsqueeze(-1).float()
        context_encoded = self.context_encoder(context_input)
        
        # Encode targets (with EMA encoder, no gradient)
        with torch.no_grad():
            target_input = x_prepared * target_mask.unsqueeze(-1).float()
            target_encoded = self.target_encoder(target_input)
        
        # Get target positions for predictor
        target_positions = self.temporal_pos(seq_len).expand(batch_size, -1, -1)
        target_positions = target_positions * target_mask.any(dim=-1, keepdim=True).float()
        
        # Predict targets from context
        predictions = self.predictor(context_encoded, target_positions)
        
        return {
            "predictions": predictions,
            "targets": target_encoded.detach(),
            "context_encoded": context_encoded,
            "context_mask": context_mask,
            "target_mask": target_mask,
        }
    
    def compute_loss(
        self,
        x: torch.Tensor,
        context_mask: Optional[torch.Tensor] = None,
        target_mask: Optional[torch.Tensor] = None,
    ) -> Dict[str, torch.Tensor]:
        """
        Compute JEPA loss.
        
        Loss is computed in latent space on target positions only.
        """
        outputs = self.forward(x, context_mask, target_mask)
        
        predictions = outputs["predictions"]
        targets = outputs["targets"]
        target_mask = outputs["target_mask"]
        
        # Only compute loss on target positions
        target_positions = target_mask.any(dim=-1)  # (batch, seq_len)
        
        # Gather predictions and targets at target positions
        pred_targets = predictions[target_positions]
        true_targets = targets[target_positions]
        
        # Loss
        if self.config.loss_type == "mse":
            loss = F.mse_loss(pred_targets, true_targets)
        elif self.config.loss_type == "smooth_l1":
            loss = F.smooth_l1_loss(pred_targets, true_targets)
        elif self.config.loss_type == "cosine":
            loss = 1 - F.cosine_similarity(pred_targets, true_targets, dim=-1).mean()
        else:
            loss = F.mse_loss(pred_targets, true_targets)
        
        # Update target encoder
        self._update_target_encoder()
        
        return {
            "loss": loss,
            "pred_targets": pred_targets,
            "true_targets": true_targets,
        }
    
    @torch.no_grad()
    def get_embeddings(
        self,
        x: torch.Tensor,
        pooling: str = "mean",
    ) -> torch.Tensor:
        """Extract embeddings for downstream tasks."""
        x_prepared = self._prepare_input(x)
        encoded = self.context_encoder(x_prepared)
        
        if pooling == "mean":
            return encoded.mean(dim=1)
        elif pooling == "cls":
            return encoded[:, 0]
        else:
            return encoded


