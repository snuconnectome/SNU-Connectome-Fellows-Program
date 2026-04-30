import { Metadata } from 'next';
import { ApplicationFormSimple as ApplicationForm } from '@/components/forms/ApplicationFormSimple';

export const metadata: Metadata = {
  title: 'Apply | SNU Connectome Fellows Program',
  description: '서울대학교 커넥톰 펠로우십 프로그램에 지원하세요. 차세대 신경과학 인재 양성을 위한 특별한 기회입니다.',
  openGraph: {
    title: 'Apply to SNU Connectome Fellows Program',
    description: '차세대 신경과학 인재 양성을 위한 서울대학교 커넥톰 펠로우십 프로그램 지원',
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
            800–1200 words on a single question. No CV, no recommendation letters,
            no GPA cutoff. We are looking for one specific dream, one curiosity that
            won&apos;t switch off, and a mind that holds at least two fields at once.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationForm />
    </div>
  );
}