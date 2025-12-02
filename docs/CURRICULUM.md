# 📚 Fellows Curriculum: 체계적 연구 역량 개발

## 학습 로드맵

---

## 1. 교육 과정 개요

### 1.1 커리큘럼 구조

```
┌─────────────────────────────────────────────────────────────┐
│              Connectome Fellows Curriculum                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Year 1: Foundation Building                                 │
│  ├── Module 1: Computational Neuroscience Basics            │
│  ├── Module 2: Deep Learning for Brain Science              │
│  ├── Module 3: Brain Data Analysis                          │
│  └── Module 4: Research Methods & Ethics                    │
│                                                              │
│  Year 2: Advanced Research                                   │
│  ├── Module 5: Foundation Models                            │
│  ├── Module 6: Multimodal Learning                          │
│  ├── Module 7: Generative Models                            │
│  └── Module 8: Scientific Writing                           │
│                                                              │
│  Year 3: Independent Research                               │
│  ├── Independent Project                                    │
│  ├── Thesis/Publication                                     │
│  └── Mentorship of Junior Fellows                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Year 1: Foundation Building

### Module 1: Computational Neuroscience Basics (Month 1-2)

#### 학습 목표
- 뇌의 기본 구조와 기능 이해
- 신경 신호의 원리 학습
- 주요 뇌영상 기법 이해

#### 커리큘럼

| 주차 | 주제 | 자료 | 과제 |
|------|------|------|------|
| 1 | 신경과학 개론 | Kandel Ch.1-3 | Quiz |
| 2 | 뉴런과 시냅스 | Kandel Ch.4-6 | 리뷰 작성 |
| 3 | 감각 시스템 | Kandel Ch.21-23 | 발표 |
| 4 | 인지와 기억 | Kandel Ch.66-67 | 프로젝트 |
| 5 | fMRI 원리 | Huettel Ch.1-4 | 실습 |
| 6 | EEG/MEG 원리 | Luck Ch.1-3 | 실습 |
| 7 | 뇌 연결성 | Sporns Ch.1-3 | 분석 실습 |
| 8 | 종합 및 평가 | - | 시험 |

#### 필수 읽기
```
필독서:
─────────────────────────────────
1. Kandel, "Principles of Neural Science" (선택 장)
2. Huettel, "Functional Magnetic Resonance Imaging"
3. Luck, "An Introduction to the Event-Related Potential Technique"
4. Sporns, "Networks of the Brain"
─────────────────────────────────
```

### Module 2: Deep Learning for Brain Science (Month 3-4)

#### 학습 목표
- PyTorch 프레임워크 숙달
- 주요 딥러닝 아키텍처 이해
- 뇌 데이터에 적용하는 방법 학습

#### 커리큘럼

| 주차 | 주제 | 실습 | 프로젝트 |
|------|------|------|----------|
| 1 | PyTorch Basics | MNIST | - |
| 2 | CNNs | Brain Image Classification | Mini-project |
| 3 | RNNs/LSTMs | EEG Sequence Modeling | - |
| 4 | Transformers | Attention Mechanisms | Mini-project |
| 5 | Self-Supervised Learning | Contrastive Learning | - |
| 6 | Vision Transformers | ViT for Brain Images | - |
| 7 | Foundation Models | BrainLM 소개 | Final project |
| 8 | Project Presentations | - | 발표 |

#### 실습 코드

```python
# Week 1-2: Basic PyTorch for Brain Classification
import torch
import torch.nn as nn
from torchvision import models

class BrainClassifier(nn.Module):
    """
    fMRI slice 기반 뇌 상태 분류기
    """
    def __init__(self, num_classes=4):
        super().__init__()
        # Pre-trained ResNet backbone
        self.backbone = models.resnet18(pretrained=True)
        self.backbone.conv1 = nn.Conv2d(1, 64, 7, stride=2, padding=3)  # 1-channel input
        self.backbone.fc = nn.Linear(512, num_classes)
        
    def forward(self, x):
        return self.backbone(x)

