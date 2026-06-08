'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// TODO_PI_REPLACE: Notion Form 생성 후 공개 링크로 교체.
// PI가 Notion에서 폼 생성 (질문 2개 + 메타 필드):
//   이름 / 학번 / 학과 / 학년 / 이메일 / (선택) GitHub URL /
//   메인 에세이 (long text) / 보조 에세이 (long text) /
//   LLM disclosure 라디오 (전혀 안 씀 · 표현 다듬기만 · 적극 사용) /
//   Fact-check 동의 체크박스
// Notion 우상단 "Share form" → "Share to web" 링크를 아래 상수에 붙여넣기.
const NOTION_FORM_URL = 'https://notion.so/TODO_REPLACE_BEFORE_DEPLOY';
const FORM_READY = !NOTION_FORM_URL.includes('TODO_REPLACE');

// 메인 에세이 — 자질 ① 꿈 (600–900자)
const ESSAY_MAIN_KR = `당신이 50세가 되었을 때, 본인의 연구가 세상의 어떤 구체적인 장면을 바꾸어 놓았기를 바라십니까? 그 장면 한 컷을 묘사하고, 그곳에 닿기 위해 앞으로 5년간 풀어야 할 가장 어려운 문제 하나와, 그 문제가 지금 풀리지 않는 이유 한 가지를 적어 주십시오.`;
const ESSAY_MAIN_EN = `When you turn 50, what specific scene in the world do you hope your research will have changed? Describe that single scene, name the one hardest problem you must solve in the next five years to reach it, and one reason that problem remains unsolved today.`;

// 보조 에세이 — 자질 ② 멈출 수 없는 호기심 (300–500자)
const ESSAY_SUB_KR = `지난 12개월 동안, 학점이나 누군가의 지시와 무관하게 스스로 가장 깊이 파고든 주제 하나를 적어 주십시오. 무엇이 처음 당신을 붙잡았는지, 그리고 어디까지 — 어떤 자료를 찾고, 무엇을 직접 해보고, 어떤 막다른 길을 만났는지 — 파고들었는지 구체적으로 보여 주십시오.`;
const ESSAY_SUB_EN = `Over the past 12 months, name one topic you pursued most deeply on your own — independent of grades or anyone's instruction. Show us what first caught you, and how far you went: what you sought out, what you tried yourself, and the dead ends you hit.`;

export function ApplicationFormSimple() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            The Essay Prompts
          </h2>
          <p className="text-base text-gray-500 korean mb-8">
            에세이 프롬프트 — 짧은 글 두 편
          </p>

          {/* 메인 — 자질 ① 꿈 */}
          <p className="text-sm font-semibold text-brain-primary mb-2">
            ① 꿈 / Dream
          </p>
          <blockquote className="border-l-4 border-brain-primary pl-4 py-2 mb-3">
            <p className="korean text-gray-800 leading-relaxed">{ESSAY_MAIN_KR}</p>
          </blockquote>
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-8">
            <p className="text-gray-600 leading-relaxed italic">{ESSAY_MAIN_EN}</p>
          </blockquote>

          {/* 보조 — 자질 ② 멈출 수 없는 호기심 */}
          <p className="text-sm font-semibold text-brain-primary mb-2">
            ② 멈출 수 없는 호기심 / Unfailing curiosity
          </p>
          <blockquote className="border-l-4 border-brain-primary pl-4 py-2 mb-3">
            <p className="korean text-gray-800 leading-relaxed">{ESSAY_SUB_KR}</p>
          </blockquote>
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-8">
            <p className="text-gray-600 leading-relaxed italic">{ESSAY_SUB_EN}</p>
          </blockquote>

          <div className="text-sm text-gray-600 space-y-2 mb-8">
            <p>
              <span className="font-semibold">분량:</span> 메인 600–900자 · 보조 300–500자 (한국어 기준, 영어는 상응하는 단어 수).
            </p>
            <p>
              <span className="font-semibold">제출 채널:</span> Notion 폼 1개. 추천서·GPA cutoff 없음 (CV·GPA는 참고자료로만).
            </p>
            <p>
              <span className="font-semibold">세 번째 자질(분야를 넘는 유연성)</span>은 서류가 아니라 30분 화상 면접의 즉석 도메인 합성 과제에서 확인합니다.
            </p>
            <p>
              <span className="font-semibold">LLM 사용:</span> 폼 안에서 disclosure (전혀 안 씀 / 표현 다듬기만 / 적극 사용). 어느 항목이든 합격 가능. 단 출처와 경험에 대한 거짓 진술 발견 시 합격 취소 + 합격 후 1년 동안 fact-check가 진행되며 거짓 발견 시 펠로우십 종료 + 미지급분 환수.
            </p>
          </div>

          {FORM_READY ? (
            <Link
              href={NOTION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-brain-primary text-white text-lg font-medium rounded-lg hover:bg-brain-primary/90 transition-colors shadow-md hover:shadow-lg"
            >
              <span>Open Application Form</span>
              <span className="ml-3 korean">지원서 열기</span>
              <ArrowRightIcon className="w-5 h-5 ml-3" />
            </Link>
          ) : (
            <div
              role="status"
              aria-disabled="true"
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-gray-100 text-gray-500 text-lg font-medium rounded-lg cursor-not-allowed border-2 border-dashed border-gray-300"
            >
              <span>Application Form Coming Soon</span>
              <span className="ml-3 korean">지원서 준비 중</span>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mt-4">
            {FORM_READY
              ? '응답은 Notion 폼에 저장됩니다. / Submissions are stored in Notion.'
              : '곧 활성화됩니다 / Form will be activated shortly.'}
          </p>
        </div>
      </div>
    </section>
  );
}
