'use client';

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// TODO_PI_REPLACE: Swap this URL once the Google Form is created.
// PI creates the form (30–60 min) with these fields:
//   이름/학번/학과/학년/이메일/휴대폰/(선택)GPA/Essay textarea (800–1200자)/
//   키워드 5개/(선택)GitHub URL/LLM disclosure 라디오/Fact-check 동의 체크박스
// Then replace the constant below with the published forms.gle short URL.
const GOOGLE_FORM_URL = 'https://forms.gle/TODO_REPLACE_BEFORE_DEPLOY';
const FORM_READY = !GOOGLE_FORM_URL.includes('TODO_REPLACE');

const ESSAY_PROMPT_KR = `당신이 50세가 되었을 때, 본인의 연구가 세상의 어떤 구체적인 장면을 바꾸어 놓았기를 바라십니까? 그 장면 한 컷을 묘사하고, 그 장면에 도달하기 위해 앞으로 5년간 본인이 해결해야 할 가장 어려운 한 가지 문제와, 그 문제가 현재 풀리지 않는 이유 한 가지를 적어 주십시오.`;

const ESSAY_PROMPT_EN = `When you turn 50, what specific scene in the world do you hope your research will have changed? Describe that single scene, name the one hardest problem you must solve in the next five years to get there, and one reason that problem is currently unsolved.`;

export function ApplicationFormSimple() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            The Essay Prompt
          </h2>
          <p className="text-base text-gray-500 korean mb-6">
            에세이 프롬프트
          </p>

          <blockquote className="border-l-4 border-brain-primary pl-4 py-2 mb-4">
            <p className="korean text-gray-800 leading-relaxed">{ESSAY_PROMPT_KR}</p>
          </blockquote>
          <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-8">
            <p className="text-gray-600 leading-relaxed italic">{ESSAY_PROMPT_EN}</p>
          </blockquote>

          <div className="text-sm text-gray-600 space-y-2 mb-8">
            <p>
              <span className="font-semibold">분량:</span> 영어 800–1200 단어 또는 한국어 1500–2400자.
            </p>
            <p>
              <span className="font-semibold">제출 채널:</span> Google Form 1개. CV·추천서·GPA cutoff 없음.
            </p>
            <p>
              <span className="font-semibold">LLM 사용:</span> 폼 안에서 disclosure (전혀 안 씀 / 표현 다듬기만 / 적극 사용). 어느 항목이든 합격 가능. 단 출처와 경험에 대한 거짓 진술 발견 시 합격 취소 + 합격 후 1년 동안 fact-check가 진행되며 거짓 발견 시 펠로우십 종료 + 미지급분 환수.
            </p>
          </div>

          {FORM_READY ? (
            <Link
              href={GOOGLE_FORM_URL}
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
              ? 'Submissions are stored by Google Forms.'
              : '곧 활성화됩니다 / Form will be activated shortly.'}
          </p>
        </div>
      </div>
    </section>
  );
}
