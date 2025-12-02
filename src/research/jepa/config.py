"""
Brain-JEPA Configuration
========================

Configuration for Brain-JEPA model based on:
"Brain-JEPA: Brain Dynamics Foundation Model with Gradient Positioning"
NeurIPS 2024
"""

from dataclasses import dataclass, field
from typing import List, Optional, Literal


@dataclass
class BrainJEPAConfig:
    """Configuration for Brain-JEPA model."""
    
    # Architecture
    num_rois: int = 400
    d_model: int = 768
    n_heads: int = 12
    n_encoder_layers: int = 12
    n_predictor_layers: int = 6
    d_ff: int = 3072
    dropout: float = 0.1
    
    # Input
    max_seq_len: int = 512
    
    # JEPA-specific
    predictor_hidden_dim: int = 384
    ema_decay: float = 0.996  # EMA for target encoder
    
    # Gradient Positioning
    use_gradient_pos: bool = True
    gradient_pos_dim: int = 64
    
    # Masking Strategy
    mask_strategy: Literal[
        "cross_region", 
        "cross_time", 
        "dual"
    ] = "dual"
    mask_ratio: float = 0.5
    min_mask_patches: int = 4
    max_mask_patches: int = 16
    
    # Training
    learning_rate: float = 1e-4
    weight_decay: float = 0.04
    warmup_epochs: int = 10
    max_epochs: int = 100
    batch_size: int = 64
    
    # Loss
    loss_type: str = "smooth_l1"  # or "mse", "cosine"
    
    # Checkpointing
    checkpoint_dir: str = "checkpoints/brain_jepa"