# Training loop
def train_classifier(model, dataloader, optimizer, criterion):
    model.train()
    for batch_idx, (data, target) in enumerate(dataloader):
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
```

### Module 3: Brain Data Analysis (Month 5-6)

#### 학습 목표
- fMRI 전처리 파이프라인 구축
- EEG 신호 분석 기법 습득
- 통계적 분석 방법 학습

#### 실습 환경 설정

```python
# Brain Data Analysis Environment
required_packages = [
    # fMRI Analysis
    "nilearn>=0.10.0",
    "nibabel>=5.0.0",
    "fslpy>=3.0.0",
    
    # EEG Analysis
    "mne>=1.5.0",
    "mne-bids>=0.13",
    
    # Statistics
    "scipy>=1.11.0",
    "statsmodels>=0.14.0",
    "pingouin>=0.5.3",
    
    # Visualization
    "matplotlib>=3.8.0",
    "seaborn>=0.13.0",
    "plotly>=5.18.0",
]
```

#### fMRI 분석 실습

```python
# fMRI Preprocessing Pipeline
from nilearn import datasets, image, masking
from nilearn.glm.first_level import FirstLevelModel

class fMRIPipeline:
    """
    표준 fMRI 전처리 및 분석 파이프라인
    """
    
    def __init__(self, data_dir):
        self.data_dir = data_dir
        
    def preprocess(self, bold_img, confounds):
        """
        전처리 단계:
        1. Motion correction
        2. Slice timing correction
        3. Spatial normalization
        4. Smoothing
        5. Confound regression
        """
        # Smoothing
        smoothed = image.smooth_img(bold_img, fwhm=6)
        
        # Masking
        mask = masking.compute_brain_mask(smoothed)
        masked_data = masking.apply_mask(smoothed, mask)
        
        # Confound regression
        cleaned = self.regress_confounds(masked_data, confounds)
        
        return cleaned
    
    def extract_rois(self, cleaned_data, atlas='schaefer_400'):
        """
        ROI 시계열 추출
        """
        from nilearn import datasets
        
        if atlas == 'schaefer_400':
            atlas_data = datasets.fetch_atlas_schaefer_2018(n_rois=400)
        
        from nilearn.maskers import NiftiLabelsMasker
        masker = NiftiLabelsMasker(atlas_data.maps)
        time_series = masker.fit_transform(cleaned_data)
        
        return time_series
```

### Module 4: Research Methods & Ethics (Month 7-8)

#### 학습 목표
- 과학적 연구 방법론 이해
- 연구 윤리 및 책임 있는 연구 수행
- 재현 가능한 연구 실천

#### 주요 주제

| 주차 | 주제 | 형식 | 과제 |
|------|------|------|------|
| 1 | 과학적 방법론 | 강의 | 연구 설계 |
| 2 | 실험 설계 | 워크숍 | IRB 작성 |
| 3 | 통계적 추론 | 강의 | 분석 실습 |
| 4 | 연구 윤리 | 세미나 | 사례 분석 |
| 5 | 데이터 관리 | 실습 | BIDS 변환 |
| 6 | 재현성 위기 | 토론 | 논문 리뷰 |
| 7 | Open Science | 워크숍 | GitHub 실습 |
| 8 | 종합 평가 | - | 연구 계획서 |

---

## 3. Year 2: Advanced Research

### Module 5: Foundation Models (Month 1-3)

#### 학습 목표
- Foundation Model 개념 이해
- BrainLM, Brain-JEPA 구현
- Transfer learning 기법 습득

#### 심화 학습 내용

```python
# BrainLM Implementation Study
class BrainLMStudy:
    """
    BrainLM 논문 재현 및 이해
    
    학습 내용:
    1. Autoregressive pretraining
    2. Temporal attention
    3. Transfer to downstream tasks
    """
    
    topics = [
        {
            "week": 1,
            "topic": "Paper deep dive",
            "activity": "논문 정독 및 발표",
            "output": "발표 자료"
        },
        {
            "week": 2,
            "topic": "Architecture implementation",
            "activity": "코드 구현",
            "output": "GitHub PR"
        },
        {
            "week": 3,
            "topic": "Training pipeline",
            "activity": "학습 실험",
            "output": "실험 로그"
        },
        {
            "week": 4,
            "topic": "Evaluation",
            "activity": "성능 평가",
            "output": "보고서"
        },
    ]
