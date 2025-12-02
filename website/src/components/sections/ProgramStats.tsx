'use client';

import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  BookOpenIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    icon: CurrencyDollarIcon,
    label: 'Annual Investment',
    labelKorean: '연간 투자',
    value: '₩36.2M',
    subtitle: 'per fellow',
    subtitleKorean: '펠로우당',
    description: 'Comprehensive support including stipend, equipment, and international opportunities',
    descriptionKorean: '장학금, 장비, 국제 기회를 포함한 포괄적 지원',
    color: 'from-green-400 to-blue-500',
  },
  {
    icon: UserGroupIcon,
    label: 'Elite Selection',
    labelKorean: '엘리트 선발',
    value: '0.001%',
    subtitle: 'global talent',
    subtitleKorean: '글로벌 인재',
    description: 'Targeting the top 0.001% of global talent for humanity\'s contribution',
    descriptionKorean: '인류 공헌을 위한 전 세계 상위 0.001% 인재 대상',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: GlobeAltIcon,
    label: 'International Network',
    labelKorean: '국제 네트워크',
    value: '4+',
    subtitle: 'top institutions',
    subtitleKorean: '최고 기관',
    description: 'Princeton, MIT, Stanford, Brookhaven National Laboratory partnerships',
    descriptionKorean: 'Princeton, MIT, Stanford, Brookhaven National Laboratory 파트너십',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: BeakerIcon,
    label: 'Research Focus',
    labelKorean: '연구 집중도',
    value: '100%',
    subtitle: 'Foundation Models',
    subtitleKorean: 'Foundation Model',
    description: 'Dedicated focus on neuroscience foundation models and brain-AI alignment',
    descriptionKorean: '신경과학 Foundation Model 및 뇌-AI 정렬 연구 전념',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: AcademicCapIcon,
    label: 'Publication Goal',
    labelKorean: '논문 목표',
    value: '2-3',
    subtitle: 'papers/fellow',
    subtitleKorean: '편/펠로우',
    description: 'Target 2-3 high-impact publications per fellow during the program',
    descriptionKorean: '프로그램 기간 중 펠로우당 고임팩트 논문 2-3편 목표',
    color: 'from-red-400 to-pink-500',
  },
  {
    icon: BookOpenIcon,
    label: 'Success Rate',
    labelKorean: '성공률',
    value: '90%+',
    subtitle: 'PhD placement',
    subtitleKorean: '박사과정 진학',
    description: 'Expected 90%+ placement rate in top-tier international PhD programs',
    descriptionKorean: '최고 수준 국제 박사과정 90% 이상 진학률 기대',
    color: 'from-teal-400 to-green-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function ProgramStats() {
  return (
    <section className="section-padding bg-gray-50">
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
            Program by the <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed korean">
            숫자로 보는 프로그램의 탁월함
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative overflow-hidden"
            >
              <div className="card h-full p-8 text-center group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8" />
                  </div>

                  {/* Value */}
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900 mb-1 group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>{stat.subtitle}</span>
                      <span className="ml-1 korean">{stat.subtitleKorean}</span>
                    </div>
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 mb-4 korean">
                    {stat.labelKorean}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {stat.description}
                  </p>
                  <p className="text-xs text-gray-500 korean leading-relaxed">
                    {stat.descriptionKorean}
                  </p>
                </div>

                {/* Decorative element */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-r ${stat.color} opacity-5 rounded-full group-hover:opacity-10 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-2">
            These numbers represent our commitment to excellence
          </p>
          <p className="text-sm text-gray-500 korean mb-6">
            이 수치들은 우수성에 대한 우리의 약속을 나타냅니다
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>Version 1.0</span>
            <span>•</span>
            <span>Updated December 2025</span>
            <span>•</span>
            <span className="korean">2025년 12월 업데이트</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}