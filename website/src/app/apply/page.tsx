import { Metadata } from 'next';
import { ApplicationFormSimple as ApplicationForm } from '@/components/forms/ApplicationFormSimple';

export const metadata: Metadata = {
  title: 'Apply | SNU Connectome Fellows 2026',
  description: '짧은 글 한 편으로 지원합니다. 800–1200자 dream essay 한 편. CV·추천서·GPA cutoff 없음. 2026년 8월 31일 마감.',
  openGraph: {
    title: 'Apply to SNU Connectome Fellows | 2026 Cohort',
    description: '짧은 글 한 편으로 지원합니다. 800–1200자 dream essay. 8월 31일 마감.',
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
            Write one short essay. We read every one.
          </h1>
          <p className="text-2xl korean mb-4">
            짧은 글 한 편을 써 주십시오. 한 편도 빠짐없이 읽겠습니다.
          </p>
          <p className="text-xl text-brain-light max-w-3xl mx-auto leading-relaxed">
            800–1200 words (English) or 1500–2400 자 (Korean) on a single question.
            No CV, no recommendation letters, no GPA cutoff. We are looking for one
            specific dream, one curiosity you cannot turn off, and a mind that connects
            at least two disciplines.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />
    </div>
  );
}