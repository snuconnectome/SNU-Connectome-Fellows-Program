# 무엇을 함께 하는가 — 3 Research Tracks (v1 draft)

펠로우는 lab의 세 가지 활성 연구 트랙 중 하나를 선택해 깊이 들어갑니다. 앞의 두 트랙은 **뇌 표상 학습(Brain FM)을 넘어 궁극적으로 LLM agentic AI 와의 결합**을 지향하는 로드맵이며, 세 번째 트랙은 기존 모델들이 풀지 못하는 **multi-scale × multi-species × multi-modality 한계**를 돌파하기 위한 새로운 frontier 입니다.

---

## 🧠 1. fMRI Foundation Model

fMRI는 인간의 인지·정서·임상 상태를 비침습적으로 들여다보는 가장 풍부한 창입니다. 하지만 단일 dataset에서 학습한 모델은 다른 피험자, 다른 측정 기기, 다른 과제에 잘 일반화하지 않습니다. 이 트랙에서는 UK Biobank(최신 10만 명 규모 대규모 MRI 코호트 중 약 5만 명의 fMRI 데이터) 및 HCP · Narratives · NSD(고해상도 다량의 인지/자연물 자극 데이터) 등 **대규모 뇌 활성 코퍼스**로 사전학습해 **다양한 인지 태스크에 일반화 가능한 뇌 활동 표상(generalizable neural representations)** 을 학습하는 self-supervised Foundation Model을 만듭니다.

비전은 단순한 representation learning에 머무르지 않습니다 — 학습된 brain FM을 **대규모 언어 모델(LLM)과 결합해 agentic AI 로 확장하는 중장기 로드맵을 지향합니다**. 모델이 뇌 데이터를 보고 "이 사람이 지금 어떤 인지·정서 상태에 있는가?" 를 자연어로 정렬하여 추론하고, 후속 실험 및 자율적 분석 제안(AI Scientist for Brain)을 위한 기초 아키텍처를 함께 설계하는 것을 최종 연구 지향점으로 둡니다. *(참고: 현재 게재 또는 아카이브된 랩의 주 연구 성과는 뇌 표상 학습(Representation Learning)에 집중되어 있으며, LLM 에이전트 결합은 본 펠로우십 과정에서 새롭게 함께 설계해 나갈 미래 기술 로드맵이자 지향점입니다.)*

**Lab publications & Ongoing preprints**

- **NeuroMamba**: A State-Space Foundation Model for Functional MRI
  J. Choi, D.K. Park, J. Kwon, S. Yoo, **J. Cha** — NeurIPS FM for the Brain & Body Workshop (Published)
- **Scalable Diffusion Transformer for Conditional 4D fMRI Synthesis**
  J. Seo, D.K. Park, S. Yoo, **J. Cha** — NeurIPS FM for the Brain & Body Workshop (Published)
- **SwiFT V2**: Towards Large-scale Brain Foundation Model (Lab-led, ongoing development)
- **MBBN**: Learning Brain Dynamics across Distinct Scaling Regimes (arXiv preprint)

**Lab NotebookLM KB (펠로우십 합류 후 접근)**: SwiFT V2 KB (124 src), MBBN (156 src), Agentic LBM SOTA 2024–2026 (136 src), World Model × Physical AI × LBM (103 src).

**펠로우의 작업 axis**: 사전학습 코퍼스 확장 / 새 backbone 설계 (state-space, transformer, diffusion) / **brain FM × LLM agentic stack 탐색적 로드맵 설계** 중 본인 흥미에 맞춰 한 축을 다룹니다.

---

## ⚡ 2. Ephys Foundation Model

fMRI 가 "초 단위" 거시 뇌 활동을 본다면, **electrophysiology(ephys)** 는 **밀리초 단위 신경 세포 활동**을 봅니다. 단일 뉴런 spike 부터 LFP, EEG, iEEG, MEG 까지 — **시간 해상도 ms · 공간 해상도 μm ~ cm 의 multi-scale 데이터**가 ephys 의 특징.

이 트랙은 lab 의 **DIVER 라인업**(arXiv:2512.19097)을 확장합니다 — 여러 species, 여러 측정 채널, 여러 task 를 동시에 학습한 통합 ephys foundation model. 외부 reference 로는 POYO, NDT3, CEBRA, EEG FMs.

여기서도 비전은 **ephys × LLM agentic AI 로드맵**: ephys signal 을 LLM 의 input modality 로 통합해, "이 신경 회로가 지금 학습 중인가, 결정 중인가, 어떤 stimulus 에 반응 중인가?" 를 자연어로 추론하는 미래 시스템입니다. BCI (brain-computer interface) 의 새로운 layer — 단순 decoding 을 넘어 **신경 활동 → 자연어 reasoning → 자율 실험 제안** 에 이르는 통합 아키텍처의 이론적·기술적 기반을 선제적으로 설계합니다. *(참고: 전기생리 트랙의 기존 게재 및 진행 중인 연구는 대규모 다채널 ephys 데이터 통합 모델링에 주력하고 있으며, LLM 에이전트 디코더와의 결합은 신규 펠로우가 주도하여 기반을 닦을 도전적인 미래 연구 로드맵입니다.)*