```

### Module 6: Multimodal Learning (Month 4-6)

#### 핵심 내용
- Cross-modal alignment
- Contrastive learning (CLIP-style)
- Brain-Language alignment (Hasson Lab 연구)

#### 프로젝트

```python
# Multimodal Brain-Language Alignment
class BrainLanguageProject:
    """
    fMRI-Language 정렬 프로젝트
    
    데이터: Narratives dataset (Hasson Lab)
    목표: 언어 자극과 뇌 활동의 정렬 학습
    """
    
    def __init__(self):
        self.language_encoder = "whisper-large"  # or LLM
        self.brain_encoder = "brainlm"
        
    def contrastive_alignment(self, text_embeddings, brain_embeddings):
        """
        InfoNCE loss로 정렬 학습
        """
        # Normalize
        text_norm = F.normalize(text_embeddings, dim=-1)
        brain_norm = F.normalize(brain_embeddings, dim=-1)
        
        # Similarity matrix
        logits = torch.matmul(text_norm, brain_norm.T) / self.temperature
        
        # Contrastive loss
        labels = torch.arange(len(logits), device=logits.device)
        loss = (F.cross_entropy(logits, labels) + 
                F.cross_entropy(logits.T, labels)) / 2
        
        return loss
```

### Module 7: Generative Models (Month 7-9)

#### 학습 내용
- VAE for brain data
- Diffusion models
- Brain activity generation

### Module 8: Scientific Writing (Month 10-12)

#### 학습 목표
- 학술 논문 작성법
- 학회 발표 기술
- 피어 리뷰 참여

#### 글쓰기 워크숍

| 주차 | 주제 | 과제 |
|------|------|------|
| 1-2 | Introduction 작성 | 연구 배경 초안 |
| 3-4 | Methods 작성 | 방법론 상세 기술 |
| 5-6 | Results 작성 | 결과 시각화 |
| 7-8 | Discussion 작성 | 논의 및 결론 |
| 9-10 | Revision | 피드백 반영 |
| 11-12 | Submission prep | 최종 제출 준비 |

---

## 4. Technical Skills Roadmap

### 4.1 프로그래밍 역량

```
┌─────────────────────────────────────────────────────────────┐
│                Programming Skills Progression                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Level 1: Beginner (Month 1-3)                              │
│  ├── Python basics, NumPy, Pandas                          │
│  ├── Matplotlib, Seaborn visualization                      │
│  └── Jupyter notebooks                                      │
│                                                              │
│  Level 2: Intermediate (Month 4-6)                          │
│  ├── PyTorch fundamentals                                   │
│  ├── Git/GitHub workflow                                    │
│  └── Shell scripting, SLURM                                 │
│                                                              │
│  Level 3: Advanced (Month 7-12)                             │
│  ├── Distributed training                                   │
│  ├── Custom CUDA kernels (optional)                        │
│  └── MLOps (Weights & Biases, MLflow)                      │
│                                                              │
│  Level 4: Expert (Year 2+)                                  │
│  ├── JAX/Flax for research                                 │
│  ├── Efficient attention mechanisms                         │
│  └── Foundation model development                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 신경과학 도구

```python
neuro_tools_curriculum = {
    "fMRI": {
        "beginner": ["nilearn", "nibabel"],
        "intermediate": ["FSL", "AFNI", "FreeSurfer"],
        "advanced": ["fMRIPrep", "custom pipelines"]
    },
    "EEG/MEG": {
        "beginner": ["MNE-Python basics"],
        "intermediate": ["source localization", "connectivity"],
        "advanced": ["real-time processing", "BCI"]
    },
    "analysis": {
        "beginner": ["GLM", "t-tests", "correlation"],
        "intermediate": ["RSA", "encoding models", "MVPA"],
        "advanced": ["Bayesian modeling", "causal inference"]
    }
}
```

---

## 5. 평가 체계

### 5.1 평가 기준

| 구분 | 비중 | 내용 |
|------|------|------|
| **Course Work** | 30% | 모듈별 과제, 시험 |
| **Research Progress** | 40% | 연구 프로젝트 진행 |
| **Presentation** | 15% | 세미나, 학회 발표 |
| **Collaboration** | 15% | 팀워크, 멘토링 |

### 5.2 마일스톤

