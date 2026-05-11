import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentorship | SNU Connectome Fellows',
  description: 'Fellow–mentor relationship overview.',
};

export default function MentorshipPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentorship</h1>
        <p className="text-xl korean text-gray-700 mb-8">멘토십</p>
        <p className="text-gray-500 leading-relaxed mb-2 korean">
          합격한 펠로우는 PI(차지욱 교수)와 주 1회 1:1 미팅, 현재 활동 중인 해외 멘토(BNL·Princeton Hasson Lab)와 분기별 화상 미팅을 갖습니다. 추가 멘토 협력은 확정 시 별도 공지합니다. 자세한 안내는 합격 통보 시 함께 전달됩니다.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Accepted fellows receive weekly 1:1 with the PI (Prof. Jiook Cha) plus quarterly video meetings with active overseas mentors (BNL, Princeton Hasson Lab). Additional mentor collaborations announced when confirmed.
        </p>
        <Link
          href="/apply"
          className="inline-block px-6 py-3 bg-brain-primary text-white rounded-lg hover:bg-brain-primary/90 transition-colors"
        >
          Apply to the 2026 Cohort →
        </Link>
      </div>
    </main>
  );
}
