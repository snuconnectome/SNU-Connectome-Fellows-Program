# S1 Prompt — 트랙 ① fMRI Foundation Model

## API Configuration
model: gemini-3.1-flash-image-preview
resolution: 4K (3840x2160 for 16:9)
thinking_mode: high
language: ko
grounding: google_image_search

## Rendering Rule
- Text with pt size + color → RENDER in image
- Fallback Layout / Self-Validation / Style Rules → DO NOT render, context only
- Design instructions (layout, positioning) → follow as structure guide, do not render

## MASTER THEME (snu_neurox)
background #FFFFFF · primary #003380 (headings) · accent #E69F00 (hero metric only) · secondary #0072B2 (diagram) · text #282945 · box_fill #EDF6FC
typography: title 32pt Bold, subtitle 22pt, body 18pt, hero 32pt Bold #E69F00, caption 12pt #5A5A6E
card: rounded rectangle, thin outline, soft fill, no heavy shadow · icon: flat line/silhouette only

## Prompt for nanobanana2
16:9 한국어 학술 인포그래픽, 흰 배경, 깔끔하고 여백 있는 발표 스타일.

상단 제목 (32pt Bold #003380): "① fMRI 파운데이션 모델"
부제 (22pt #0072B2): "대규모 뇌 활동에서 일반화 가능한 표상 학습"

좌측 60% — 번호 카드 3개를 위에서 아래로 배치, 카드 사이 짧은 수직 직선 화살표:
- 카드 1 (#EDF6FC 채움, #003380 얇은 테두리): 뇌 스캔 아이콘(flat line). 제목 "대규모 데이터" (18pt Bold #003380). 본문 "UK Biobank · HCP · Narratives · NSD" (16pt #282945)
- 카드 2: 신경망 노드 아이콘. 제목 "뇌 파운데이션 모델" (18pt Bold). 본문 "자기지도 학습 · 일반화 표상" (16pt)
- 카드 3: 말풍선 아이콘. 제목 "언어모델 에이전트 비전" (18pt Bold). 본문 "뇌 상태를 자연어로 추론 (중장기 로드맵)" (16pt)

우측 40% 상단 — 큰 핵심 수치 (32pt Bold #E69F00): "5만 명" / 그 아래 캡션 (12pt #5A5A6E): "UK Biobank fMRI 코호트"

우측 40% 하단 — #EDF6FC 박스: 작은 제목 "Lab 연구" (18pt Bold #003380), 본문 "NeuroMamba · SwiFT V2 · MBBN" (16pt #282945)

하단 우측 모서리 (12pt #5A5A6E): "SNU Connectome Fellows"

## Style Rules
한글 짧은 명사구, 시각 블록당 최대 2줄. 핵심 수치 1개만 강조. 직선 수직 화살표만.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no circular diagrams, no photorealistic icons, no gradients on text, no English structural labels, no invented internal labels

## Fallback Layout
좌측 60% 3 카드 수직 스택(①②③), 우측 40% 상단 핵심 수치 + 하단 Lab 박스.

## Self-Validation
단어수 ≤400 ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 아이콘 3 ✓ · 복잡도 LOW ✓ · 메시지 1개(fMRI FM) ✓

## Review Status
READY
