# SNU Connectome Fellows Program — Site Content Baseline
**Date**: 2026-05-10  
**Live URL**: https://snuconnectome.github.io/SNU-Connectome-Fellows-Program/  
**Purpose**: Baseline content snapshot for multi-reviewer Round 1 検토

---

## Site Architecture

- **Home (`/`)**: Hero → ProgramOverview → ProgramStats → ResearchHighlights → MentorNetwork → TestimonialsSection → NewsSection → CTASection
- **Apply (`/apply`)**: Custom Hero + ApplicationFormSimple (현재 Coming Soon disabled — Google Form URL 대기)
- **6 wrapper pages** (`/team`, `/research`, `/mentors`, `/mentorship`, `/publications`, `/history`): 모두 "Content migration in progress" + "Apply to 2026 Cohort →" 단일 CTA로 모집 funnel 구성

---

## Home Page — Section by Section

### 1. Hero
- **Badge**: "2026 Cohort — Aug 31 Deadline" / "2026년 모집 중 — 8월 31일 마감"
- **Headline**: "Foundations of Neural Intelligence"
- **Korean tagline**: "꿈은 구체적으로, 호기심은 끄지 않게, 분야는 두 개 이상."
- **Description (EN)**: "We are not collecting resumes. We want to see one question of yours. It is fine if that question is still blurry — if you can describe the texture of the blur, that is enough."
- **Description (KR)**: "저희는 이력서를 모으지 않습니다. 대신 본인의 질문 한 가지를 보고자 합니다. 그 질문이 아직 흐릿하더라도 괜찮습니다 — 흐릿함의 결을 묘사할 수 있다면 그것으로 충분합니다."
- **CTAs**: "Apply Now" + "Program Details"
- **4 stat cards**:
  - ₩36.2M — Annual Investment per fellow / 연간 투자 펠로우당
  - 4+ — International Network top universities / 국제 네트워크 최고 대학
  - 100% — Research Focus AI + Neuroscience / 연구 분야 AI + 신경과학
  - 1:1 — PI Direct Time mentoring per fellow / PI 직접 시간 맞춤 지도
- **TextReveal quote**: "We invest deeply in undergraduates whose questions don't fit a syllabus."

### 2. ProgramOverview — 6 Feature Cards
1. **Comprehensive Support / 포괄적 지원** — "₩36.2M annual investment per fellow including monthly stipend, overseas conferences, research visits, AI resources, and personal NVIDIA DGX Spark." Highlights: ₩12M Annual Stipend, **AI Budget $225/month**, NVIDIA DGX Spark
2. **World-Class Mentorship / 세계적 멘토링** — "Direct mentorship from leading researchers at **Brookhaven National Lab, Princeton University, MIT, and Stanford**." Highlights: BNL & Princeton Mentors, Monthly 1:1 Sessions, Research Lab Visits
3. **Foundation Model Research / Foundation Model 연구** — "Work on cutting-edge neuroscience foundation models including BrainLM, Brain-JEPA, and multimodal brain representation learning." Highlights: BrainLM (ICLR 2024), Brain-JEPA (NeurIPS 2024), Multimodal Learning
4. **Direct PI Mentorship / PI 직접 지도** — "Weekly 1:1 sessions with the PI. Intentionally small cohort — investment per fellow exceeds typical lab postdocs. No postdoc layer between you and the PI."
5. **Career Development / 커리어 개발** — "Structured pathway to top-tier graduate programs and research positions with guaranteed international exposure."
6. **Academic Excellence / 학술적 우수성** — "Rigorous curriculum combining theoretical foundations with hands-on research experience in state-of-the-art facilities."

### 3. "Who we look for / 어떤 학부생을 찾습니까" 섹션
- 50세 본인의 모습을 한 장면으로 묘사할 수 있는 사람
- 지난 12개월 동안 학점이 걸리지 않은 한 가지 주제에 깊이 들어가 본 사람
- 본인의 전공으로 설명되지 않는 개념 두 개를 연결할 수 있는 사람

