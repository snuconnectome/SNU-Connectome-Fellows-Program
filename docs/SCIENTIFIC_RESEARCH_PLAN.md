# 🔬 Scientific Research Plan: Neuroscience Foundation Models

## Executive Summary

본 문서는 SNU Connectome Fellows Program의 핵심 연구 방향인 **Neuroscience Foundation Models** 개발을 위한 과학적 연구 계획을 제시합니다.

---

## 1. 연구 배경 및 동기

### 1.1 Foundation Models의 부상

2024-2025년, 신경과학 분야에서 Foundation Model 패러다임이 급부상했습니다:

```
Traditional Approach          Foundation Model Approach
─────────────────────         ─────────────────────────
• Task-specific models        • Pre-trained on massive data
• Small datasets              • Zero-shot/few-shot transfer
• Limited generalization      • Universal representations
• Siloed experiments          • Cross-dataset learning
```

### 1.2 주요 선행 연구

| 모델 | 연도 | 핵심 기여 | 데이터 |
|------|------|----------|--------|
| **BrainLM** | 2024 | Autoregressive fMRI modeling | 6,700 hours |
| **Brain-JEPA** | 2024 | Joint-Embedding + Gradient Positioning | UK Biobank |
| **Brain Harmony** | 2025 | Morphology-Function 통합 | Multi-modal |
| **fMRI-LM** | 2025 | Language grounding | HCP + Narratives |

### 1.3 연구 격차 (Research Gap)

현재 연구들의 한계:
1. **단일 모달리티**: fMRI 또는 EEG만 단독 사용
2. **공학 중심**: 과학적 해석 부족
3. **생성 모델 부재**: 예측만 가능, 생성 불가
4. **표상 학습 제한**: 뇌의 공통 표상 미발견

---

## 2. 연구 목표

### 2.1 핵심 연구 질문

> **RQ1**: 다양한 신경 데이터 모달리티(fMRI, EEG, MEG, 단일 뉴런)로부터
> 공통된 뇌 표상(unified brain representation)을 학습할 수 있는가?

> **RQ2**: Foundation Model과 생성 모델(Diffusion, VAE)을 결합하여
> 뇌 활동을 예측하고 생성할 수 있는가?

> **RQ3**: 이러한 모델이 인간 뇌의 계산 원리를 밝히는 데 기여할 수 있는가?

### 2.2 연구 목표 체계

```
┌─────────────────────────────────────────────────────────────┐
│              Research Objective Hierarchy                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Ultimate Goal: 뇌의 계산 원리 이해                          │
│        │                                                     │
│        ├─► Long-term (5년): Unified Brain Foundation Model  │
│        │     • Multi-species, multi-scale                   │
│        │     • Interpretable representations                │
│        │                                                     │
│        ├─► Mid-term (2-3년): Multimodal + Generative FM    │
│        │     • fMRI + EEG + Language integration           │
│        │     • Brain activity generation                    │
│        │                                                     │
│        └─► Short-term (1년): Single-modality FM 재현/개선  │
│              • BrainLM, Brain-JEPA 재현                     │
│              • 새로운 데이터셋 적용                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 방법론

### 3.1 Phase 1: Foundation Model 재현 및 이해 (Year 1)

#### 3.1.1 BrainLM 재현

```python
# BrainLM Architecture Reproduction
class BrainLM(nn.Module):
    """
    Autoregressive Foundation Model for fMRI
    
    Architecture:
    - Transformer encoder-decoder
    - Temporal attention across TRs
    - ROI-level tokenization
    """
    
    def __init__(self, 
                 num_rois: int = 400,      # Schaefer parcellation
                 d_model: int = 768,
                 n_heads: int = 12,
                 n_layers: int = 12,
                 max_seq_len: int = 512):
        super().__init__()
        
        # ROI embedding
        self.roi_embed = nn.Linear(num_rois, d_model)
        
        # Positional encoding (temporal)
        self.pos_encoding = SinusoidalPositionalEncoding(d_model, max_seq_len)
        
        # Transformer layers
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model, n_heads, dim_feedforward=3072),
            num_layers=n_layers
        )
        
        # Prediction head
        self.predict_head = nn.Linear(d_model, num_rois)
        
    def forward(self, x, mask=None):
        """
        x: (batch, time, num_rois) - fMRI time series
        returns: (batch, time, num_rois) - predicted next states
        """
        x = self.roi_embed(x)
        x = x + self.pos_encoding(x)
        x = self.transformer(x, mask=mask)
        return self.predict_head(x)
