# T3 Prompt — 통합 비전 (AI Scientist for Brain)

## API Configuration
model: gemini-3.1-flash-image-preview
resolution: 4K (3840x2160 for 16:9)
thinking_mode: high
language: ko
grounding: google_image_search

## Rendering Rule
- Text with pt size + color → RENDER in image (단, 괄호 안 pt/HEX 주석은 사람용 — 렌더 금지)
- Fallback Layout / Self-Validation / Style Rules → DO NOT render, context only
- Layout-method names, English structural words → NEVER render as visible text

## MASTER THEME (snu_neurox) — 사람 참조용
background #FFFFFF · primary #003380 (headings) · accent #E69F00 (hero metric only) · secondary #0072B2 (diagram) · text #282945 · box_fill #EDF6FC
typography: title 32pt Bold, subtitle 22pt, body 18pt, hero 32pt Bold #E69F00, caption 12pt #5A5A6E

## Prompt for nanobanana2
16:9 한국어 학술 인포그래픽. 흰 배경, 여백이 넉넉한 깔끔한 발표 스타일. 텍스트 카드 대신, "두 뇌 모델을 눈으로 삼아 스스로 연구하는 AI 연구 파트너"라는 개념을 **그림(메타포)으로** 보여주는 화면.

맨 위 가운데 한 줄 제목을 진한 남색(32pt Bold #003380)으로: "뇌를 위한 AI 과학자". 그 아래 작은 회청색(22pt #0072B2) 부제 한 줄: "두 뇌 모델을 도구로, 스스로 가설을 세우고 실험하는 AI".

화면 가운데 위쪽에, 둥글고 친근한 인공지능 에이전트 캐릭터 하나(flat line + 얼음색 #EDF6FC 채움, 남색 #003380 외곽선)를 둔다. 말풍선 하나가 옆에 떠 있다.

이 에이전트가 두 개의 "눈"을 도구로 들고 있다는 뜻으로, 에이전트 아래 좌우에 둥근 사각형 두 개(둘 다 얼음색 #EDF6FC 채움, 남색 얇은 테두리)를 두고 각각 작은 눈(👁 모양이 아니라 단순한 렌즈/눈동자 픽토그램, flat line) 하나씩을 그린다. 두 사각형에서 에이전트로 가느다란 직선 연결선 두 개가 위로 이어진다.
- 왼쪽 둥근 사각형 아래 짧은 한글 라벨(16pt Bold #003380): "신호를 보는 눈 ①". 그 아래 더 작게(14pt #282945): "fMRI · 전기생리".
- 오른쪽 둥근 사각형 아래 짧은 한글 라벨(16pt Bold #003380): "신호를 보는 눈 ②". 그 아래 더 작게(14pt #282945): "연속 신경장".

화면 오른쪽에 위에서 아래로 세 단계가 짧은 수직 직선 화살표로 한 줄로 이어진 흐름을 둔다(둥글게 돌지 않고 곧게 아래로). 각 단계는 작은 픽토그램 + 한글 라벨(18pt #282945):
- 1단계: 전구 픽토그램. 라벨 "가설을 세우고".
- 2단계: 플라스크 픽토그램. 라벨 "실험을 돌리고".
- 3단계: 똑같이 겹친 두 장의 문서(체크 표시가 붙은) 픽토그램. 라벨 "결과를 재현한다".

에이전트에서 이 세 단계 흐름의 맨 위로 짧은 직선 화살표 하나(연한 회청색 #0072B2)가 이어져, AI가 이 과정을 스스로 진행한다는 느낌을 준다.

화면 맨 아래 가느다란 한 줄 띠로 작은 글씨(14pt #5A5A6E) 한 줄: "두 트랙의 뇌 모델을 도구로 묶는 compound·agentic AI · NeuroX 컨소시움".

오른쪽 맨 아래 모서리에 아주 작게(12pt #5A5A6E): "SNU Connectome Fellows".

숫자 규칙: 이미지 안에 어떤 숫자나 백분율도 지어내지 말 것. 동그라미 숫자 ①②만 라벨에 허용.

그림 안의 모든 글자는 위에 적힌 한글 문구만 쓴다. 영어 단어와 영어 구조 라벨을 이미지 안에 절대 글자로 쓰지 말 것(맨 아래 띠의 compound·agentic AI · NeuroX 와 fMRI 만 예외로 허용). 픽토그램 안에는 글자를 넣지 말 것. 패널 안에 요청하지 않은 헤딩을 멋대로 추가하지 말 것.

## Style Rules
한글 짧은 명사구만. 에이전트 1명 + 눈 2개 + 수직 3단계. 세 단계는 위에서 아래로 수직 직선 화살표로만 이어 붙임(둥글게 도는 배치 금지). 대각선·3D·광택 금지. 친근하고 단순한 캐릭터.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no ring-shaped flow, no looping cycle arrows, no hub-and-spoke layout, no radial layout, no center-node network, no photorealistic icons, no gradients on text, no English words except the bottom strip, no English structural labels (agent/tool/eye/input/output/hypothesis), no diagram-method names rendered as text, no invented internal panel headings, no text inside pictograms, no invented numbers or percentages

## Fallback Layout
상단 가운데 AI 에이전트 캐릭터 + 말풍선, 그 아래 좌우 "눈" 둥근 사각형 2개(fMRI·전기생리 / 연속 신경장), 오른쪽 수직 3단계(가설→실험→재현), 하단 compound·agentic AI · NeuroX 띠.

## Self-Validation
시각 인코딩(에이전트+두 눈+수직 3단계 메타포) ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 둥글게 도는 배치 회피(수직 나열) ✓ · 영어 구조어 제거(하단 띠 예외) ✓ · 숫자 환각 차단 ✓

## Review Status
READY
