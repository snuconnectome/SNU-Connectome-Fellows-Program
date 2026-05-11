import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ProgramOverview } from '@/components/sections/ProgramOverview';
import { ResearchHighlights } from '@/components/sections/ResearchHighlights';
import { MentorNetwork } from '@/components/sections/MentorNetwork';
import { ProgramStats } from '@/components/sections/ProgramStats';
// TestimonialsSection intentionally hidden until first cohort graduates (2027+).
// Empty placeholder weakens credibility more than no section at all.
import { NewsSection } from '@/components/sections/NewsSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'SNU Connectome Fellows | 2026 Cohort 모집 (8월 31일 마감)',
  description: '꿈은 구체적으로, 호기심은 끄지 않게, 분야는 두 개 이상. 서울대 Connectome Lab의 학부생 펠로우십 — 2026 cohort 모집 중. 이력서가 아니라 본인의 질문 한 가지를 봅니다.',
  openGraph: {
    title: 'SNU Connectome Fellows | 2026 Cohort',
    description: '꿈은 구체적으로, 호기심은 끄지 않게, 분야는 두 개 이상. 학부생 펠로우십 — 8월 31일 마감.',
    images: ['/og-home.png'],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Program Overview */}
      <ProgramOverview />

      {/* Program Statistics */}
      <ProgramStats />

      {/* Research Highlights */}
      <ResearchHighlights />

      {/* Mentor Network */}
      <MentorNetwork />

      {/* Testimonials intentionally hidden — first cohort starts 2026, testimonials from 2027 onwards */}

      {/* Latest News */}
      <NewsSection />

      {/* Call to Action */}
      <CTASection />
    </>
  );
}