```

#### 3.1.2 Brain-JEPA 재현

```python
# Brain-JEPA: Joint-Embedding Predictive Architecture
class BrainJEPA(nn.Module):
    """
    JEPA for brain dynamics
    
    Key innovations:
    - Gradient positioning encoding
    - Spatiotemporal masking
    - Latent space prediction (not pixel-level)
    """
    
    def __init__(self):
        super().__init__()
        
        # Context encoder (online)
        self.context_encoder = TransformerEncoder(...)
        
        # Target encoder (EMA updated)
        self.target_encoder = TransformerEncoder(...)
        
        # Predictor network
        self.predictor = TransformerDecoder(...)
        
        # Gradient positioning
        self.gradient_pos = GradientPositionalEncoding()
        
    def forward(self, x, mask_context, mask_target):
        """
        x: brain data (batch, time, space)
        
        Training objective:
        - Mask parts of the data
        - Predict masked regions in LATENT space
        - EMA update target encoder
        """
        # Context: unmasked regions
        context = self.context_encoder(x * mask_context)
        
        # Target: masked regions (stop gradient)
        with torch.no_grad():
            target = self.target_encoder(x * mask_target)
        
        # Predict targets from context
        predictions = self.predictor(context, target_positions)
        
        return F.mse_loss(predictions, target.detach())
```

### 3.2 Phase 2: Multimodal Integration (Year 2)

#### 3.2.1 Cross-Modal Alignment

```python
class MultimodalBrainFM(nn.Module):
    """
    Multimodal Brain Foundation Model
    
    Modalities:
    - fMRI: BOLD signal, low temporal resolution
    - EEG: Electrical activity, high temporal resolution
    - MEG: Magnetic fields, source-localized
    - Language: Stimulus transcripts
    """
    
    def __init__(self):
        super().__init__()
        
        # Modality-specific encoders
        self.fmri_encoder = BrainLM(...)
        self.eeg_encoder = EEGNet(...)
        self.meg_encoder = MEGTransformer(...)
        self.language_encoder = WhisperEncoder(...)  # or LLM
        
        # Shared latent space projectors
        self.fmri_proj = nn.Linear(768, 512)
        self.eeg_proj = nn.Linear(256, 512)
        self.meg_proj = nn.Linear(512, 512)
        self.lang_proj = nn.Linear(1024, 512)
        
        # Cross-modal attention
        self.cross_attention = CrossModalAttention(512, 8)
        
    def align_representations(self, fmri, eeg, language):
        """
        Align representations across modalities using:
        1. Contrastive learning (CLIP-like)
        2. Cross-modal attention
        3. Joint embedding space
        """
        # Encode each modality
        z_fmri = self.fmri_proj(self.fmri_encoder(fmri))
        z_eeg = self.eeg_proj(self.eeg_encoder(eeg))
        z_lang = self.lang_proj(self.language_encoder(language))
        
        # Cross-modal alignment loss
        loss_fmri_eeg = contrastive_loss(z_fmri, z_eeg)
        loss_fmri_lang = contrastive_loss(z_fmri, z_lang)
        
        return loss_fmri_eeg + loss_fmri_lang
```

### 3.3 Phase 3: Generative Brain Model (Year 2-3)

#### 3.3.1 Diffusion-based Brain Generation

```python
class BrainDiffusion(nn.Module):
    """
    Latent Diffusion Model for Brain Activity Generation
    
    Capabilities:
    1. Unconditional brain activity generation
    2. Stimulus-conditioned generation (image → brain)
    3. Language-conditioned generation (text → brain)
    4. Brain-to-brain translation
    """
    
    def __init__(self):
        super().__init__()
        
        # Variational encoder (compress to latent)
        self.encoder = BrainVAE(...)
        
        # Diffusion model in latent space
        self.unet = UNet3D(
            in_channels=64,   # Latent channels
            out_channels=64,
            time_embed_dim=256,
            condition_dim=512  # For conditioning
        )
        
        # Decoder (latent → brain)
        self.decoder = BrainDecoder(...)
        
    def forward(self, brain_data, condition=None, timestep=None):
        """
        Training: Learn to denoise
        Inference: Generate brain activity from noise
        """
        # Encode to latent
        z = self.encoder(brain_data)
        
        # Add noise
        noise = torch.randn_like(z)
        noisy_z = self.add_noise(z, noise, timestep)
        
        # Predict noise (conditioned)
        pred_noise = self.unet(noisy_z, timestep, condition)
        
        return F.mse_loss(pred_noise, noise)
    
    @torch.no_grad()
    def generate(self, condition=None, steps=50):
        """Generate brain activity from condition"""
        z = torch.randn(1, 64, T, H, W)
        
        for t in reversed(range(steps)):
            pred_noise = self.unet(z, t, condition)
            z = self.denoise_step(z, pred_noise, t)
        
        brain_activity = self.decoder(z)
        return brain_activity
