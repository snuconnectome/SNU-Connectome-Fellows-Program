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
- **Investment**: ~₩36.2M per fellow Year 1 (₩12M monthly stipend + ₩10M overseas budget + ₩7.2M AI tools + ₩1M books + ₩6M one-time NVIDIA DGX Spark).
- **Cohort Cap**: 3 fellows/year (set by PI weekly 1:1 capacity).
- **Active Mentors**: BNL (Shinjae Yoo, David Keetae Park) + Princeton Hasson Lab. Alumni network: MIT EECS, Stanford.
- **Key Research Areas**: Brain Foundation Models, Generative Brain Models, LLM-Brain Alignment.

## Command Shortcuts
- `npm run dev`: Start local development server.
- `npm install`: Install dependencies.
