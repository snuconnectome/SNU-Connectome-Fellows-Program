# CLAUDE.md — SNU Connectome Fellows Program

## Project Overview
Development of a recruitment and management system for the SNU Connectome Fellows Program. Focuses on attracting top-tier undergraduate talent for Neuroscience Foundation Model research.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Validation**: React Hook Form, Zod.
- **Deployment**: Vercel.

## Development Guidelines
- **Language**: Use TypeScript for all components.
- **Styling**: Use Tailwind CSS. Maintain the "Science/Futuristic" aesthetic.
- **Components**: Follow the structure in `website/src/components/`.
- **Pages**: App Router patterns in `website/src/app/`.

## Recruitment Logic
- **Selection Criteria**:
  - **Required**: 800–1200 word (or 1500–2400 자) dream essay submitted via Google Form. LLM disclosure honesty.
  - **Not required (and not used in scoring)**: CV, recommendation letters, English scores, GPA cutoff. The public site explicitly does not collect these.
  - **Optional self-disclosure** (no scoring weight, used only for cohort planning post-acceptance): GPA, GitHub URL, prior research experience.
  - **Primary Evaluation**: Dream, Urge to Know, Cross-domain Flexibility (via Essay).
- **Program structure (PI 확정 2026-06-07)**: 2-stage — ① 방학 펠로우십 (2026년 7–8월, 2개월 집중 trial) → ② 통과 시 정식 펠로우십 (2026년 9월 ~ 2027년 8월, 1년). 지원 마감 **2026-06-15**.
- **Investment**: ~₩36.2M per fellow (정식 펠로우십 = 통과 후 1년 기준; 방학 펠로우십 처우는 별도 안내) — ₩12M monthly stipend + ₩10M overseas budget + ₩7.2M AI tools + ₩1M books + ₩6M one-time NVIDIA DGX Spark.
- **Cohort Cap**: 3 fellows/year (set by PI weekly 1:1 capacity).
- **Active Mentors**: BNL (Shinjae Yoo, David Keetae Park) + Princeton Hasson Lab. Alumni network: MIT EECS, Stanford.
- **Key Research Areas**: Brain Foundation Models, Generative Brain Models, LLM-Brain Alignment.

## Command Shortcuts
- `npm run dev`: Start local development server.
- `npm install`: Install dependencies.

## Document Status

| 파일 | 상태 | 비고 |
|------|------|------|
| `docs/RECRUITMENT_POSTING.md` | **v2 (현재 공식 본문)** | Notion review 페이지에 미러링됨. |
| `docs/RECRUITMENT_POSTING_v3_draft.md` | **v3 draft** | self-selection 10개 권고 반영. Notion publishing 페이지로 push됨. PI 미확정 placeholder 4곳 존재. |
| `docs/RECRUITMENT_POSTING_REVIEW_GUIDE.md` | active | 대학원생 피드백 라운드 가이드 (요청 template + 7항목 체크리스트). |
| `templates/APPLICATION_FORM.md` | **deprecated** | 평가 기준 100점 — 구버전 GPA/추천서 정책. CLAUDE.md "Recruitment Logic" 의 새 정책과 충돌. 후속 sprint 에서 정렬 또는 삭제 권고. |
| `docs/ADMINISTRATIVE_PLAN.md` | **deprecated (partial)** | 평가 기준 100점 — 같은 사유. 행정 절차 부분은 유지, 평가 기준만 deprecate. |

## Notion Pages

| 페이지 | URL | 목적 |
|--------|-----|------|
| Review | https://www.notion.so/36c41454561d809e8025fa104f1766c1 | 대학원생 피드백 라운드 (v2 + 7항목 체크리스트). |
| Publishing | https://www.notion.so/36c41454561d8195869bfabffa330abe | 학생 배포용 (v3 본문만, 피드백 안내 제거). |

두 페이지 분리 운영 의도: review surface 와 학생-facing surface 를 격리해 internal feedback 노이즈가 학부생에게 노출되지 않도록 함.

## Trinity Review Findings (2026-05-26)

광고문 v3 draft 에 대한 Trinity multi-agent review (codex + claude + antigravity) 결과 — **PI 확정 후 v4 에서 통합 예정**.

### BLOCKING (3건, v3 draft 미반영)
1. **₩36.2M commingling** — 총액 ₩36.2M 이 5개 카테고리(현금/해외/AI/도서/장비)를 단일 합산으로 표시. 회계상 분리 필요. → v4 에서 카테고리별 breakdown 명시.
2. **"Claude Code 무제한"** — 실제 tier 미명시. Anthropic 정책상 "무제한"은 부정확. → v4 에서 정확한 tier/한도 명시.
3. **UKB 50K → 100K** — 광고문 내 UK Biobank 표본 수치(50K)는 outdated. 최신 release 100K 로 갱신 필요.

### IMPORTANT (3건)
4. 잠정 vs 확정 표현 모순 — 일부 항목은 "잠정" 표기, 일부는 "확정" 표기. tone 일관성 정비.
5. 1명 + 최대 3명 framing — cohort cap framing 명확화 ("올해 1명 우선 + 최대 3명까지 확장 가능" vs "최대 3명").
6. 50년 essay 평가 기준 footnote — "50세 본인 모습" 평가 기준 객관화 필요. 채점 rubric footnote 추가 권고.

### NEW (2건, 추가 사전 확인 항목)
7. **SNU 산학협력단 학부생 인건비 상한 규정** 사전 확인 — 월 100만원 stipend 가 SNU IIRC(산학협력단) 학부생 인건비 상한 규정에 부합하는지 확인 필요.
8. **Unused funds · 조기 종료 · 장비 손상 약관** — DGX Spark 개인 지급 조건, 펠로우십 조기 종료 시 자금/장비 회수 정책, 장비 손상 책임 약관 등 행정 조항 보강 필요.