> "본인의 꿈을 한 문장으로 말하기 어려우시다면 — 한 학기 더 생각하신 후 2027 cohort에 지원하시는 것도 좋은 선택입니다. 지원의 부담이 본인을 막지 않도록, 본인의 결이 가장 분명한 때 지원하시면 됩니다."

### 4. Inline CTA box
- "Read the prompt. Write one essay." / "프롬프트를 읽고, 한 편의 글을 써 주십시오."
- "**800–1200 words on a single dream. No CV, no recommendation letters, no GPA cutoff.** We read every submission."

### 5. ProgramStats — 6 Numerical Cards
1. **₩36.2M** Annual Investment per fellow
2. **1:1** PI Direct Time — "Weekly 1:1 with the PI. No postdoc layer. Intentionally small cohort..."
3. **4+** International Network top institutions — "**Princeton, MIT, Stanford, Brookhaven National Laboratory partnerships**"
4. **100%** Research Focus Foundation Models
5. **2-3** Publication Goal papers/fellow — "Target 2-3 high-impact publications per fellow during the program"
6. **90%+** Success Rate PhD placement — "**Expected 90%+ placement rate in top-tier international PhD programs**"
- Footer text: "These numbers represent our commitment to excellence" / "이 수치들은 우수성에 대한 우리의 약속을 나타냅니다" / "Version 1.1 • Updated April 2026"

### 6. ResearchHighlights — 3 Models
1. **BrainLM** (ICLR 2024) — "Transformer-based foundation model for brain activity recordings with autoregressive prediction capabilities."
2. **Brain-JEPA** (NeurIPS 2024) — "Self-supervised learning framework for multimodal brain representation learning."
3. **Brain Harmony** (NeurIPS 2025) — "Unified framework for integrating structural and functional brain data."

### 7. MentorNetwork — 3 Mentors (only)
1. **유신재 교수** (Prof. Yoo Sinjae) — Brookhaven National Laboratory — Brain Imaging, Neuroscience, Biomarkers
2. **Uri Hasson** (우리 하손 교수) — Princeton University — Language-Brain Modeling, Neural Communication
3. **박기태 박사** (Dr. Kitae Park) — Brookhaven National Laboratory — Computational Neuroscience, ML for Neuroimaging

⚠️ **Note**: ProgramOverview·ProgramStats·/mentors·/mentorship 4곳에서 "MIT, Stanford partnership"을 명시하지만, MentorNetwork 컴포넌트에는 BNL 2명 + Princeton 1명만 표시됨. MIT/Stanford 멘토 부재 — partnership claim 검증 필요.

### 8. TestimonialsSection (placeholder)
- "Program launching soon. First cohort testimonials will be featured here." / "프로그램이 곧 시작됩니다. 첫 번째 코호트 후기가 여기에 소개될 예정입니다."
- "— Coming Soon"

### 9. NewsSection — 3 News Cards
1. **2025-01-15** — "Program Launch Announcement / 프로그램 런칭 발표" — "SNU Connectome Fellows Program officially launches with comprehensive support"
2. **2026-05-01** — "2026 Cohort Applications Open / 2026 cohort 지원 개시" — "Applications open for the 2026 cohort. **One short essay (800–1200 words). No CV, no recommendation letters.** Deadline: August 31, 2026."
3. **2025-01-20** — "BrainLM Research Collaboration / BrainLM 연구 협력" — "New collaboration with international partners on BrainLM foundation model development"

### 10. CTASection
- "Write one short essay. We read every one." / "짧은 글 한 편을 써 주십시오. 한 편도 빠짐없이 읽겠습니다."
- "We are not collecting resumes. We want to see one question of yours. Applications are open for the 2026 cohort."
- "저희는 이력서를 모으지 않습니다. 본인의 질문 한 가지를 보고자 합니다. 2026년 cohort 지원을 받습니다."
- Buttons: "Apply Now / 지원하기", "Learn More / 더 알아보기"
- Footer: "Application deadline: August 31, 2026 / 지원 마감: 2026년 8월 31일"

