import { Metadata } from 'next';
import { ApplicationFormSimple as ApplicationForm } from '@/components/forms/ApplicationFormSimple';

export const metadata: Metadata = {
  title: 'Apply | SNU Connectome Fellows 2026',
  description: '짧은 글 두 편으로 지원합니다. 메인 600–900자 + 보조 300–500자. CV·성적표는 참고용 제출(채점 무관). 2026년 6월 15일 마감.',
  openGraph: {
    title: 'Apply to SNU Connectome Fellows | 2026 Cohort',
    description: '짧은 글 두 편으로 지원합니다. 메인 + 보조 에세이. 6월 15일 마감.',
    images: ['/og-apply.png'],
  },
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-brand py-16 text-white">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Write two short essays. We read every one.
          </h1>
          <p className="text-2xl korean mb-4">
            짧은 글 두 편을 써 주십시오. 한 편도 빠짐없이 읽겠습니다.
          </p>
          <p className="text-xl text-brain-light max-w-3xl mx-auto leading-relaxed">
            A main essay (600–900 Korean characters) and a shorter one (300–500), English equivalent.
            No GPA cutoff. CV and transcript are collected for reference only, not scored.
            We are looking for one specific dream, one curiosity you cannot turn off,
            and a mind that connects at least two disciplines.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />
    </div>
  );
}