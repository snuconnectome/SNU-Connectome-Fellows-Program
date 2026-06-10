# Lab 핵심 연구 — 3 Tracks (Connectome Lab)

> Nature 인용 스타일. **Connectome Lab(+ Brookhaven National Lab 협업) 자체 논문만** 수록.
> ⚠️ **citation gate**: public 게시 전, 각 인용(저자·venue·연도·arXiv)을 PI 또는 원문으로 최종 검증. 일부 NeurIPS Workshop 연도는 확정 표기 보류.

---

## ① fMRI Foundation Model
> **연구 질문** — *뇌 활동만으로 지금 이 사람의 인지·정서 상태를 자연어로 읽어낼 수 있는가?*
> UK Biobank 5만 명 규모의 뇌 활동에서 일반화 가능한 표상을 학습.

1. Choi, J., Park, D. K., Kwon, J., Yoo, S. & Cha, J. **NeuroMamba: A State-Space Foundation Model for Functional MRI.** *NeurIPS FM for the Brain & Body Workshop* (Published).
2. Seo, J., Park, D. K., Yoo, S. & Cha, J. **Scalable Diffusion Transformer for Conditional 4D fMRI Synthesis.** *NeurIPS FM for the Brain & Body Workshop* (Published).
3. Connectome Lab. **SwiFT V2: Towards Large-scale Brain Foundation Model.** (ongoing; 전신 SwiFT, NeurIPS 2023).
4. Connectome Lab. **MBBN: Learning Brain Dynamics across Distinct Scaling Regimes.** *arXiv* preprint.

## ② Ephys Foundation Model
> **연구 질문** — *신경 회로가 지금 학습 중인지, 결정 중인지, 무엇에 반응하는지 신호로 읽을 수 있는가?*
> 밀리초 단위 신경 신호(spike · LFP · EEG · iEEG)를 여러 종에 걸쳐 하나로 통합.

1. Han, D. D. *et al.* **DIVER-1: Scaling Intracranial EEG Foundation Models for Transferable Representations.** *arXiv*:2512.19097 (Lab preprint).
2. Connectome Lab. **EEG Memory × DIVER: Theta-Rhythmic Episodic Memory Encoding.** (under review).
3. Connectome Lab. **LBM × Qualia: iEEG Foundation Models meet Phenomenal States.** (in preparation, ICLR 2027 목표).

## ③ Continuous Neural Field — *David Keetae Park (박기태) 리드*
> **연구 질문** — *측정 양식이 제각각인 마우스 뉴런과 인간 fMRI를, 하나의 연속 함수로 다룰 수 있는가?*
> **GINR**(Generalizable Implicit Neural Representation) = 격자(grid)를 버리고 *좌표 → 활동*을 직접 매핑하는 implicit neural function. 박기태(D. K. Park, BNL)가 이끄는 lab의 neural field 라인.

1. Valencia, K., Balasooriya, T., Luo, X., Yoo, S. & **Park, D. K.** **OmniField: Conditioned Neural Fields for Robust Multimodal Spatiotemporal Learning.** *ICLR 2026* (arXiv:2511.02205).
2. Balasooriya, T., Choi, J., Valencia, K., Luo, X., Yoo, S. & **Park, D. K.** **Mamba-GINR: A Scalable Framework for Spatiotemporal Representation of fMRI.** *NeurIPS 2025, Data on the Brain and Mind Workshop.* — Transformer 기반 GINR의 quadratic 한계를 Mamba backbone(linear-time)으로 돌파, 4D fMRI 규모를 처음으로 모델링.
3. Feng, B. R., **Park, D. K.**, Luo, X., Urdangarin, A., Yoo, S. & Reich, B. J. **STACI: Spatio-Temporal Aleatoric Conformal Inference.** *NeurIPS.*

---

## 통합 비전 — compound / agentic AI
> **연구 질문** — *AI가 스스로 뇌과학 가설을 세우고 → 실험을 설계·분석하고 → 과거의 발견을 재현할 수 있는가?* (인지신경과학 3대 난제: 재현성 · 인과성 · 개인화)

위 3 트랙의 Brain Foundation Model을 **frozen tool**로 묶어, LLM 에이전트가 도구처럼 호출(Brain-State Chain-of-Thought)하며 자율적으로 가설→실험→재현하는 **AI Scientist for Brain**을 구축. 각 트랙의 FM은 이 compound/agentic AI 시스템의 부품이 됩니다.

---

### 검증 To-Do (게시 전 PI 확인)
- [ ] NeuroMamba / Scalable Diffusion: NeurIPS *FM for Brain & Body* Workshop **연도** (2024 vs 2025)
- [ ] MBBN: arXiv 번호
- [ ] SwiFT V2: 공개 시 arXiv/링크
- [x] DIVER-1 (arXiv:2512.19097): 제목·번호 arXiv 원문 검증 완료 (2026-06-09) — 제목 = "Scaling Intracranial EEG Foundation Models for Transferable Representations" (이전 백크로님 오류 교정). OmniField (arXiv:2511.02205) 번호 확인 완료.
- [ ] Mamba-GINR / STACI: NeurIPS Workshop 연도·링크
