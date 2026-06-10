# SNU Connectome Fellows 2026 — 학부생 연구 펠로우십 모집


서울대학교 Connectome Lab(차지욱 교수)에서 신경과학 Foundation Model 연구 학부 펠로우를 모집합니다.
**올해는 1-3명 선발 예정**. 프로그램은 두 단계로 운영됩니다 — 먼저 **7월 1일부터 8월까지 방학 펠로우십**으로 연구에 몰입하고, 이 기간의 작업과 적합성을 함께 확인한 뒤 **통과하면 9월부터 1년간 정식 펠로우십**으로 이어집니다. 학기가 끝나자마자 곧바로 본격 연구에 진입합니다.

---

## 함께 하는 연구

우리 연구의 중장기 목표: — **뇌의 언어를 자연어처럼 읽고, 생각하고, 생성하는 AI 시스템을 만들고 현재 풀리지 않는 인지-정신 건강과 웰빙의 문제를 해결하기**

펠로우는 아래 두 트랙 중 하나에서 출발합니다.

> **Brain Foundation Model이란?** 다양한 사람·과제·측정 방식에서 모은 뇌 데이터를 미리 대규모로 학습해, 처음 보는 뇌 신호도 해석하고 예측할 수 있게 만든 범용 AI 모델입니다. (거대 언어모델이 글을 미리 학습해 새 문장을 다루듯, 뇌 신호를 미리 학습한다고 보면 가깝습니다.)

**① Brain Foundation Model — fMRI + 전기생리(ephys)** — *느리지만 뇌 전체를 보는 fMRI와, 빠르지만 좁은 곳을 보는 전기 신호 — 이 둘을 하나의 AI 모델로 합칠 수 있을까?*
fMRI는 혈액속 헤모글로빈의 자기적 성질 변화라는 간접 신호로 초 단위로 뇌 전체를 담는 '비디오'에, 전기생리 신호(동물·임상 데이터에서 전극으로 직접 잰 전기)는 밀리초 단위로 좁은 영역을 잡는 '마이크'에 가깝습니다. 둘은 시간 단위가 1,000배 넘게 차이 나(초 단위 vs 밀리초 단위) 박자가 안 맞고, 억지로 합치면 정보가 어긋나거나 사라지기 쉽습니다. 우리의 목표는 이 둘을 각각 이해하는 모델과 함께, 장차 통합 될 수 있는 형태의 AI 모델을 개발해서 '뇌의 어디서'와 '언제'를 함께 읽고 뇌 안에 표상되어있는 한 사람의 세계를 해독하는 것입니다. 

<details><summary>관련 lab 논문 ▾</summary>