---

## Apply Page (`/apply`)

### Hero
- "Write one short essay. We read every one."
- "짧은 글 한 편을 써 주십시오. 한 편도 빠짐없이 읽겠습니다."
- "**800–1200 words on a single question. No CV, no recommendation letters, no GPA cutoff.** We are looking for one specific dream, one curiosity that won't switch off, and a mind that holds at least two fields at once."

### ApplicationFormSimple
- **The Essay Prompt (KR)**: "당신이 50세가 되었을 때, 본인의 연구가 세상의 어떤 구체적인 장면을 바꾸어 놓았기를 바라십니까? 그 장면 한 컷을 묘사하고, 그 장면에 도달하기 위해 앞으로 5년간 본인이 해결해야 할 가장 어려운 한 가지 문제와, 그 문제가 현재 풀리지 않는 이유 한 가지를 적어 주십시오."
- **The Essay Prompt (EN)**: "When you turn 50, what specific scene in the world do you hope your research will have changed? Describe that single scene, name the one hardest problem you must solve in the next five years to get there, and one reason that problem is currently unsolved."
- 분량: **800–1200자** (한국어 또는 영어)
- 제출 채널: Google Form 1개. **CV·추천서·GPA cutoff 없음.**
- LLM 사용: 폼 안에서 disclosure (전혀 안 씀 / 표현 다듬기만 / 적극 사용). 어느 항목이든 합격 가능. 단 출처와 경험에 대한 거짓 진술 발견 시 합격 취소 + 합격 후 1년 동안 fact-check가 진행되며 거짓 발견 시 펠로우십 종료 + 미지급분 환수.

---

## Wrapper Pages (6 — 모두 동일 패턴)

각 페이지: 제목 + Korean subtitle + "이전 작업 중입니다. 정식 페이지는 2026 Fellows 모집 마감 후 갱신됩니다." + "Apply to the 2026 Cohort →" 단일 CTA.

- `/team` — Lab Team / Lab 구성원
- `/research` — Research / 연구 소개
- `/mentors` — Mentors / 멘토진 — 추가 문구: "Princeton (Hasson Lab), BNL, **MIT, Stanford** 협력 멘토 명단은 홈페이지의 Mentor Network 섹션을 참조해 주십시오."
- `/mentorship` — Mentorship / 멘토십 — 추가 문구: "합격한 펠로우는 PI와 주 1회 1:1 미팅, 해외 멘토(Princeton·BNL·**MIT·Stanford**)와 분기별 화상 미팅을 갖습니다."
- `/publications` — Publications / 논문
- `/history` — Lab History / Lab 연혁

---

## Cross-Source Inconsistencies (사전 발견)

| Topic | Source A | Source B | Status |
|-------|----------|----------|--------|
| Application requirements | **README 5/8 commit**: "GPA, English Scores, Recommendation Letters, CV — all required" | **사이트 4곳**: "No CV, no recommendation letters, no GPA cutoff" | 🔴 정면 충돌 |
| MIT/Stanford partnership | **ProgramOverview·ProgramStats·/mentors·/mentorship**: claim 4회 등장 | **MentorNetwork**: BNL 2명 + Princeton 1명만 | 🔴 evidence 부재 |
| AI budget per fellow | **ProgramOverview highlight**: "AI Budget $225/month" | **README**: $25 API + $25 agent ≈ $50/month 추정 | 🟠 4.5x 차이 |
| PhD placement rate | **ProgramStats**: "Expected 90%+ placement" | **현실**: first cohort 미시작 | 🟠 falsifiability fail |
| Form 명세 | **README**: dream / urge to know / cross-domain — 3 essay | **ApplicationFormSimple code**: 단일 통합 essay (50세 + 5년 문제 + 미해결 이유) | 🟡 단순화 vs 원안 |
| Form fields | **README**: GPA·영어성적·추천서·CV 모두 필수 첨부 | **ApplicationFormSimple comment**: GPA·GitHub URL 모두 선택, CV·추천서 없음 | 🔴 정면 충돌 |
