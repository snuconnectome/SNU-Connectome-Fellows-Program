import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentors | SNU Connectome Fellows',
  description: 'Mentor profiles — content migration in progress.',
};

export default function MentorsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentors</h1>
        <p className="text-xl korean text-gray-700 mb-8">멘토진</p>
        <p className="text-gray-500 leading-relaxed mb-2 korean">
          정식 멘토 프로필 페이지는 준비 중입니다. 현재 활동 중인 협력 멘토(BNL·Princeton(Hasson Lab))와 lab 책임자(차지욱 교수) 명단은 홈페이지의 Mentor Network 섹션을 참조해 주십시오. MIT·Stanford는 lab alumni 네트워크입니다.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Mentor profile pages are in preparation. See the Program Lead and Mentors section on the homepage. Active partners: BNL and Princeton (Hasson Lab). Alumni network: MIT EECS, Stanford.
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
