import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | SNU Connectome Lab',
  description: 'Research overview — content migration in progress.',
};

export default function ResearchPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-24">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Research</h1>
        <p className="text-xl korean text-gray-700 mb-8">연구 소개</p>
        <p className="text-gray-500 leading-relaxed mb-2 korean">
          이 페이지는 이전 작업 중입니다.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Content is being migrated from the previous site. It will be updated after the 2026 Fellows recruitment closes.
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
