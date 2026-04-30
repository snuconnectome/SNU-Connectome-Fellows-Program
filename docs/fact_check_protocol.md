# Fact-Check Protocol — Connectome Fellows 합격자 1년 검증

**목적**: 사이트의 "1년 fact-check" 약속을 promise theater가 아닌 enforceable commitment로 만든다. 거짓 진술 발견 시 펠로우십 종료 + 미지급분 환수.

**적용 대상**: 매 cohort 합격자 전원. 합격 통보 직후 본 protocol을 fellowship 계약서에 첨부하여 서명 받는다.

---

## 1. PI 캘린더 reminder 등록 (합격 통보 직후, 5분)

합격 발표 이메일 발송 직후, PI Google Calendar에 다음 두 reminder 설정:

- **D+180 (6개월)**: "Fact-check checkpoint 1 — [합격자 이름]"
- **D+365 (1년)**: "Fact-check checkpoint 2 — [합격자 이름]"

각 event description에 본 protocol URL과 합격자 application id (Google Sheets row link)를 첨부.

## 2. 6개월 checkpoint (D+180)

**소요시간**: 합격자당 30분.

**A. Essay 출처 검증** (해당 시):
P1 dream essay 또는 면접 답변에서 합격자가 인용한 출처(책/논문/대화 등)를 무작위로 1개 선택하여 다음 질문을 던진다:
> "본인이 [출처명]에서 인용한 부분을 다시 보았을 때, 가장 *동의하기 어려웠던* 한 가지를 짚어 주실 수 있나요?"

답변 평가 기준:
- **통과**: 구체적인 페이지/장/구절 수준에서 답변. 본인의 reasoning이 출처와 차별화됨.
- **경고**: 일반론 답변, 출처 디테일 부재. 다른 출처로 추가 검증 → 1주 후 재시도.
- **위반**: 본인이 인용한 출처를 *명백히 본 적 없음* (텍스트 내용을 모름). → 위반 처리 (Section 4).

**B. LLM disclosure 일치성 검증**:
합격 시 disclosure 라디오 답변 ("전혀 안 씀 / 표현 다듬기만 / 적극 사용")을 합격자 본인의 *6개월간 실제 작문 스타일*과 비교:
- 주간 progress report, Slack 메시지, 회의록의 자연 발화 vs essay 문체 disparity
- 일관성 부족 시: "essay 작성 당시 LLM 사용을 어떻게 disclosure하셨고, 지금 작문 방식과 어떤 차이가 있는지" 1:1 대화에서 직접 질문.

**C. 기록**:
checkpoint 결과를 Notion 또는 Google Sheets `fact_check_log_2026.{tsv,md}`에 기록:
- 합격자 이름 / 일자 / verification A 결과 / verification B 결과 / 다음 step

## 3. 12개월 checkpoint (D+365)

**소요시간**: 합격자당 30분.

6개월 checkpoint과 동일하나 다음을 추가:
- 6개월 checkpoint에서 "경고" 처리된 항목의 후속 검증
- 1년간 누적된 academic output (코드 commit, 논문 draft, 발표 자료)에서 *합격 시 약속한 자질*과 일관된 행동이 관찰되는지 retrospective 평가

## 4. 위반 처리 (Section 1-2 검증 실패 시)

**Step 1 — 1차 통보**: PI가 합격자에게 1:1 미팅 (대면 또는 화상). 검증 결과 공유, 합격자 explanation 청취. 면담 기록 1페이지 작성.

**Step 2 — 결정 (PI 단독)**:
- 단순 misunderstanding으로 판단 시: 경고 + 재검증 (다음 checkpoint).
- 거짓 진술 confirmed: **펠로우십 종료 + 미지급분 (다음 달부터의 stipend, 미사용 conference budget, AI API 미사용분) 환수**. 등록 서약서의 environment 조항에 명문화.

**Step 3 — 처리 시한**: 1차 통보부터 2주 내 결정. 2주 이상 미결정 시 자동 종료 처리.

## 5. 등록 시 서약서 조항 (계약서에 그대로 포함)

> 본인은 SNU Connectome Fellows Program 합격에 사용된 application essay와 면접 답변의 모든 출처·경험·주장이 사실임을 서약합니다. 합격 후 1년 동안 PI 또는 위임받은 검증자에 의한 fact-check가 진행될 수 있음을 이해하며, 거짓 진술이 confirmed될 경우 펠로우십이 즉시 종료되고 통보 시점부터의 미지급분이 환수됨에 동의합니다.
>
> 서명: ___________________ 일자: ___________________

---

## 운영 notes

- 본 protocol은 PI 단독 운영 가능. 박사후·외부 심사자 불요.
- 합격자가 Section 2-A의 출처 검증을 *통과하지 못하더라도* 즉시 위반 처리하지 않는다 — 학부생의 인용 깊이는 시간이 지나며 mature한다. 명백한 fabrication만 위반 처리.
- 검증의 핵심은 *처벌*이 아니라 *진정성을 약속한 합격자에게 약속의 무게를 환기*하는 것이다.
- 본 protocol 파일은 `docs/fact_check_protocol.md`로 보관, 매년 cohort 시작 전 update.

*Last Updated: 2026-04-28 / SNU Connectome Lab*
