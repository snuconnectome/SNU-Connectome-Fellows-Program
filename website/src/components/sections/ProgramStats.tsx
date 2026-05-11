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
    label: 'PI Direct Time',
    labelKorean: 'PI 직접 시간',
    value: '1:1',
    subtitle: 'mentoring',
    subtitleKorean: '맞춤 지도',
    description: 'Weekly 1:1 with the PI. No postdoc layer. Intentionally small cohort so each fellow gets deep individual investment.',
    descriptionKorean: 'PI와 주 1회 1:1 미팅. 사이에 박사후 layer가 없고, cohort가 작아 한 명 당 깊이 있는 투자가 가능합니다.',
    color: 'from-purple-400 to-pink-500',
  },
  {
    icon: GlobeAltIcon,
    label: 'Active Partner Institutions',
    labelKorean: '현재 협력 기관',
    value: '2',
    subtitle: 'BNL + Princeton',
    subtitleKorean: 'BNL + Princeton',
    description: 'Active partnerships: Brookhaven National Laboratory and Princeton (Hasson Lab). Alumni network at MIT EECS and Stanford.',
    descriptionKorean: '현재 협력: Brookhaven National Laboratory · Princeton(Hasson Lab). Alumni 네트워크는 MIT EECS·Stanford로 연결.',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: BeakerIcon,
    label: 'PI : Fellow Ratio',
    labelKorean: 'PI : 펠로우 비율',
    value: '1 : 3',
    subtitle: 'cohort-capped',
    subtitleKorean: 'cohort 제한',
    description: 'Cohort capped at 3 fellows per year, set by PI weekly capacity. No postdoc layer between fellow and PI.',
    descriptionKorean: '연 3명 cohort 제한 — PI 주간 가용 시간이 제약. 펠로우와 PI 사이 박사후 단계 없음.',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: AcademicCapIcon,
    label: 'Publication Target',
    labelKorean: '논문 목표',
    value: 'Target 1–2',
    subtitle: 'papers/fellow during program',
    subtitleKorean: '프로그램 기간 중 1-2편 (목표)',
    description: 'Target: co-authorship on 1–2 papers (workshop or conference) per fellow during the program. Definition of "high-impact" reported with first cohort outcomes.',
    descriptionKorean: '목표: 펠로우 1인당 프로그램 기간 중 1-2편 논문 공저 (워크숍/학회). 고임팩트 정의는 첫 cohort outcomes와 함께 공개.',
    color: 'from-red-400 to-pink-500',
  },
  {
    icon: BookOpenIcon,
    label: 'PhD Placement (target)',
    labelKorean: '박사과정 진학 목표',
    value: 'Reported',
    subtitle: 'from 2030 onwards',
    subtitleKorean: '2030년부터 보고',
    description: 'First cohort begins 2026; PhD placement outcomes will be reported transparently from 2030 (cohort graduation) onwards. Current SNU psychology BS → top-30 PhD baseline ≈ 25–35%.',
    descriptionKorean: '첫 cohort는 2026년 시작. PhD 진학 outcomes는 2030년(cohort 졸업)부터 본 사이트에 투명하게 보고. SNU 심리학 학사→top-30 PhD 현 baseline은 약 25-35%.',
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
            숫자로 보는 프로그램 운영
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
            These figures are our public commitments. Each will be reported annually from 2027 onwards.
          </p>
          <p className="text-sm text-gray-500 korean mb-6">
            위 수치는 본 프로그램의 공개 약속이며, 2027년부터 매년 본 사이트에 보고됩니다.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>Version 1.1</span>
            <span>•</span>
            <span>Updated April 2026</span>
            <span>•</span>
            <span className="korean">2026년 4월 업데이트</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}