| 시점 | 기대 성과 |
|------|----------|
| **6개월** | Module 1-3 완료, 기초 연구 시작 |
| **12개월** | Year 1 완료, 첫 학회 발표 |
| **18개월** | 독립 프로젝트 진행 중 |
| **24개월** | 논문 초고 완성 |
| **36개월** | 논문 출판, 대학원 준비 완료 |

---

## 6. 추천 온라인 강좌

### 6.1 필수 코스

| 강좌 | 플랫폼 | 난이도 | 기간 |
|------|--------|--------|------|
| [Neuromatch Comp Neuro](https://compneuro.neuromatch.io) | NMA | 중급 | 3주 |
| [Neuromatch Deep Learning](https://deeplearning.neuromatch.io) | NMA | 중급 | 3주 |
| [CS231n (CNN)](http://cs231n.stanford.edu) | Stanford | 중급 | 10주 |
| [CS224n (NLP)](http://cs224n.stanford.edu) | Stanford | 중급 | 10주 |
| [Full Stack Deep Learning](https://fullstackdeeplearning.com) | Berkeley | 고급 | 8주 |

### 6.2 선택 코스

| 강좌 | 주제 | 추천 대상 |
|------|------|----------|
| [Principles of fMRI](https://www.coursera.org/learn/functional-mri) | fMRI | 영상 관심자 |
| [Neural Signal Processing](https://www.edx.org/) | EEG/MEG | BCI 관심자 |
| [Bayesian Statistics](https://www.coursera.org/learn/bayesian-statistics) | 통계 | 이론 관심자 |

---

## 7. 학습 자원

### 7.1 핵심 논문 리스트

```
Foundation Models:
─────────────────────────────────
1. BrainLM (ICLR 2024)
2. Brain-JEPA (NeurIPS 2024)
3. Brain Harmony (NeurIPS 2025)
4. Foundation model of neural activity (Nature 2025)
5. fMRI-LM (arXiv 2025)

Brain-Language:
─────────────────────────────────
1. Shared computational principles (Hasson, Nat Neuro 2022)
2. BrainLLM (Nature Comms 2025)
3. Whisper for brain encoding (2025)

Representation Learning:
─────────────────────────────────
1. Platonic Representation Hypothesis (ICML 2024)
2. NeuroAI Turing Test (arXiv 2025)
3. Brain-model alignment studies
─────────────────────────────────
```

### 7.2 교재

| 교재 | 저자 | 용도 |
|------|------|------|
| Deep Learning | Goodfellow et al. | DL 기초 |
| Pattern Recognition and ML | Bishop | ML 이론 |
| Neuroimaging Analysis | Poldrack | fMRI |
| Theoretical Neuroscience | Dayan & Abbott | 이론 |

---

## 8. AI 도구 활용 가이드

### 8.1 Coding Agent 사용법

```python
# Claude Code 효과적 사용 가이드
claude_usage_guide = {
    "code_generation": {
        "best_practices": [
            "명확한 docstring 요청",
            "단위 테스트 함께 생성",
            "점진적 복잡도 증가",
        ],
        "example_prompt": '''
        PyTorch로 BrainLM의 temporal attention 모듈을 구현해줘.
        - 입력: (batch, time, features)
        - causal masking 포함
        - 단위 테스트도 작성
        '''
    },
    "debugging": {
        "best_practices": [
            "에러 메시지 전체 공유",
            "관련 코드 컨텍스트 제공",
            "시도한 방법 설명",
        ]
    },
    "research_assistance": {
        "best_practices": [
            "논문 요약 요청",
            "방법론 비교 분석",
            "실험 설계 브레인스토밍",
        ]
    }
}
```

### 8.2 월간 AI 사용 예산 가이드

| 용도 | 추천 도구 | 예산 |
|------|----------|------|
| **코드 작성** | Claude Code, Cursor | $60 |
| **논문 분석** | Claude Opus, GPT-5 | $150 |
| **문헌 검색** | Gemini Deep Research | $50 |
| **배치 처리** | DeepSeek-R1 | $20 |
| **실험 관리** | Weights & Biases | $20 |
| **계산** | Cloud credits | $200 |

---

*Document Version: 1.0*
*Last Updated: December 2025*

