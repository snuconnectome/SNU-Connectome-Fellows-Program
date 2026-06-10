# T4 Prompt — NeuroX 컨소시움 (AI Scientist for Brain)

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
background #FFFFFF · primary #003380 (headings) · accent #E69F00 (hero number only) · secondary #0072B2 (diagram lines) · text #282945 · box_fill #EDF6FC
typography: title 32pt Bold, subtitle 22pt, body 18pt, hero 32pt Bold #E69F00, caption 12pt #5A5A6E

## Prompt for nanobanana2
16:9 한국어 학술 인포그래픽. 흰 배경, 여백이 넉넉한 깔끔한 발표 스타일. "여러 뇌 모델을 도구로 묶어 스스로 연구하는 AI 과학자를, 여러 기관이 함께 만든다"라는 개념을 **그림(허브-스포크 + 좌→중→우 흐름)으로** 보여주는 화면. 화면을 왼쪽·가운데·오른쪽 세 구역으로 가른다.

맨 위 가운데 한 줄 제목을 진한 남색(32pt Bold #003380)으로: "뇌를 위한 AI 과학자". 그 아래 작은 회청색(22pt #0072B2) 부제 한 줄: "여러 뇌 모델을 도구로 스스로 가설을 세우고 실험하는 자율 AI".

가운데 구역: 화면 정중앙에 둥글고 친근한 인공지능 에이전트 캐릭터 하나(flat line + 얼음색 #EDF6FC 채움, 남색 #003380 외곽선)를 크게 둔다. 캐릭터 바로 아래 짧은 한글 라벨(18pt Bold #003380): "뇌를 위한 AI 과학자". 그 아래 더 작게(14pt #282945): "가설 → 실험 → 재현".

왼쪽 구역(입력): 가운데 캐릭터 왼쪽에, 위아래로 둥근 사각형 두 개(둘 다 얼음색 #EDF6FC 채움, 남색 얇은 테두리)를 둔다. 두 사각형에서 가운데 캐릭터로 향하는 가느다란 수평 직선 화살표(연한 회청색 #0072B2)를 각각 하나씩 그린다.
- 위쪽 사각형 안에 작은 렌즈/모듈 픽토그램(flat line) 하나. 사각형 아래 한글 라벨(16pt Bold #003380): "여러 뇌 모델". 그 아래 더 작게(14pt #282945): "도구처럼 하나로".
- 아래쪽 사각형 안에 작은 사람 4명이 모인 팀 픽토그램(flat line) 하나. 사각형 아래 한글 라벨(16pt Bold #003380): "융합 연구팀". 그 아래 회청색(18pt #0072B2)으로 큰 글씨 "50여 명". 그 아래 더 작게(14pt #282945): "서울대 · 성균관대 · 한양대 · KBRI · 서울대병원 · 미국 BNL".

오른쪽 구역(출력): 가운데 캐릭터에서 오른쪽으로 향하는 가느다란 수평 직선 화살표(연한 회청색 #0072B2) 하나가 이어진다. 그 끝 위쪽에 한글 소제목(18pt Bold #003380): "3대 난제 돌파". 바로 아래 위에서 아래로 짧은 한글 라벨 세 줄(16pt #282945), 각 줄 앞에 작은 체크 픽토그램(flat line) 하나씩:
- "재현성"
- "인과성"
- "개인차"
그 아래쪽, 같은 오른쪽 구역에 둥근 사각형 두 개(가로로 나란히, 얼음색 #EDF6FC 채움)를 두고 각 사각형 안에 한글 두 줄:
- 왼쪽 사각형: 위 줄(16pt Bold #003380) "조기 선별", 아래 줄(14pt #282945) "증상 3~5년 전".
- 오른쪽 사각형: 위 줄(16pt Bold #003380) "정밀 치료", 아래 줄(14pt #282945) "환자 맞춤 뇌 자극".

화면 맨 아래 가느다란 한 줄 띠로 작은 글씨(14pt #5A5A6E) 한 줄: "여러 뇌 모델을 도구로 묶는 compound·agentic AI · NeuroX 컨소시움".

오른쪽 맨 아래 모서리에 아주 작게(12pt #5A5A6E): "SNU Connectome Fellows".

숫자 규칙: 이미지 안에 "50여 명"과 "3~5년 전" 두 표현 외에는 어떤 숫자나 백분율도 지어내지 말 것. 사람 픽토그램 개수는 라벨 숫자가 아니라 단순 그림일 뿐이다.

그림 안의 모든 글자는 위에 적힌 한글 문구만 쓴다. 영어 단어와 영어 구조 라벨을 이미지 안에 절대 글자로 쓰지 말 것(맨 아래 띠의 compound·agentic AI · NeuroX, 그리고 기관 라벨의 KBRI · BNL 만 예외로 허용). 픽토그램 안에는 글자를 넣지 말 것. 패널 안에 요청하지 않은 헤딩을 멋대로 추가하지 말 것.

## Style Rules
한글 짧은 명사구만. 좌(입력 2박스)→중(에이전트 1명)→우(난제 3 + 성과 2박스) 한 방향 수평 흐름. 화살표는 모두 수평 직선만(둥글게 도는 배치·순환 금지). 대각선·3D·광택 금지. 친근하고 단순한 캐릭터.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no ring-shaped flow, no looping cycle arrows, no circular diagram, no radial cycle, no curved arrows, no diagonal arrows, no network graph with many nodes, no photorealistic icons, no gradients on text, no English words except the bottom strip and the institution labels KBRI and BNL, no English structural labels (input/output/hub/agent/tool/consortium/pipeline), no diagram-method names rendered as text, no invented internal panel headings, no text inside pictograms, no invented numbers or percentages

## Fallback Layout
좌측 위아래 입력 박스 2개("여러 뇌 모델" / "융합 연구팀 50여 명, 6기관") → 가운데 AI 에이전트 캐릭터(가설→실험→재현) → 우측 "3대 난제 돌파(재현성·인과성·개인차)"와 성과 박스 2개("조기 선별 3~5년 전" / "정밀 치료"). 하단 compound·agentic AI · NeuroX 띠.

## Self-Validation
시각 인코딩(좌 입력 2박스 + 중 에이전트 + 우 난제3·성과2 메타포) ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 수평 직선 흐름(순환·곡선 회피) ✓ · 영어 구조어 제거(하단 띠·KBRI·BNL 예외) ✓ · 숫자 화이트리스트(50여 명·3~5년 전만) ✓ · 허브-스포크 1단계, 네트워크 그래프 회피 ✓

## Review Status
READY