**Lab publications & Ongoing preprints**

- **DIVER-1**: Deep Integration of Vast Electrophysiological Recordings at Scale
  DD. Han et al. — arXiv:2512.19097 (Lab-led preprint)
- **EEG Memory × DIVER**: Theta-Rhythmic Episodic Memory Encoding (Lab work under review)
- **LBM × Qualia**: iEEG Foundation Models meet Phenomenal States (Lab work, in preparation for ICLR 2027 submission)

**Lab NotebookLM KB**: NF-Mouse Ephys Foundation Models (POYO / NDT3 / CEBRA / EEG FMs) (47 src), DIVER-1 ICML 2026 Rebuttal (180 src), LBM × Qualia (68 src).

**펠로우의 작업 axis**: spike/LFP/EEG/iEEG 사전학습 코퍼스 확장 / multi-species 통합 / **ephys × LLM agentic decoder 탐색적 로드맵 설계** 중 선택.

---

## 🌊 3. Continuous Neural Field Modeling

앞의 두 트랙(fMRI FM, Ephys FM)은 각각 **자기 modality 안에서** 사전학습합니다. 하지만 진짜 어려운 문제는 따로 있습니다 — **fMRI (macro-scale, 인간) 와 ephys (micro-scale, 동물) 를 같은 좌표계에서 동시에** 다루는 것. 그리고 modality 조합이 시공간마다 들쭉날쭉할 때 (어떤 영역은 fMRI 만, 어떤 영역은 ephys 만, 어떤 시간엔 둘 다, 또 어떤 영역은 다른 species 의 measurement).

이 트랙은 **격자(grid) 기반 표현을 버리고**, 좌표 → 활동을 직접 매핑하는 **Continuous Neural Field** 로 가는 새로운 접근입니다. 하나의 implicit neural function 이 동시에 표현:

- **Multi-scale** — 뉴런 단위 spike 부터 voxel 단위 BOLD 까지
- **Multi-species** — 마우스 cortex 부터 인간 whole-brain 까지
- **Multi-modality** — fMRI / EEG / ephys / MEG 임의 조합

같은 framework 에서 super-resolution, 결측 보완, cross-modal generation, uncertainty calibration 까지 처리.

**Key publications**

- **OmniField**: Conditioned Neural Fields for Robust Multimodal Spatiotemporal Learning
  K. Valencia, T. Balasooriya, X. Luo, S. Yoo, **D.K. Park** — **ICLR 2026** (arXiv:2511.02205, Brookhaven 멘토 그룹)
- **Mamba-GINR**: A Scalable Framework for Spatiotemporal Representation of fMRI
  T. Balasooriya, J. Choi, K. Valencia, X. Luo, S. Yoo, D.K. Park — NeurIPS Data on the Brain and Mind Workshop
- **STACI**: Spatio-Temporal Aleatoric Conformal Inference
  BR. Feng, D.K. Park, X. Luo, A. Urdangarin, S. Yoo, BJ. Reich — NeurIPS

**Lab NotebookLM KB**: NF-Mouse GINR & Neural Field Foundations (8 src), NF-Mouse SSL Strategies (Masked / Contrastive / Latent / Diffusion-REPA) (31 src), NF-Extend AI4Science 2026 (153 src).

**왜 이 트랙이 특별한가**: 위 두 트랙(brain FM) 이 이미 lab 에서 가속 중인 line 이라면, 이 트랙은 **lab 의 next big frontier** 입니다 — 학부생 펠로우가 합류해 **multi-scale × multi-species × multi-modality brain data 를 하나의 continuous field 에 통합**하는 첫 학생 코호트가 될 수 있는 자리입니다.

---

## 어느 트랙을 선택할 것인가

| 트랙 | 핵심 데이터 | 핵심 model class | 비전 |
|---|---|---|---|
| ① fMRI FM | 인간 BOLD, naturalistic stimuli | state-space / diffusion / JEPA | brain FM × LLM agentic AI |
| ② Ephys FM | spike / LFP / EEG / iEEG, multi-species | sequence / contrastive / multi-task | ephys × LLM agentic decoder |
| ③ Continuous Neural Field | fMRI + ephys, multi-scale/species | implicit neural representation | unified brain field |

펠로우는 본인의 흥미와 강점에 따라 한 트랙을 깊이 다루지만, 트랙 간 **정기 cross-track 세미나** 와 공동 멘토링이 운영됩니다. 펠로우 한 명의 작업이 다른 트랙의 기초 데이터·도구가 되는 구조.
