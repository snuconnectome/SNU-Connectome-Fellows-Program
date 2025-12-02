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
    title: 'Comprehensive Support',
    titleKorean: '포괄적 지원',
    description: '₩36.2M annual investment per fellow including monthly stipend, overseas conferences, research visits, AI resources, and personal NVIDIA DGX Spark.',
    descriptionKorean: '펠로우당 연간 3,620만원 투자: 월 장학금, 해외 학회, 연구 방문, AI 리소스, 개인용 NVIDIA DGX Spark 포함',
    highlights: ['₩12M Annual Stipend', 'AI Budget $225/month', 'NVIDIA DGX Spark'],
    color: 'from-green-400 to-blue-500',
  },
  {
    icon: GlobeAltIcon,
    title: 'World-Class Mentorship',
    titleKorean: '세계적 멘토링',
    description: 'Direct mentorship from leading researchers at Brookhaven National Lab, Princeton University, MIT, and Stanford.',
    descriptionKorean: 'Brookhaven National Lab, Princeton 대학, MIT, Stanford의 최고 연구진으로부터 직접 멘토링',
    highlights: ['BNL & Princeton Mentors', 'Monthly 1:1 Sessions', 'Research Lab Visits'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: BeakerIcon,
    title: 'Foundation Model Research',
    titleKorean: 'Foundation Model 연구',
    description: 'Work on cutting-edge neuroscience foundation models including BrainLM, Brain-JEPA, and multimodal brain representation learning.',
    descriptionKorean: 'BrainLM, Brain-JEPA, 멀티모달 뇌 표상 학습 등 최첨단 신경과학 Foundation Model 연구',
    highlights: ['BrainLM (ICLR 2024)', 'Brain-JEPA (NeurIPS 2024)', 'Multimodal Learning'],
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: UserGroupIcon,
    title: 'Elite Community',
    titleKorean: '엘리트 커뮤니티',
    description: 'Join an exclusive network of top 0.001% global talent dedicated to advancing neuroscience through AI.',
    descriptionKorean: 'AI를 통한 신경과학 발전에 헌신하는 전 세계 상위 0.001% 인재들의 독점적 네트워크',
    highlights: ['Top 0.001% Talent', 'Alumni Network', 'Global Connections'],
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: ChartBarIcon,
    title: 'Career Development',
    titleKorean: '커리어 개발',
    description: 'Structured pathway to top-tier graduate programs and research positions with guaranteed international exposure.',
    descriptionKorean: '최고 수준의 대학원 프로그램과 연구직으로의 체계적 경로, 보장된 국제적 노출',
    highlights: ['PhD Placement Support', 'Research Publications', 'Conference Presentations'],
    color: 'from-teal-400 to-green-500',
  },
  {
    icon: AcademicCapIcon,
    title: 'Academic Excellence',
    titleKorean: '학술적 우수성',
    description: 'Rigorous curriculum combining theoretical foundations with hands-on research experience in state-of-the-art facilities.',
    descriptionKorean: '최첨단 시설에서 이론적 기초와 실습 연구 경험을 결합한 엄격한 커리큘럼',
    highlights: ['Weekly Lab Meetings', 'Quarterly Evaluations', 'Publication Goals'],
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
            <span className="gradient-text">Program Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed korean">
            최고 수준의 지원과 세계적 멘토링을 통해
            <br />
            차세대 신경과학 리더를 양성합니다
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
              Ready to Shape the Future of Neuroscience?
            </h3>
            <p className="text-xl mb-2 korean">
              신경과학의 미래를 만들어갈 준비가 되셨나요?
            </p>
            <p className="text-brain-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Join an elite community of researchers working on Foundation Models
              that will revolutionize our understanding of the human brain.
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