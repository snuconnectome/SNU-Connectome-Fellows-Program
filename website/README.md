# SNU Connectome Fellows Program Website

> Modern, accessible website for the SNU Connectome Fellows Program - Training the next generation of neuroscience leaders through Foundation Model research.

## 🏗️ Architecture Overview

### Technology Stack
- **Frontend Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: React Query + Zustand
- **Form Handling**: React Hook Form + Zod Validation
- **Animations**: Framer Motion
- **UI Components**: Headless UI + Heroicons
- **Deployment**: Vercel (Frontend) + Railway (Database)

### Design System
- **Brand Colors**: SNU Blue (#003876), Connectome Gradient (#667eea → #764ba2)
- **Typography**: Inter (Latin) + Noto Sans KR (Korean) + Outfit (Display)
- **Components**: Custom component library with consistent spacing and accessibility
- **Responsive**: Mobile-first design with Tailwind breakpoints

## 🎨 Features Implemented

### ✅ Core Website Features
- [x] **Responsive Landing Page** with Hero, Stats, and CTA sections
- [x] **Navigation System** with bilingual support (English/Korean)
- [x] **Program Overview** with detailed feature highlights
- [x] **Research Highlights** showcasing BrainLM, Brain-JEPA, etc.
- [x] **Mentor Network** display with international partners
- [x] **News Section** for program updates
- [x] **Comprehensive Footer** with all relevant links

### ✅ Application System
- [x] **Multi-step Application Form** with validation
- [x] **Application Guide** with requirements and process
- [x] **Form Validation** using React Hook Form + TypeScript
- [x] **Progressive Disclosure** with step-by-step navigation
- [x] **Bilingual Interface** for Korean and English users

### ✅ Performance & Accessibility
- [x] **SEO Optimized** with proper meta tags and Open Graph
- [x] **Performance Optimized** with Next.js App Router
- [x] **Accessible Design** with ARIA labels and semantic HTML
- [x] **Mobile Responsive** with Tailwind CSS
- [x] **Type Safe** with comprehensive TypeScript definitions

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   └── apply/              # Application pages
│   ├── components/             # Reusable components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Layout components (Header, Footer)
│   │   ├── providers.tsx       # App providers (React Query, etc.)
│   │   └── sections/           # Page sections (Hero, Stats, etc.)
│   ├── types/                  # TypeScript type definitions
│   ├── lib/                    # Utility functions
│   ├── hooks/                  # Custom React hooks
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd website
npm install
```

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run type-check   # Run TypeScript type checking
```

## 🎯 Key Components

### Homepage Sections
1. **Hero Section** (`/components/sections/Hero.tsx`)
   - Animated hero with program highlights
   - Key statistics and investment details
   - Call-to-action buttons

2. **Program Overview** (`/components/sections/ProgramOverview.tsx`)
   - Six key program features with icons
   - Comprehensive support breakdown
   - Interactive hover effects

3. **Program Stats** (`/components/sections/ProgramStats.tsx`)
   - Six key metrics with visualizations
   - Investment breakdown and ROI information

4. **Research Highlights** (`/components/sections/ResearchHighlights.tsx`)
   - Featured research areas (BrainLM, Brain-JEPA, etc.)
   - Publication links and technical details

### Application System
1. **Application Guide** (`/components/sections/ApplicationGuide.tsx`)
   - Step-by-step application process
   - Requirements and deadlines
   - Important dates and timeline

2. **Application Form** (`/components/forms/ApplicationForm.tsx`)
   - Multi-step form with validation
   - Dynamic field arrays for skills and references
   - Progress tracking and section navigation

### Layout Components
1. **Header** (`/components/layout/Header.tsx`)
   - Responsive navigation with dropdown menus
   - Bilingual support (English/Korean)
   - Mobile-friendly hamburger menu

2. **Footer** (`/components/layout/Footer.tsx`)
   - Comprehensive sitemap
   - Contact information and social links
   - Copyright and legal information

## 🌐 Internationalization

The website supports both English and Korean:
- **Bilingual Headers**: All navigation items have English and Korean labels
- **Content Sections**: Major content blocks include Korean translations
- **Form Labels**: All form fields have bilingual labels
- **Typography**: Proper Korean typography with `Noto Sans KR` font

## 🎨 Design Tokens

### Colors
```css
/* Brand Colors */
--snu-blue: #003876
--snu-navy: #1E3A5F
--brain-primary: #667eea
--brain-secondary: #764ba2
--brain-accent: #f093fb

/* Status Colors */
--status-active: #48BB78
--status-pending: #ED8936
--status-completed: #38B2AC
```

### Typography
```css
/* Font Families */
font-sans: Inter, Noto Sans KR, sans-serif
font-display: Outfit, Inter, sans-serif
font-mono: JetBrains Mono, monospace
```

## 🔗 Integration Points

### Backend Integration
- **API Routes**: Configured to proxy Python FastAPI backend
- **Type Definitions**: Matching TypeScript types for Python models
- **Form Submission**: Ready for backend API integration

### External Services
- **Authentication**: NextAuth.js setup ready
- **Analytics**: Google Analytics integration points
- **Email**: Ready for email service integration

## 🧪 Testing Strategy

### Test Structure
```
tests/
├── __tests__/              # Unit tests
├── e2e/                    # End-to-end tests
├── components/             # Component tests
└── utils/                  # Utility function tests
```

### Testing Tools
- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright
- **Type Testing**: TypeScript compiler
- **Accessibility**: Built-in ARIA support

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Build and deploy to Vercel
vercel --prod
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=https://connectome.snu.ac.kr
NEXTAUTH_SECRET=your-secret-key
```

## 📈 Performance Features

- **Next.js App Router**: Latest Next.js features for optimal performance
- **Image Optimization**: Built-in Next.js image optimization
- **Bundle Splitting**: Automatic code splitting and lazy loading
- **Caching**: React Query for efficient data caching
- **SEO**: Comprehensive meta tags and structured data

## 🎯 Next Steps

### Immediate Priorities
1. **Backend Integration**: Connect application forms to Python FastAPI
2. **Authentication**: Implement user authentication and role-based access
3. **Admin Dashboard**: Build administrative interface for program management
4. **Testing**: Implement comprehensive test suite

### Future Enhancements
1. **CMS Integration**: Add content management for news and updates
2. **Mentor Portal**: Dedicated interface for mentor interactions
3. **Research Tracking**: Fellow research progress tracking system
4. **Analytics Dashboard**: Program metrics and analytics

## 🤝 Contributing

This website is part of the SNU Connectome Fellows Program infrastructure. For development:

1. Follow the TypeScript and ESLint configurations
2. Maintain bilingual support for all user-facing content
3. Ensure accessibility compliance with WCAG 2.1 AA
4. Test across different devices and browsers

## 📄 License

© 2025 Seoul National University Connectome Lab. All rights reserved.

---

*Built with Next.js, TypeScript, and Tailwind CSS for the SNU Connectome Fellows Program.*