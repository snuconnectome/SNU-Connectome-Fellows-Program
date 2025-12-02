import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ProgramOverview } from '@/components/sections/ProgramOverview';
import { ResearchHighlights } from '@/components/sections/ResearchHighlights';
import { MentorNetwork } from '@/components/sections/MentorNetwork';
import { ProgramStats } from '@/components/sections/ProgramStats';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { NewsSection } from '@/components/sections/NewsSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'SNU Connectome Fellows Program | 차세대 신경과학 인재 양성',
  description: '인류의 천년 공헌을 위한 차세대 신경과학 인재 양성 프로그램. 연간 3,620만원 투자로 차세대 신경과학 연구자를 육성합니다.',
  openGraph: {
    title: 'SNU Connectome Fellows Program',
    description: '차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램',
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

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Latest News */}
      <NewsSection />

      {/* Call to Action */}
      <CTASection />
    </>
  );
}