- **SwiFT V2**: Towards Large-scale Foundation Model for Functional MRI — Choi et al. *(CCN 2025)* — fMRI FM
- **MBBN** (Multi-Band Brain Net): Spatiotemporal Learning of Brain Dynamics from fMRI Using Frequency-Specific Multi-Band Attention *([arXiv:2503.23394](https://arxiv.org/abs/2503.23394))* — fMRI FM
- **DIVER-1**: Scaling Intracranial EEG Foundation Models for Transferable Representations — Han et al. *([arXiv:2512.19097](https://arxiv.org/abs/2512.19097))* — 전기생리(iEEG) FM
</details>

**② Continuous Neural Field** — *서로 다른 사람·실험·장비에서 얻은 뇌 지도를 하나의 공통 공간에 정렬할 수 있을까?*
마우스 뉴런부터 인간 fMRI까지 측정 양식이 제각각인 뇌 데이터를, 격자(grid)를 버리고 *좌표 → 뇌 활동*으로 곧바로 잇는 **연속 신경장(neural field)**으로 묶습니다. *(David Keetae Park 리드)*

<details><summary>관련 lab 논문 ▾</summary>

- **OmniField**: Conditioned Neural Fields for Robust Multimodal Spatiotemporal Learning — Valencia, Balasooriya, Luo, Yoo, Park *([arXiv:2511.02205](https://arxiv.org/abs/2511.02205))*
- **Mamba-GINR**: A Scalable Framework for Spatiotemporal Representation of fMRI — Balasooriya, Choi, Valencia, Luo, Yoo, Park *(NeurIPS 2025 Data on the Brain & Mind Workshop)*
- **STACI**: Spatio-Temporal Aleatoric Conformal Inference — Feng, Park, Luo, Urdangarin, Yoo, Reich *([arXiv:2505.21658](https://arxiv.org/abs/2505.21658))*
</details>

그리고 진짜 목표는 이 둘을 **한데 잇는 것**입니다. 우리가 만들고 싶은 것은 단순히 뇌 데이터를 맞히는 모델이 아니라 — 뇌과학자가 던질 법한 **가설을 세우고, 어떤 데이터를 더 봐야 할지 제안하며, 결과를 해석하는 AI 연구 파트너**입니다. 두 트랙의 모델은 뇌 신호를 읽는 *눈*이 되고, 이를 도구처럼 꺼내 쓰는 **LLM 에이전트**가 가설 → 실험 → 재현을 스스로 돌립니다. 우리는 이것을 **AI Scientist for Brain** — 여러 AI를 묶어 과학을 수행하는 **compound·agentic AI** — 라 부르며, NeuroX 컨소시움에서 함께 만들고 있습니다.

펠로우는 본인의 관심에 따라 한 트랙의 Foundation Model을 깊이 파거나, 이들을 잇는 에이전트 시스템을 함께 설계합니다. **처음에는** 논문 한 편을 함께 읽고 그림으로 다시 설명하기, 공개 뇌 데이터로 작은 decoding 실험을 재현하기, 모델 결과를 시각화해 가설을 세워보기 같은 일부터 시작합니다 — 들어올 때부터 전문가일 필요는 없습니다.

연구 환경:

- **컴퓨팅** — 개인용 NVIDIA DGX Spark 1대(₩600만원 초기 투자) + Lab의 DGX A100/H100 GPU 클러스터
- **AI 도구** — Claude Code · Antigravity CLI · Codex 등 AI 코딩 에이전트를 토큰 비용 의식 없이 사용 (lab 전액 부담, 월 10억 토큰 규모). FM을 처음부터 학습시키는 데가 아니라 **에이전트를 만들고 실험을 돌리는 데** 쓰는 연구 자원입니다.
- **데이터** — UK Biobank(50,000명 fMRI), HCP(Human Connectome Project), Narratives, NSD(Natural Scenes Dataset)

**시간 투입** — 학기 중 주당 20–30시간, 여름 방학 풀타임 (해외 멘토 연구실 4주 방문 포함).

---

## 우리가 찾는 사람

전공·학년 제한이 없습니다. 지금까지 lab과 fit이 좋았던 학과 예시:

> 의과대학 · 전기정보공학부 · 심리학과 · 자유전공학부 · 뇌인지과학과 · 컴퓨터공학부 · 생명과학부 · 통계학과 · 그 외 학과 학생도 환영

학과보다 중요한 것은 **세 가지 자질**입니다.

### ① 꿈 — 50세의 본인 모습이 한 장면으로 떠오르는가
당신의 연구가 세상의 어떤 구체적인 장면을 바꾸어 놓았기를 바라는지, 그 한 컷을 묘사할 수 있어야 합니다.

### ② 멈출 수 없는 호기심 — 스스로 끄지 않고 따라간 호기심이 있는가
학점이나 지시 없이 끄지 않고 따라간 호기심이 하나라도 있다면 됩니다. **한 우물을 깊이 파든, 여러 분야를 오가든 좋습니다.**

### ③ 분야를 넘는 유연성 — 본인 전공 밖 두 개념을 합쳐 새 질문을 만들 수 있는가
이 자질은 서류가 아니라 **30분 화상 면접의 즉석 합성 과제**로 확인합니다.

> 예: 본인이 잘 아는 **두 분야**를 엮는 질문이 즉석으로 주어집니다 (예: *"습관은 어떻게 만들어지는가"*와 *"추천 알고리즘"*을 합치면?). **신경과학 용어를 몰라도 됩니다 — 기술 지식이 아니라 사고 과정을 봅니다.**

평가(채점)는 위 세 자질로만 이루어집니다. **CV·성적표는 제출받되, 참고자료로만 보며 채점에는 반영하지 않습니다** — 점수 cutoff는 없습니다. 추천서·영어 점수는 요구하지 않으며, GitHub·연구 경험도 자유롭게 공유할 수 있으나 채점과 무관합니다.

Python/PyTorch는 합격 후 onboarding에서 보강 가능합니다.

---

## 제출 서류

**Notion 폼 1개**로 다음 항목을 제출합니다.

### A. 메인 에세이 — 자질 ① 꿈 (600–900자, 영어는 상응 단어 수)

> 당신이 50세가 되었을 때, 본인의 연구가 세상의 어떤 구체적인 장면을 바꾸어 놓았기를 바라십니까? 그 장면 한 컷을 묘사하고, 그곳에 닿기 위해 앞으로 5년간 풀어야 할 **가장 어려운 문제 하나**와, **그 문제가 지금 풀리지 않는 이유 한 가지**를 적어 주십시오.

### B. 보조 에세이 — 자질 ② 호기심 (300–500자, 영어는 상응 단어 수)

> 지난 12개월 동안, 학점이나 지시와 무관하게 **당신을 계속 붙잡은 질문이나 호기심** 하나를 적어 주십시오. 깊이 한 우물을 판 경험이든, 여러 분야를 오가며 떠나지 않은 궁금증이든 좋습니다. 무엇이 처음 당신을 끌었고, 그 호기심이 당신을 어디로 데려갔는지 보여 주십시오. *(거창한 결과물이 아니라, 그 궁금증이 진짜였다는 흔적이면 충분합니다.)*

### C. 기본 정보 및 참고자료
이름 · 학번 · 학과 · 학년 · 이메일 · CV·성적표 · (선택) GitHub URL

---

## 연구 환경과 지원

커넥톰 펠로우십 프로그램은 **연구에 온전히 몰입할 수 있는 환경**을 제공합니다:

- **연구 몰입 stipend** — 월 100만원 연구장려금 (방학 7~8월에도 동일 지급)
- **멘토링** — 격주 1:1 PI 미팅 · 주 1회 Lab Meeting · 해외 멘토와 정기적 연구 미팅
- **AI 에이전트 토큰** — Claude Code·Antigravity·Codex 월 10억 토큰 규모
- **개인 컴퓨팅** — 개인용 NVIDIA DGX Spark



### 활동 멘토

| 멘토 | 소속 | 전문 분야 |
|---|---|---|
| 유신재 교수 (Shinjae Yoo) | Brookhaven National Laboratory | Scalable AI |
| 박기태 박사 (David Keetae Park) | Brookhaven National Laboratory | AI·계산신경과학·BCI |
| Uri Hasson 교수 | Princeton University | 언어-뇌 모델링 |
| 차지욱 교수 (Connectome Lab PI) | 서울대학교 | Brain Foundation Models |

---

## 일정

| 단계 | 일자 |
|---|---|
| 지원 마감 | **2026년 6월 15일** |
| 면접 (30분 화상) | 2026년 6월 중순 ~ 말 |
| 최종 합격 통보 | 면접 후 1주 이내 |
| **① 방학 펠로우십** (집중 과정) | **2026년 7월 1일 ~ 8월 (2개월)** |
| **② 정식 펠로우십** (방학 펠로우십 통과 시) | **2026년 9월 ~ 2027년 8월 (1년)** |

먼저 **7월 1일부터 8월까지 방학 펠로우십**으로 PI · 해외 멘토와 함께 연구 환경을 셋업하고 첫 프로젝트를 시작합니다. 이 기간의 작업과 적합성을 함께 확인한 뒤, **통과하면 9월부터 1년간 정식 펠로우십**으로 이어집니다.

---

## 지원 방법

Notion 폼 1개로 위의 A–C를 제출하면 됩니다. (폼 URL은 광고 게시 시 함께 공개)

문의: **connectome@snu.ac.kr**
웹사이트: [www.connectomelab.com](https://www.connectomelab.com)

---


— SNU Connectome Lab
