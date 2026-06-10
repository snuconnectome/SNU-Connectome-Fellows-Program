# T1 Prompt — 트랙 ① Brain Foundation Model (fMRI + 전기생리 병합)

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

## MASTER THEME (snu_neurox) — 사람 참조용, 본문 팔레트는 아래 프롬프트에 주입됨
background #FFFFFF · primary #003380 (headings) · accent #E69F00 (hero metric only) · secondary #0072B2 (diagram) · text #282945 · box_fill #EDF6FC
typography: title 32pt Bold, subtitle 22pt, body 18pt, hero 32pt Bold #E69F00, caption 12pt #5A5A6E

## Prompt for nanobanana2
16:9 한국어 학술 인포그래픽. 흰 배경, 깔끔하고 여백이 넉넉한 발표 스타일. 텍스트가 빼곡한 카드 대신, 두 종류의 뇌 신호를 하나로 합치는 과정을 **그림(메타포 다이어그램)으로** 보여주는 화면.

맨 위 가운데에 한 줄 제목을 진한 남색(32pt Bold #003380)으로: "한 모델로 합치는 두 가지 뇌 신호". 그 아래 더 작은 회청색(22pt #0072B2) 부제 한 줄: "어디서 일어났는가와 언제 일어났는가를 함께 읽기".

화면을 시각적으로 세 구역으로 구성한다. 왼쪽 위와 왼쪽 아래에 서로 대비되는 두 개의 큰 그림, 그리고 그 둘이 가운데 오른쪽의 합쳐진 결과로 흘러 들어가는 구도.

왼쪽 위 그림 — 느리지만 뇌 전체를 보는 신호: 부드러운 곡선의 사람 머리 옆모습 실루엣(flat line, 연한 회청색 #0072B2) 안에 뇌 전체가 은은한 얼음색(#EDF6FC)으로 채워져 빛나는 모습. 옆에 작은 비디오 재생 삼각형 픽토그램 하나. 이 그림 아래 짧은 한글 캡션(18pt #282945): "혈류로 본 뇌 전체 · 초 단위".

왼쪽 아래 그림 — 빠르지만 좁은 곳을 보는 신호: 같은 머리 실루엣 위 한 점에 가느다란 바늘 같은 전극 하나가 꽂히고, 거기서 뾰족한 전기 파형(스파이크) 몇 개가 진한 주황색(#E69F00)으로 튀어나오는 모습. 옆에 작은 마이크 픽토그램 하나. 이 그림 아래 짧은 한글 캡션(18pt #282945): "전극으로 직접 잰 전기 · 밀리초 단위".

이 두 그림 사이의 빈 공간에, 두 신호의 시간 단위가 얼마나 다른지를 강조하는 가장 큰 핵심 수치를 진한 주황(32pt Bold #E69F00)으로: "1,000배". 바로 아래 작은 회색 캡션(12pt #5A5A6E): "시간 해상도 차이".

가운데에서 오른쪽으로, 두 그림에서 굵고 부드러운 곡선 화살표(연한 회청색 #0072B2) 두 개가 모여 오른쪽의 하나의 둥근 코어로 흘러 들어간다. 오른쪽 코어는 얼음색(#EDF6FC)으로 채운 둥근 사각형 안에 격자형 신경망 매듭(flat line, 남색 #003380) 하나를 그린 모습 — 두 신호가 한곳에서 만나는 통합 모델. 코어 아래 짧은 한글 라벨(18pt Bold #003380): "하나의 뇌 파운데이션 모델".

화면 맨 아래에 가느다란 한 줄 띠로 lab 논문 출처를 작은 글씨(14pt #5A5A6E)로 한 줄 표기: "SwiFT V2 (CCN 2025) · MBBN arXiv:2503.23394 · DIVER-1 arXiv:2512.19097".

오른쪽 맨 아래 모서리에 아주 작게(12pt #5A5A6E): "SNU Connectome Fellows".

숫자 규칙: 이미지 안 숫자는 오직 "1,000배", "CCN 2025", "arXiv:2503.23394", "arXiv:2512.19097" 만 쓴다. 다른 숫자나 백분율을 절대 지어내지 말 것.

그림 안의 모든 글자는 위에 적힌 한글 문구와 논문 출처 줄만 쓴다. 화면 위치나 도형 종류를 가리키는 어떤 글자도 이미지 안에 쓰지 말 것. 픽토그램에는 글자를 넣지 말 것.

## Style Rules
한글 짧은 명사구만. 시각 블록당 한 줄. 핵심 수치는 1,000배 하나만 주황 강조. 곡선 화살표는 부드럽게, 대각선·3D·광택 금지. 머리 실루엣 2개는 같은 형태로 통일.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no circular flow diagram, no hub-and-spoke layout, no radial layout, no center-node network, no photorealistic icons, no gradients on text, no English words, no English structural labels (left/right/panel/hub/input/output), no diagram-method names rendered as text, no invented internal panel headings, no text inside pictograms, no invented numbers or percentages

## Fallback Layout
좌상단 머리+뇌(비디오), 좌하단 머리+전극+스파이크(마이크), 둘 사이에 "1,000배", 두 곡선 화살표가 우측 통합 코어(신경망 매듭)로 수렴, 하단 논문 출처 띠.

## Self-Validation
시각 인코딩(메타포 다이어그램) ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 핵심 수치 1개(1,000배) ✓ · 메시지 1개(두 신호→한 모델) ✓ · 영어 구조어 제거 ✓ · 숫자 화이트리스트 ✓

## Review Status
READY
