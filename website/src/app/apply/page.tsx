import { Metadata } from 'next';
import { ApplicationFormSimple as ApplicationForm } from '@/components/forms/ApplicationFormSimple';
import { ApplicationGuide } from '@/components/sections/ApplicationGuide';

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
            Begin Your Journey
          </h1>
          <p className="text-2xl korean mb-4">
            여정을 시작하세요
          </p>
          <p className="text-xl text-brain-light max-w-3xl mx-auto leading-relaxed">
            Join an elite community of researchers working on Foundation Models
            that will revolutionize our understanding of the human brain.
          </p>
        </div>
      </section>

      {/* Application Guide */}
      <ApplicationGuide />

      {/* Application Form */}
      <ApplicationForm />
    </div>
  );
}