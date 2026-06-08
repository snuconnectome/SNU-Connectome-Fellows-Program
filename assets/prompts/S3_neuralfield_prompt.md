# S3 Prompt — 트랙 ③ Continuous Neural Field Modeling

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
- Layout-method names → NEVER render as visible text

## MASTER THEME (snu_neurox)
background #FFFFFF · primary #003380 (headings) · accent #E69F00 (hero metric only) · secondary #0072B2 (diagram) · text #282945 · box_fill #EDF6FC
typography: title 32pt Bold, subtitle 22pt, body 18pt, hero 32pt Bold #E69F00, caption 12pt #5A5A6E
card: rounded rectangle, thin outline, soft fill, no heavy shadow · icon: flat line/silhouette only

## Prompt for nanobanana2
16:9 한국어 학술 인포그래픽, 흰 배경, 깔끔하고 여백 있는 발표 스타일. S1·S2와 동일한 수직 카드 레이아웃.

상단 제목 (32pt Bold #003380): "③ 연속 신경장 모델"
부제 (22pt #0072B2): "격자를 넘어, 좌표에서 뇌 활동으로"

좌측 60% — 번호 카드 3개를 위에서 아래로 배치 (수직 스택, S1·S2와 동일한 스타일). 카드 사이 화살표 없이 단순 나열:
- 카드 1 (#EDF6FC 채움, #003380 얇은 테두리): 돋보기 아이콘(flat line). 제목 "다중 스케일" (18pt Bold #003380). 본문 "뉴런부터 복셀까지" (16pt #282945)
- 카드 2: 작은 동물(쥐) 아이콘. 제목 "다중 종" (18pt Bold). 본문 "마우스부터 인간까지" (16pt)
- 카드 3: 겹친 레이어 아이콘. 제목 "다중 양식" (18pt Bold). 본문 "fMRI · EEG · 전기생리" (16pt)

우측 40% 상단 — 큰 핵심 문구 (28pt Bold #E69F00): "하나의 연속 함수로 통합" / 캡션 (12pt #5A5A6E): "Lab의 다음 프런티어"

우측 40% 하단 — #EDF6FC 박스: 작은 제목 "핵심 연구" (18pt Bold #003380), 본문 "OmniField (ICLR 2026) · Mamba-GINR · STACI" (16pt #282945)

하단 우측 모서리 (12pt #5A5A6E): "SNU Connectome Fellows"

중요: 위에 명시된 한글 텍스트만 렌더. 다이어그램 종류·배치 방식을 가리키는 영어 단어를 이미지 안에 절대 쓰지 말 것.

## Style Rules
한글 짧은 명사구, 시각 블록당 최대 2줄. 핵심 문구 1개만 강조. 카드는 수직 스택만 (원·중심 노드·방사형 배치 금지, 순환 금지). 레이아웃 방식 이름을 이미지에 쓰지 말 것.

## Negative
no dark background, no 3D, no glossy, no poster style, no tiny captions, no mixed styles, no circular diagrams, no hub-and-spoke layout, no radial layout, no center node, no photorealistic icons, no gradients on text, no English structural labels, no invented internal labels, no diagram-method words rendered as text

## Fallback Layout
좌측 60% 수직 카드 3개(다중 스케일/종/양식), 우측 40% 상단 핵심 문구 + 하단 핵심 연구 박스. S1·S2와 동일 구조.

## Self-Validation
단어수 ≤400 ✓ · 색상 5 (white/navy/orange/teal/ice) ✓ · 아이콘 3 ✓ · 복잡도 LOW (수직 카드) ✓ · 메시지 1개(Neural Field) ✓ · 영어 레이아웃 용어 제거(구조 변경) ✓

## Review Status
READY
