'use client';

import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  UserIcon,
  AcademicCapIcon,
  BeakerIcon,
  PresentationChartLineIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    icon: UserIcon,
    title: 'Personal Information',
    titleKorean: '개인정보',
    description: 'Basic information, contact details, and academic background',
    descriptionKorean: '기본 정보, 연락처 세부사항 및 학업 배경',
    items: [
      'Personal details (Name, Student ID, Department)',
      'Contact information (Email, Phone)',
      'Academic record (GPA, relevant courses)',
    ],
    itemsKorean: [
      '개인 세부사항 (이름, 학번, 학과)',
      '연락처 정보 (이메일, 전화)',
      '학업 기록 (학점, 관련 과목)',
    ],
  },
  {
    icon: AcademicCapIcon,
    title: 'Skills & Experience',
    titleKorean: '기술 및 경험',
    description: 'Programming skills, research experience, and technical competencies',
    descriptionKorean: '프로그래밍 기술, 연구 경험 및 기술 역량',
    items: [
      'Programming languages (Python required)',
      'Machine learning experience',
      'Neuroscience tools and frameworks',
    ],
    itemsKorean: [
      '프로그래밍 언어 (Python 필수)',
      '머신러닝 경험',
      '신경과학 도구 및 프레임워크',
    ],
  },
  {
    icon: BeakerIcon,
    title: 'Research Interests',
    titleKorean: '연구 관심사',
    description: 'Research areas, previous work, and publication history',
    descriptionKorean: '연구 분야, 이전 작업 및 논문 발표 이력',
    items: [
      'Research interest areas with priorities',
      'Previous research experience',
      'Publications and presentations',
    ],
    itemsKorean: [
      '우선순위가 있는 연구 관심 분야',
      '이전 연구 경험',
      '논문 발표 및 프레젠테이션',
    ],
  },
  {
    icon: DocumentTextIcon,
    title: 'Essays & Vision',
    titleKorean: '에세이 및 비전',
    description: 'Motivation statement, research proposal, and long-term vision',
    descriptionKorean: '동기 설명서, 연구 제안서 및 장기 비전',
    items: [
      'Motivation statement (500-3000 characters)',
      'Research proposal (800-5000 characters)',
      'Long-term vision (300-2000 characters)',
    ],
    itemsKorean: [
      '동기 설명서 (500-3000자)',
      '연구 제안서 (800-5000자)',
      '장기 비전 (300-2000자)',
    ],
  },
  {
    icon: PresentationChartLineIcon,
    title: 'References & Portfolio',
    titleKorean: '추천인 및 포트폴리오',
    description: 'Academic references, GitHub portfolio, and supporting materials',
    descriptionKorean: '학업 추천인, GitHub 포트폴리오 및 지원 자료',
    items: [
      'Academic references (2-3 required)',
      'GitHub profile and repositories',
      'Portfolio website (optional)',
    ],
    itemsKorean: [
      '학업 추천인 (2-3명 필수)',
      'GitHub 프로필 및 저장소',
      '포트폴리오 웹사이트 (선택)',
    ],
  },
];

const requirements = [
  {
    title: 'Academic Requirements',
    titleKorean: '학업 요구사항',
    items: [
      'Currently enrolled undergraduate student at SNU',
      'GPA 4.0+ (4.5 scale) recommended',
      'Strong background in mathematics/statistics',
    ],
    itemsKorean: [
      '현재 서울대학교 재학 중인 학부생',
      'GPA 4.0+ (4.5 만점 기준) 권장',
      '수학/통계학에 대한 탄탄한 배경',
    ],
  },
  {
    title: 'Technical Requirements',
    titleKorean: '기술 요구사항',
    items: [
      'Proficiency in Python programming',
      'Basic knowledge of machine learning',
      'English proficiency for international collaboration',
    ],
    itemsKorean: [
      'Python 프로그래밍 숙련도',
      '머신러닝 기초 지식',
      '국제 협력을 위한 영어 능력',
    ],
  },
  {
    title: 'Personal Qualities',
    titleKorean: '개인 자질',
    items: [
      'Passion for neuroscience and AI research',
      'Commitment to humanity\'s long-term contribution',
      'Strong motivation and initiative',
    ],
    itemsKorean: [
      '신경과학 및 AI 연구에 대한 열정',
      '인류의 장기적 공헌에 대한 헌신',
      '강한 동기와 주도성',
    ],
  },
];

export function ApplicationGuide() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Application <span className="gradient-text">Guide</span>
          </h2>
          <p className="text-xl text-gray-600 korean max-w-3xl mx-auto">
            지원 가이드
          </p>
        </motion.div>

        {/* Application Steps */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Application Process <span className="korean text-lg">지원 절차</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-brain-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brain-primary/10 rounded-xl mb-4">
                    <step.icon className="w-6 h-6 text-brain-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm font-medium text-gray-500 korean mb-3">
                    {step.titleKorean}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                  <p className="text-gray-500 text-xs korean mt-1">
                    {step.descriptionKorean}
                  </p>
                </div>

                <div className="space-y-2">
                  {step.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                      <p className="text-xs korean text-gray-500 ml-6">
                        {step.itemsKorean[idx]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Requirements <span className="korean text-lg">요구사항</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={req.title} className="card">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {req.title}
                </h4>
                <p className="text-sm font-medium text-gray-500 korean mb-4">
                  {req.titleKorean}
                </p>
                <div className="space-y-3">
                  {req.items.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-start space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-brain-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                      <p className="text-xs korean text-gray-500 ml-6">
                        {req.itemsKorean[idx]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Dates */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-brand rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Important Dates</h3>
            <p className="text-lg korean mb-6">중요한 날짜</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Application Period</h4>
                <p className="text-brain-light">January 1 - March 31, 2025</p>
                <p className="text-sm korean text-brain-light/80 mt-1">
                  지원 기간: 2025년 1월 1일 - 3월 31일
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Interview Period</h4>
                <p className="text-brain-light">April 1 - April 15, 2025</p>
                <p className="text-sm korean text-brain-light/80 mt-1">
                  면접 기간: 2025년 4월 1일 - 4월 15일
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Program Starts</h4>
                <p className="text-brain-light">March 1, 2025</p>
                <p className="text-sm korean text-brain-light/80 mt-1">
                  프로그램 시작: 2025년 3월 1일
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}