"""
BrainLM: Foundation Model for Brain Activity Recordings
========================================================

Implementation based on:
"BrainLM: A foundation model for brain activity recordings"
Caro et al., ICLR 2024

This is a scaffold implementation for the Connectome Fellows Program.
Fellows will extend and improve this baseline.
"""

import math
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Optional, Tuple, Dict, Any
from einops import rearrange, repeat

from .config import BrainLMConfig


class SinusoidalPositionalEncoding(nn.Module):
    """Sinusoidal positional encoding for temporal dimension."""
    
    def __init__(self, d_model: int, max_len: int = 5000, dropout: float = 0.1):
        super().__init__()
        self.dropout = nn.Dropout(p=dropout)
        
        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.exp(
            torch.arange(0, d_model, 2) * (-math.log(10000.0) / d_model)
        )
        
        pe = torch.zeros(1, max_len, d_model)
        pe[0, :, 0::2] = torch.sin(position * div_term)
        pe[0, :, 1::2] = torch.cos(position * div_term)
        
        self.register_buffer('pe', pe)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Args:
            x: (batch, seq_len, d_model)
        Returns:
            (batch, seq_len, d_model)
        """
        x = x + self.pe[:, :x.size(1)]
        return self.dropout(x)


class LearnedPositionalEncoding(nn.Module):
    """Learned positional encoding."""
    
    def __init__(self, d_model: int, max_len: int = 5000, dropout: float = 0.1):
        super().__init__()
        self.dropout = nn.Dropout(p=dropout)
        self.pe = nn.Parameter(torch.randn(1, max_len, d_model))
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = x + self.pe[:, :x.size(1)]
        return self.dropout(x)


class ROIEmbedding(nn.Module):
    """
    Embed ROI-level fMRI signals into latent space.
    
    Each time point's ROI values are projected to d_model dimensions.
    """
    
    def __init__(self, num_rois: int, d_model: int, dropout: float = 0.1):
        super().__init__()
        self.projection = nn.Linear(num_rois, d_model)
        self.norm = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Args:
            x: (batch, seq_len, num_rois) - fMRI time series
        Returns:
            (batch, seq_len, d_model)
        """
        x = self.projection(x)
        x = self.norm(x)
        x = self.dropout(x)
        return x


