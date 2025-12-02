"""
Research Modules
================

Implementation scaffolds for Neuroscience Foundation Models:
- BrainLM: Autoregressive fMRI Foundation Model
- Brain-JEPA: Joint-Embedding Predictive Architecture
- Multimodal: Cross-modal brain representation learning
"""

from .brainlm.model import BrainLM
from .jepa.model import BrainJEPA

__all__ = ["BrainLM", "BrainJEPA"]


