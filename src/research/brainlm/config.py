"""
BrainLM Configuration
=====================

Configuration classes for BrainLM model architecture and training.
Based on: "BrainLM: A foundation model for brain activity recordings" (ICLR 2024)
"""

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class BrainLMConfig:
    """
    Configuration for BrainLM model.
    
    Architecture based on the original BrainLM paper with
    some modifications for improved performance.
    """
    
    # Model Architecture
    num_rois: int = 400  # Schaefer parcellation
    d_model: int = 768   # Hidden dimension
    n_heads: int = 12    # Attention heads
    n_layers: int = 12   # Transformer layers
    d_ff: int = 3072     # Feedforward dimension
    dropout: float = 0.1
    
    # Input Processing
    max_seq_len: int = 512   # Max time points
    patch_size: int = 1      # Temporal patch size
    use_cls_token: bool = True
    
    # Positional Encoding
    pos_encoding_type: str = "sinusoidal"  # or "learned"
    
    # Output
    prediction_horizon: int = 1  # Predict next N time points
    
    # Training
    learning_rate: float = 1e-4
    weight_decay: float = 0.01
    warmup_steps: int = 1000
    max_steps: int = 100000
    batch_size: int = 32
    gradient_accumulation_steps: int = 4
    
    # Masking (for MLM-style training)
    mask_ratio: float = 0.15
    mask_strategy: str = "random"  # or "temporal_block"
    
    # Data
    train_data_path: Optional[str] = None
    val_data_path: Optional[str] = None
    
    # Checkpointing
    checkpoint_dir: str = "checkpoints/brainlm"
    save_every_n_steps: int = 5000
    
    def __post_init__(self):
        """Validate configuration."""
        assert self.d_model % self.n_heads == 0, \
            f"d_model ({self.d_model}) must be divisible by n_heads ({self.n_heads})"
        assert self.mask_ratio > 0 and self.mask_ratio < 1, \
            f"mask_ratio must be in (0, 1), got {self.mask_ratio}"


@dataclass
class BrainLMDataConfig:
    """Configuration for BrainLM data processing."""
    
    # Parcellation
    parcellation: str = "schaefer_400"  # or "aal", "harvard_oxford"
    
    # Preprocessing
    bandpass_low: float = 0.01
    bandpass_high: float = 0.1
    standardize: bool = True
    detrend: bool = True
    
    # Confound regression
    confound_strategy: str = "simple"  # or "compcor", "full"
    
    # Augmentation
    temporal_jitter: float = 0.0
    roi_dropout: float = 0.0
    
    # Datasets
    datasets: List[str] = field(default_factory=lambda: [
        "hcp",
        "uk_biobank",
        "narratives",
    ])


@dataclass 
class BrainLMPretrainConfig:
    """Configuration for pretraining BrainLM."""
    
    model: BrainLMConfig = field(default_factory=BrainLMConfig)
    data: BrainLMDataConfig = field(default_factory=BrainLMDataConfig)
    
    # Pretraining objectives
    use_autoregressive: bool = True
    use_masked_prediction: bool = True
    autoregressive_weight: float = 0.7
    masked_weight: float = 0.3
    
    # Distributed training
    num_gpus: int = 1
    distributed_backend: str = "ddp"
    
    # Logging
    log_every_n_steps: int = 100
    wandb_project: Optional[str] = "brainlm-pretrain"
    wandb_entity: Optional[str] = None


@dataclass
class BrainLMFinetuneConfig:
    """Configuration for finetuning BrainLM on downstream tasks."""
    
    # Task
    task: str = "classification"  # or "regression", "sequence"
    num_classes: Optional[int] = None
    
    # Model
    pretrained_path: str = ""
    freeze_backbone: bool = False
    freeze_layers: int = 0  # Freeze first N layers
    
    # Head
    head_hidden_dims: List[int] = field(default_factory=lambda: [256])
    head_dropout: float = 0.1
    
    # Training
    learning_rate: float = 1e-5
    epochs: int = 50
    batch_size: int = 16
    early_stopping_patience: int = 10
    
    # Regularization
    label_smoothing: float = 0.0
    mixup_alpha: float = 0.0

