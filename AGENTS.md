# AGENTS.md

> Navigation guide for AI agents (Claude / Codex / Cursor / Antigravity) entering this repository.
> Repo: **SNU Connectome Fellows Program** — Transconnectome/SNU-Connectome-Fellows-Program (+ snuconnectome public mirror).

---

## Repo 정체성

이 repo 는 **서울대학교 Connectome Lab 학부생 펠로우십(SNU Connectome Fellows Program)** 의 **모집(recruitment) 시스템**을 호스팅합니다. Neuroscience Foundation Model 연구를 수행할 학부생을 선발·관리하기 위한 광고문(recruitment posting), 행정 계획, 멘토 네트워크, 그리고 Next.js 14 기반 모집 웹사이트로 구성됩니다.

PI: **차지욱 교수** (Connectome Lab, SNU). 본 repo 의 모든 정책·금액·일정은 PI 의사결정에 의해 변경될 수 있으며, AI agent 는 정량 주장(₩금액, sample size, "무제한" 등)을 ground truth 로 가정하지 말고 **fact-check** 후 갱신해야 합니다.

---

## 광고문 작업 (Recruitment Posting)

### 진행 중 작업 흐름
- **v2** (official, Notion review 페이지 mirror) → **v3 draft** (self-selection 10개 권고 반영, Notion publishing 페이지 push 됨) → **v4** (PI 확정 후 Trinity findings 통합 예정).

### Source of Truth Files
| 파일 | 역할 |
|------|------|
| `docs/RECRUITMENT_POSTING.md` | v2 official 광고문 본문. |
| `docs/RECRUITMENT_POSTING_v3_draft.md` | v3 draft. PI 미확정 placeholder 4곳 존재. |
| `docs/RECRUITMENT_POSTING_REVIEW_GUIDE.md` | 대학원생 피드백 라운드 가이드 (요청 template + 7항목 체크리스트). |
| `CLAUDE.md` "Recruitment Logic" 섹션 | 선발 정책 ground truth (essay-only, no GPA/CV/추천서). |

### 알려진 placeholder / TODO
- `website/src/components/forms/ApplicationFormSimple.tsx` (line 13): Notion 폼 URL `TODO_REPLACE_BEFORE_DEPLOY` — PI 가 Notion form URL 확정 후 갱신 필요.

### 정책 충돌 (deprecated 파일)
- `templates/APPLICATION_FORM.md` 평가 기준 100점 — **deprecated**. 구버전 GPA/추천서 정책. `CLAUDE.md` "Recruitment Logic" 의 새 정책 (essay-only) 이 ground truth.
- `docs/ADMINISTRATIVE_PLAN.md` 평가 기준 100점 — 같은 사유로 partial deprecated. 행정 절차 부분은 유지.

후속 sprint 에서 정렬 또는 삭제 권고.

---

## Notion 미러 (2 surfaces)

| Surface | URL | 독자 |
|---------|-----|------|
| **Review** | https://www.notion.so/36c41454561d809e8025fa104f1766c1 | 대학원생 (internal feedback round) |
| **Publishing** | https://www.notion.so/36c41454561d8195869bfabffa330abe | 학부생 (public-facing 배포 surface) |

### 업데이트 방식
- `mcp__claude_ai_Notion__notion-update-page` (Notion MCP integration), 또는 Notion API token 직접 호출.
- 두 페이지 모두 **Notion native table block** 으로 변환되어 있어, **cell 내부의 inline markdown bold(`**text**`) 는 렌더링되지 않습니다.** 강조 line 은 표 외부의 별도 paragraph 로 처리해야 합니다.
- Markdown source ↔ Notion 사이의 sync 는 **수동(manual mirror)**. 자동 동기화 없음. 본문 변경 시 두 페이지 모두 동기화 여부를 확인하세요.

---

## Trinity Multi-Agent Review (옵션)

### 사용 시점
중요 변경 (광고문 v3 → v4, 정책 변경, 모집 시작 직전) 전 외부 검증이 필요할 때.

### 명령
```bash
trinity review --difficulty hard --file docs/RECRUITMENT_POSTING_v3_draft.md
```

### 최근 review
- **Date**: 2026-05-26
- **Output**: `/tmp/trinity_review2.log`
- Findings 는 `CLAUDE.md` "Trinity Review Findings (2026-05-26)" 섹션 참조 (BLOCKING 3건 + IMPORTANT 3건 + NEW 2건).

### Provider 상태
- `codex`, `claude`, `antigravity` — 모두 `smoke_only` mode 로 사용 가능.

---

## File Structure 핵심

```
SNU-Connectome-Fellows-Program/
├── README.md                  # 광고문 본문 + 프로그램 소개 (배포용)
├── CLAUDE.md                  # AI agent 가이드 (Recruitment Logic + Notion + Trinity findings)
├── AGENTS.md                  # 이 파일 — repo navigation guide
├── docs/
│   ├── RECRUITMENT_POSTING.md             # v2 official
│   ├── RECRUITMENT_POSTING_v3_draft.md    # v3 draft (PI 미확정 placeholder)
│   ├── RECRUITMENT_POSTING_REVIEW_GUIDE.md # 피드백 라운드 가이드
│   ├── ADMINISTRATIVE_PLAN.md             # partial deprecated (평가 기준 100점만)
│   ├── BUDGET_ANALYSIS.md
│   ├── CURRICULUM.md
│   ├── MENTOR_NETWORK.md
│   └── ...
├── templates/
│   └── APPLICATION_FORM.md    # deprecated (구버전 정책)
├── configs/
│   └── settings.yaml          # funding/timeline ground truth
└── website/                   # Next.js 14 App Router 모집 사이트
    └── src/
        ├── app/               # App router pages
        └── components/
            └── forms/
                └── ApplicationFormSimple.tsx  # 학생 지원 폼 (현재 비활성, Notion form URL placeholder)
```

---

## 작업 시 주의 (RULES)

1. **README / CLAUDE.md 본문은 source-of-truth 가 아닙니다.** 광고문 변경 시 `docs/RECRUITMENT_POSTING*.md` 를 먼저 편집하고, README/Notion 으로 mirror 하세요.
2. **`ApplicationFormSimple.tsx` 의 폼 URL/필드 정의는 광고문 v3 와 정합 유지 필요.** 평가 기준이 달라지면 폼 필드도 함께 갱신.
3. **Notion 페이지 update 시 mirror 양쪽 (review + publishing) 동기화 검토.** 한쪽만 업데이트하면 두 surface 가 분기됩니다.
4. **정량 주장은 fact-check 필수.** ₩36.2M (5 카테고리 commingling), UKB 50K (실제 100K), "Claude Code 무제한" (실제 tier 한도 존재) 등은 Trinity finding 으로 정확성 의문 제기됨. PI 확정 후만 ground truth 로 사용.
5. **Deprecated 파일 (`templates/APPLICATION_FORM.md`, `docs/ADMINISTRATIVE_PLAN.md` 평가 기준 부분) 은 참조하지 말 것.** `CLAUDE.md` "Recruitment Logic" 이 새 정책 ground truth.
6. **학생 PII 외부 유출 금지.** 향후 지원자 데이터가 들어오면 외부 LLM 호출 차단 (NLM 등 외부 KB 업로드 금지).

---

*Last updated: 2026-05-27 (광고문 v3 draft + Notion 미러링 + Trinity review 2026-05-26 통합)*
