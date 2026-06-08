'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  BeakerIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: CurrencyDollarIcon,
    title: 'Everything You Need to Focus on Research',
    titleKorean: '연구에 몰입할 수 있는 모든 환경',
    description: 'A research stipend so you can focus without financial worry, near-unlimited AI agent tokens, your own NVIDIA DGX Spark plus Lab GPU cluster, and a budget for international conferences and mentor lab visits.',
    descriptionKorean: '생활 걱정 없이 연구에 집중할 수 있는 연구장려금, 사실상 제약 없는 AI 에이전트 토큰, 본인 전용 NVIDIA DGX Spark와 Lab GPU 클러스터, 그리고 해외 학회·멘토 연구실 방문 예산.',
    highlights: ['연구 몰입 stipend', 'AI 에이전트 토큰', 'DGX Spark + GPU 클러스터'],
    color: 'from-green-400 to-blue-500',
  },
  {
    icon: GlobeAltIcon,
    title: 'Overseas Collaborative Mentorship',
    titleKorean: '해외 협력 멘토링',
    description: 'Active mentorship from researchers at Brookhaven National Laboratory (BNL) and Princeton University (Hasson Lab). Lab alumni network spans MIT EECS and Stanford.',
    descriptionKorean: 'Brookhaven National Laboratory(BNL)와 Princeton(Hasson Lab) 연구자와 정기 멘토링. Lab alumni 네트워크는 MIT EECS·Stanford로 연결됩니다.',
    highlights: ['BNL & Princeton (active)', 'Monthly 1:1 Sessions', 'MIT/Stanford alumni network'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: BeakerIcon,
    title: 'Foundation Model Research',
    titleKorean: '기초 모델 연구',
    description: 'Research and build on neuroscience foundation models: BrainLM (Yale, ICLR 2024), Brain-JEPA (NUS, NeurIPS 2024 Spotlight), Brain Harmony (NeurIPS 2025), and the lab\'s own SwiFT (Cha et al., NeurIPS 2023).',
    descriptionKorean: '신경과학 기초 모델 연구·확장: BrainLM (Yale, ICLR 2024), Brain-JEPA (NUS, NeurIPS 2024 Spotlight), Brain Harmony (NeurIPS 2025), 본 lab의 SwiFT (Cha et al., NeurIPS 2023).',
    highlights: ['Lab\'s own SwiFT (NeurIPS 2023)', 'Brain-JEPA Spotlight', 'fMRI Foundation Models'],
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: UserGroupIcon,
    title: 'Direct PI Mentorship',
    titleKorean: 'PI 직접 지도',
    description: 'Weekly 1:1 sessions with the PI (Prof. Jiook Cha / 차지욱 교수). Cohort capped at 3 fellows per year — PI weekly capacity enforces the small size; no postdoc layer between fellow and PI.',
    descriptionKorean: 'PI(차지욱 교수)와 주 1회 1:1 미팅. 연 3명 cohort 제한 — PI의 주간 가용 시간이 cohort 규모를 제약하며, 펠로우와 PI 사이에 박사후 단계가 없습니다.',
    highlights: ['Weekly 1:1 with PI', 'Cohort: 3 fellows/year', 'No Postdoc Layer'],
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: ChartBarIcon,
    title: 'Career Development',
    titleKorean: '졸업 후 진로 안내',
    description: 'Funded ₩10M annual budget per fellow for overseas conferences and lab visits. Structured guidance for graduate-school applications and research-track placement.',
    descriptionKorean: '펠로우 1인당 연 ₩10M 해외 학회·연구 방문 예산 (확보 분야). 대학원 진학 및 연구 진로 안내.',
    highlights: ['₩10M Overseas Budget', 'PhD Application Support', 'Conference Presentations'],
    color: 'from-teal-400 to-green-500',
  },
  {
    icon: AcademicCapIcon,
    title: 'Curriculum and Research Training',
    titleKorean: '교육 과정 및 연구 훈련',
    description: 'Structured seminars on Foundation Models, fMRI methods, Bayesian statistics, and paper writing. Hands-on research with NVIDIA DGX Spark workstation per fellow plus shared SNU HPC cluster access.',
    descriptionKorean: '기초 모델·fMRI 방법론·베이지안 통계·논문 작성 세미나. NVIDIA DGX Spark 1인 1대 + SNU HPC 클러스터 활용 연구 훈련.',
    highlights: ['Weekly Lab Meetings', 'Quarterly Evaluations', 'Co-authorship Opportunities'],
    color: 'from-red-400 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function ProgramOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Program Overview</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed korean">
            본 프로그램의 지원 항목과 운영 구조를 안내합니다.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

              <div className="relative card h-full p-8 group-hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4 korean">
                  {feature.titleKorean}
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <p className="text-sm text-gray-500 korean leading-relaxed mb-6">
                  {feature.descriptionKorean}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} mr-3 flex-shrink-0`} />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Who We Look For */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 px-4"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Who we look for
          </h3>
          <p className="text-lg korean text-gray-500 mb-8 text-center">
            어떤 학부생을 찾습니까
          </p>

          <ul className="korean text-gray-700 leading-relaxed space-y-3 mb-8 list-none">
            <li className="flex items-start">
              <span className="text-brain-primary mr-3 mt-1">·</span>
              <span>50세 본인의 모습을 한 장면으로 묘사할 수 있는 사람</span>
            </li>
            <li className="flex items-start">
              <span className="text-brain-primary mr-3 mt-1">·</span>
              <span>지난 12개월 동안 학점이 걸리지 않은 한 가지 주제에 깊이 들어가 본 사람</span>
            </li>
            <li className="flex items-start">
              <span className="text-brain-primary mr-3 mt-1">·</span>
              <span>본인의 전공으로 설명되지 않는 개념 두 개를 연결할 수 있는 사람</span>
            </li>
          </ul>

          <p className="korean text-gray-600 text-base leading-relaxed border-l-4 border-gray-200 pl-4 italic">
            본인의 꿈을 한 문장으로 말하기 어려우시다면 — 한 학기 더 생각하신 후 2027 cohort에 지원하시는 것도 좋은 선택입니다.
            지원의 부담이 본인을 막지 않도록, 본인의 결이 가장 분명한 때 지원하시면 됩니다.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-brand rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Read the prompts. Write two essays.
            </h3>
            <p className="text-xl mb-2 korean">
              프롬프트를 읽고, 두 편의 글을 써 주십시오.
            </p>
            <p className="text-brain-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Two short essays — your dream and your curiosity. No CV, no recommendation letters,
              no GPA cutoff. We read every submission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-brain-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brain-primary transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Start Your Application</span>
                <span className="ml-2 korean">지원 시작하기</span>
              </Link>
              <Link
                href="/program/overview"
                className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brain-primary transition-all duration-200"
              >
                <span>Program Details</span>
                <span className="ml-2 korean">프로그램 상세</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}