class MultiHeadAttention(nn.Module):
    """Multi-head self-attention with optional causal masking."""
    
    def __init__(
        self,
        d_model: int,
        n_heads: int,
        dropout: float = 0.1,
        causal: bool = False,
    ):
        super().__init__()
        assert d_model % n_heads == 0
        
        self.d_model = d_model
        self.n_heads = n_heads
        self.head_dim = d_model // n_heads
        self.causal = causal
        
        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)
        self.out_proj = nn.Linear(d_model, d_model)
        
        self.dropout = nn.Dropout(dropout)
        self.scale = self.head_dim ** -0.5
    
    def forward(
        self,
        x: torch.Tensor,
        attention_mask: Optional[torch.Tensor] = None,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            x: (batch, seq_len, d_model)
            attention_mask: Optional mask
        Returns:
            output: (batch, seq_len, d_model)
            attention_weights: (batch, n_heads, seq_len, seq_len)
        """
        batch_size, seq_len, _ = x.shape
        
        # Project to Q, K, V
        q = self.q_proj(x)
        k = self.k_proj(x)
        v = self.v_proj(x)
        
        # Reshape for multi-head attention
        q = rearrange(q, 'b s (h d) -> b h s d', h=self.n_heads)
        k = rearrange(k, 'b s (h d) -> b h s d', h=self.n_heads)
        v = rearrange(v, 'b s (h d) -> b h s d', h=self.n_heads)
        
        # Compute attention scores
        scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale
        
        # Apply causal mask if needed
        if self.causal:
            causal_mask = torch.triu(
                torch.ones(seq_len, seq_len, device=x.device, dtype=torch.bool),
                diagonal=1
            )
            scores = scores.masked_fill(causal_mask, float('-inf'))
        
        # Apply attention mask if provided
        if attention_mask is not None:
            scores = scores.masked_fill(~attention_mask, float('-inf'))
        
        # Softmax and dropout
        attn_weights = F.softmax(scores, dim=-1)
        attn_weights = self.dropout(attn_weights)
        
        # Apply attention to values
        out = torch.matmul(attn_weights, v)
        out = rearrange(out, 'b h s d -> b s (h d)')
        
        # Output projection
        out = self.out_proj(out)
        
        return out, attn_weights


class TransformerBlock(nn.Module):
    """Transformer encoder block with pre-norm."""
    
    def __init__(
        self,
        d_model: int,
        n_heads: int,
        d_ff: int,
        dropout: float = 0.1,
        causal: bool = False,
    ):
        super().__init__()
        
        self.norm1 = nn.LayerNorm(d_model)
        self.attn = MultiHeadAttention(d_model, n_heads, dropout, causal)
        
        self.norm2 = nn.LayerNorm(d_model)
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_ff),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(d_ff, d_model),
            nn.Dropout(dropout),
        )
    
    def forward(
        self,
        x: torch.Tensor,
        attention_mask: Optional[torch.Tensor] = None,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            x: (batch, seq_len, d_model)
        Returns:
            output: (batch, seq_len, d_model)
            attention_weights: (batch, n_heads, seq_len, seq_len)
        """
        # Pre-norm attention
        normed = self.norm1(x)
        attn_out, attn_weights = self.attn(normed, attention_mask)
        x = x + attn_out
        
        # Pre-norm FFN
        x = x + self.ffn(self.norm2(x))
        
        return x, attn_weights


class BrainLM(nn.Module):
    """
    BrainLM: Foundation Model for Brain Activity Recordings
    
    A Transformer-based model that learns to predict brain activity
    patterns from fMRI time series data.
    
    Key Features:
    - ROI-level tokenization (Schaefer parcellation)
    - Autoregressive next-state prediction
    - Masked prediction (MLM-style)
    - Transfer learning to downstream tasks
    """
    
    def __init__(self, config: BrainLMConfig):
        super().__init__()
        self.config = config
        
        # ROI embedding
        self.roi_embedding = ROIEmbedding(
            config.num_rois,
            config.d_model,
            config.dropout
        )
        
        # CLS token
        if config.use_cls_token:
            self.cls_token = nn.Parameter(torch.randn(1, 1, config.d_model))
        
        # Positional encoding
        if config.pos_encoding_type == "sinusoidal":
            self.pos_encoding = SinusoidalPositionalEncoding(
                config.d_model,
                config.max_seq_len + 1,  # +1 for CLS
                config.dropout
            )
        else:
            self.pos_encoding = LearnedPositionalEncoding(
                config.d_model,
                config.max_seq_len + 1,
                config.dropout
            )
        
        # Transformer layers
        self.layers = nn.ModuleList([
            TransformerBlock(
                config.d_model,
                config.n_heads,
                config.d_ff,
                config.dropout,
                causal=True  # Autoregressive
            )
            for _ in range(config.n_layers)
        ])
        
        # Output head for next-state prediction
        self.output_norm = nn.LayerNorm(config.d_model)
        self.prediction_head = nn.Linear(config.d_model, config.num_rois)
        
        # Masked prediction head (optional)
        self.masked_head = nn.Linear(config.d_model, config.num_rois)
        
        # Initialize weights
        self.apply(self._init_weights)
    
    def _init_weights(self, module):
        """Initialize weights."""
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.LayerNorm):
            torch.nn.init.ones_(module.weight)
            torch.nn.init.zeros_(module.bias)
    
    def forward(
        self,
        x: torch.Tensor,
        mask: Optional[torch.Tensor] = None,
        return_attention: bool = False,
    ) -> Dict[str, torch.Tensor]:
        """
        Forward pass.
        
        Args:
            x: (batch, seq_len, num_rois) - fMRI time series
            mask: (batch, seq_len) - Mask for masked prediction
            return_attention: Whether to return attention weights
            
        Returns:
            Dict with:
            - predictions: (batch, seq_len, num_rois) - Predicted next states
            - hidden_states: (batch, seq_len, d_model) - Encoded representations
            - cls_embedding: (batch, d_model) - CLS token embedding (if used)
            - attention_weights: List of attention weights (if requested)
        """
        batch_size, seq_len, _ = x.shape
        
        # Embed ROIs
        hidden = self.roi_embedding(x)
        
        # Add CLS token
        if self.config.use_cls_token:
            cls_tokens = repeat(self.cls_token, '1 1 d -> b 1 d', b=batch_size)
            hidden = torch.cat([cls_tokens, hidden], dim=1)
        
        # Add positional encoding
        hidden = self.pos_encoding(hidden)
        
        # Transformer layers
        attention_weights = []
        for layer in self.layers:
            hidden, attn = layer(hidden)
            if return_attention:
                attention_weights.append(attn)
        
        # Normalize
        hidden = self.output_norm(hidden)
        
        # Split CLS and sequence
        if self.config.use_cls_token:
            cls_embedding = hidden[:, 0]
            hidden = hidden[:, 1:]
        else:
            cls_embedding = hidden.mean(dim=1)
        
        # Predict next states (autoregressive)
        predictions = self.prediction_head(hidden)
        
        # Masked predictions (if mask provided)
        masked_predictions = None
        if mask is not None:
            masked_predictions = self.masked_head(hidden)
        
        outputs = {
            "predictions": predictions,
            "hidden_states": hidden,
            "cls_embedding": cls_embedding,
        }
        
        if masked_predictions is not None:
            outputs["masked_predictions"] = masked_predictions
        
        if return_attention:
            outputs["attention_weights"] = attention_weights
        
        return outputs
    
    def compute_loss(
        self,
        x: torch.Tensor,
        mask: Optional[torch.Tensor] = None,
        autoregressive_weight: float = 0.7,
        masked_weight: float = 0.3,
    ) -> Dict[str, torch.Tensor]:
        """
        Compute training loss.
        
        Args:
            x: (batch, seq_len, num_rois)
            mask: (batch, seq_len) - 1 for masked positions
            autoregressive_weight: Weight for AR loss
            masked_weight: Weight for masked prediction loss
            
        Returns:
            Dict with total_loss and component losses
        """
        outputs = self.forward(x, mask=mask)
        
        # Autoregressive loss: predict x[t+1] from x[1:t]
        ar_predictions = outputs["predictions"][:, :-1]  # (batch, seq_len-1, num_rois)
        ar_targets = x[:, 1:]  # (batch, seq_len-1, num_rois)
        ar_loss = F.mse_loss(ar_predictions, ar_targets)
        
        # Masked prediction loss (if mask provided)
        masked_loss = torch.tensor(0.0, device=x.device)
        if mask is not None and "masked_predictions" in outputs:
            masked_pred = outputs["masked_predictions"]
            # Only compute loss on masked positions
            mask_expanded = mask.unsqueeze(-1).expand_as(x)
            masked_loss = F.mse_loss(
                masked_pred[mask_expanded.bool()],
                x[mask_expanded.bool()]
            )
        
        # Combine losses
        total_loss = autoregressive_weight * ar_loss + masked_weight * masked_loss
        
        return {
            "total_loss": total_loss,
            "ar_loss": ar_loss,
            "masked_loss": masked_loss,
        }
    
    @torch.no_grad()
    def get_embeddings(
        self,
        x: torch.Tensor,
        pooling: str = "cls",
    ) -> torch.Tensor:
        """
        Extract embeddings for downstream tasks.
        
        Args:
            x: (batch, seq_len, num_rois)
            pooling: "cls" or "mean"
            
        Returns:
            (batch, d_model) embeddings
        """
        outputs = self.forward(x)
        
        if pooling == "cls":
            return outputs["cls_embedding"]
        else:
            return outputs["hidden_states"].mean(dim=1)
    
    @torch.no_grad()
    def predict_future(
        self,
        x: torch.Tensor,
        steps: int = 10,
    ) -> torch.Tensor:
        """
        Autoregressively predict future brain states.
        
        Args:
            x: (batch, seq_len, num_rois) - Initial sequence
            steps: Number of future steps to predict
            
        Returns:
            (batch, steps, num_rois) - Predicted future states
        """
        predictions = []
        current = x
        
        for _ in range(steps):
            outputs = self.forward(current)
            next_pred = outputs["predictions"][:, -1:]  # (batch, 1, num_rois)
            predictions.append(next_pred)
            
            # Append prediction to input
            current = torch.cat([current, next_pred], dim=1)
            
            # Keep sequence length manageable
            if current.size(1) > self.config.max_seq_len:
                current = current[:, -self.config.max_seq_len:]
        
        return torch.cat(predictions, dim=1)


