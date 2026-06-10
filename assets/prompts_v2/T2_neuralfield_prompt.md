# T2 Prompt — 트랙 ② Continuous Neural Field

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
16:9 한국어 학술 인포그래픽. 흰 배경, 여백이 넉넉한 깔끔한 발표 스타일. 텍스트 카드 대신, "딱딱한 격자를 버리고 좌표를 매끄러운 연속 지형으로 바꾼다"는 개념을 **그림(메타포)으로** 보여주는 화면.

맨 위 가운데 한 줄 제목을 진한 남색(32pt Bold #003380)으로: "격자를 넘어, 좌표에서 뇌 활동으로". 그 아래 작은 회청색(22pt #0072B2) 부제 한 줄: "사람·실험·장비가 달라도 하나의 공통 공간에 정렬".

화면을 왼쪽 절반과 오른쪽 절반의 변환(왼쪽이 오른쪽으로 바뀌는) 구도로 구성한다. 가운데에 부드러운 오른쪽 방향 곡선 화살표(연한 회청색 #0072B2) 하나로 둘을 잇는다.

왼쪽 그림 — 버리는 것: 네모난 픽셀이 또렷하게 보이는 거칠고 각진 격자 형태의 작은 뇌 모양(연한 회색 외곽선, 계단처럼 끊긴 경계). 살짝 흐릿하게, 한 단계 뒤로 물러난 느낌. 이 그림 아래 짧은 한글 캡션(18pt #282945): "끊긴 격자".

오른쪽 그림 — 얻는 것: 같은 뇌 모양이지만 픽셀이 사라지고, 매끄러운 등고선처럼 연속적으로 흐르는 부드러운 지형(얼음색 #EDF6FC 채움 위에 남색 #003380 등고선)으로 다시 그려진 모습. 위로 또렷하고 선명하게. 이 그림 아래 짧은 한글 캡션(18pt #282945): "이어진 연속 지형".

오른쪽 그림의 한 점에 작은 좌표 십자(+) 표식 하나를 두고, 그 점에서 위로 작은 값 막대 하나가 솟아오르게 하여 "좌표를 넣으면 뇌 활동이 나온다"는 느낌을 준다. 이 부분 옆 짧은 한글 라벨(16pt #282945): "좌표 → 뇌 활동".

화면 왼쪽 아래에, 서로 다른 출처의 뇌 데이터가 하나로 모인다는 뜻으로, 작은 쥐 옆모습 픽토그램 하나와 작은 사람 머리 옆모습 픽토그램 하나가 같은 곡선 화살표를 따라 오른쪽 연속 지형으로 모이는 모습(둘 다 flat line, 연한 회청색 #0072B2). 그 아래 짧은 한글 캡션(16pt #282945): "마우스부터 사람까지 한 공간에".

화면 맨 아래 가느다란 한 줄 띠로 lab 논문 출처를 작은 글씨(14pt #5A5A6E)로 한 줄 표기: "OmniField arXiv:2511.02205 · Mamba-GINR (NeurIPS 2025 WS) · STACI arXiv:2505.21658". 그 옆 같은 줄 끝에 작은 회색 글씨(14pt #5A5A6E)로 리드 표기: "리드 David Keetae Park".

오른쪽 맨 아래 모서리에 아주 작게(12pt #5A5A6E): "SNU Connectome Fellows".

숫자 규칙: 이미지 안 숫자는 오직 "arXiv:2511.02205", "arXiv:2505.21658", "NeurIPS 2025" 만 쓴다. 다른 숫자나 백분율을 절대 지어내지 말 것.

그림 안의 모든 글자는 위에 적힌 한글 문구와 논문 출처 줄만 쓴다(사람 이름 David Keetae Park 와 논문 약칭 OmniField·Mamba-GINR·STACI 는 출처 줄에서만 허용). 화면 위치나 도형 종류를 가리키는 어떤 글자도 이미지 안에 쓰지 말 것. 픽토그램에는 글자를 넣지 말 것.

## Style Rules
한글 짧은 명사구만. 왼쪽=각진 격자, 오른쪽=매끄러운 등고선의 대비를 또렷하게. 곡선 화살표는 하나만, 왼→오 방향. 핵심은 변환(격자 버림) 하나. 대각선·3D·광택 금지.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no circular diagram, no hub-and-spoke layout, no radial layout, no center-node network, no photorealistic icons, no gradients on text, no English structural labels (left/right/grid/field/coordinate/input/output), no diagram-method names rendered as text, no invented internal panel headings, no text inside pictograms, no invented numbers or percentages

## Fallback Layout
좌(각진 격자 뇌, 흐림) → 가운데 곡선 화살표 → 우(매끄러운 등고선 뇌, 선명 + 좌표십자 + 값막대), 좌하단 쥐+사람 픽토그램이 우측으로 수렴, 하단 논문 출처 띠.

## Self-Validation
시각 인코딩(격자→연속 변환 메타포) ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 핵심 메시지 1개(격자 버림) ✓ · 영어 구조어 제거 ✓ · 숫자 화이트리스트 ✓

## Review Status
READY