```

---

## 4. 데이터셋

### 4.1 사용 데이터셋

| 데이터셋 | 모달리티 | 크기 | 용도 |
|----------|----------|------|------|
| **UK Biobank** | fMRI | 50,000+ subjects | Pre-training |
| **HCP** | fMRI, MEG | 1,200 subjects | Multi-modal |
| **Narratives** | fMRI + Audio | 345 subjects | Language alignment |
| **THINGS-EEG** | EEG | 50 subjects | Vision-brain |
| **NSD** | fMRI | 8 subjects (dense) | Image reconstruction |

### 4.2 데이터 전처리 파이프라인

```python
class BrainDataPipeline:
    """Standard preprocessing for brain data"""
    
    def preprocess_fmri(self, bold_img):
        """
        1. Motion correction
        2. Spatial normalization (MNI)
        3. Temporal filtering (0.01-0.1 Hz)
        4. Parcellation (Schaefer 400)
        5. Z-score normalization
        """
        pass
    
    def preprocess_eeg(self, raw_eeg):
        """
        1. Bandpass filter (0.1-100 Hz)
        2. ICA artifact removal
        3. Re-referencing (average)
        4. Epoching
        5. Time-frequency decomposition
        """
        pass
```

---

## 5. 평가 지표

### 5.1 Downstream Tasks

| Task | Metric | Baseline | Target |
|------|--------|----------|--------|
| **Brain State Prediction** | Accuracy | 75% | 90% |
| **Disease Classification** | AUC-ROC | 0.70 | 0.85 |
| **Age Prediction** | MAE | 5.0 years | 3.0 years |
| **Cognitive Score Prediction** | r² | 0.30 | 0.50 |
| **Language Decoding** | BLEU | 0.10 | 0.30 |

### 5.2 Representation Quality

```python
def evaluate_representations(model, data):
    """
    Representation quality metrics
    """
    metrics = {
        # Linear probe accuracy
        'linear_probe': linear_probe_eval(model, data),
        
        # Brain-model alignment
        'brain_alignment': compute_rsa_correlation(model, data),
        
        # Cross-dataset transfer
        'transfer_acc': cross_dataset_eval(model, data),
        
        # Generalization to new subjects
        'subject_generalization': leave_one_out_eval(model, data),
    }
    return metrics
```

---

## 6. 예상 기여

### 6.1 과학적 기여

1. **Unified Brain Representation**
   - 다양한 모달리티를 통합하는 공통 뇌 표상 발견
   - 뇌의 계산 원리에 대한 새로운 통찰

2. **Generative Understanding**
   - 뇌 활동 패턴의 생성적 이해
   - Stimulus-response 관계의 인과적 모델링

3. **Interpretability**
   - Foundation Model의 내부 표상 분석
   - 신경과학적 해석 가능성

### 6.2 기술적 기여

1. **Open-source Models**: BrainLM, Brain-JEPA 한국어 문서화 및 개선
2. **Benchmark Suite**: 신경과학 FM 평가 벤치마크 개발
3. **Pre-trained Checkpoints**: 한국인 데이터 기반 fine-tuning

---

## 7. 타임라인

```
Year 1 (2025-2026)
├── Q1: BrainLM 재현 및 이해
├── Q2: Brain-JEPA 재현 및 한국 데이터 적용
├── Q3: 멀티모달 데이터 수집 및 전처리
└── Q4: 첫 번째 논문 투고 (재현 + 개선)

Year 2 (2026-2027)
├── Q1: Multimodal alignment 연구 시작
├── Q2: Generative model 개발
├── Q3: 대규모 실험 및 평가
└── Q4: 주요 학회 논문 투고 (NeurIPS/ICLR)

Year 3 (2027-2028)
├── Q1: Unified Brain FM 개발
├── Q2: 과학적 해석 연구
├── Q3: 임상 응용 탐색
└── Q4: 최종 논문 (Nature/Science 계열)
```

---

## 8. 협력 연구

### 8.1 국제 협력

- **Princeton (Hasson Lab)**: Language-brain alignment
- **BNL (유신재/박기태)**: Brain imaging analysis
- **MIT (Poggio Lab)**: Computational theory
- **Stanford (Yamins Lab)**: Neural network-brain comparison

### 8.2 국내 협력

- **KAIST 뇌인지공학과**: EEG/BCI 연구
- **고려대 뇌공학과**: Brain-computer interface
- **삼성서울병원**: 임상 데이터

---

## 참고 문헌

1. Caro, J.O. et al. (2024). BrainLM: A foundation model for brain activity recordings. ICLR.
2. Dong, X. et al. (2024). Brain-JEPA: Brain Dynamics Foundation Model with Gradient Positioning. NeurIPS.
3. (2025). Brain Harmony: A Multimodal Foundation Model. NeurIPS.
4. (2025). Foundation model of neural activity predicts response to new stimulus types. Nature.
5. Hasson, U. et al. (2022). Shared computational principles for language processing. Nature Neuroscience.

---

*Document Version: 1.0*
*Last Updated: December 2025*




