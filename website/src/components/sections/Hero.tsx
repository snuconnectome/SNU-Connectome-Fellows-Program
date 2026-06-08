'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TextReveal } from '@/components/ui/TextReveal';

const stats = [
  {
    label: 'Personal AI Workstation',
    labelKorean: '개인 AI 워크스테이션',
    value: 'DGX Spark',
    description: '+ Lab GPU cluster',
    descriptionKorean: '+ Lab GPU 클러스터',
    icon: CurrencyDollarIcon,
  },
  {
    label: 'Cohort Size (cap)',
    labelKorean: 'Cohort 규모 (제한)',
    value: '3',
    description: 'fellows / year',
    descriptionKorean: '명 / 연',
    icon: SparklesIcon,
  },
  {
    label: 'Active Partner Institutions',
    labelKorean: '현재 협력 기관',
    value: '2',
    description: 'BNL + Princeton',
    descriptionKorean: 'BNL + Princeton',
    icon: GlobeAltIcon,
  },
  {
    label: 'PI Direct Time',
    labelKorean: 'PI 직접 시간',
    value: 'Weekly 1:1',
    description: 'with the PI',
    descriptionKorean: 'PI와 주 1회',
    icon: AcademicCapIcon,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">

      <div className="container-max relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-white/5 border border-white/10 text-neuro-cyan backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neuro-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neuro-cyan"></span>
            </span>
            <span>2026 Cohort — Applications Open · Jun 15 Deadline</span>
            <span className="ml-2 korean text-white/60">2026년 모집 — 지원 접수 중 · 6월 15일 마감</span>
          </motion.div>

          {/* Main Headlines */}
          <div className="space-y-2 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold leading-tight tracking-tight"
            >
              <span className="text-white">Foundations of</span>
              <br />
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-neuro-primary via-neuro-secondary to-neuro-accent">
                Neural Intelligence
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="korean text-2xl md:text-3xl font-medium text-gray-400 mt-6"
            >
              꿈은 구체적으로, 호기심은 끄지 않게, <span className="text-white">분야는 두 개 이상.</span>
            </motion.div>

            {/* PI byline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-sm md:text-base text-gray-500 mt-6"
            >
              Led by Prof. Jiook Cha (차지욱 교수), Department of Psychology, Seoul National University
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            We don't evaluate you on your resume. We want to see one question of yours.
            It is fine if that question is still blurry — if you can describe
            the texture of the blur, that is enough.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="korean text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            저희는 이력서로 평가하지 않습니다. 대신 본인의 질문 한 가지를 보고자 합니다.
            그 질문이 아직 흐릿하더라도 괜찮습니다 — 흐릿함의 결을 묘사할 수 있다면 그것으로 충분합니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
          >
            <MagneticButton>
              <Link href="/apply" className="btn-primary group">
                <span>Apply Now</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="/program" className="btn-outline group">
                <span>Program Details</span>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center group hover:bg-white/5 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-neuro-primary group-hover:text-neuro-accent transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600 korean">
                  {stat.labelKorean}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Text Reveal Section */}
      <div className="w-full mt-32">
        <TextReveal className="container-max">
          "This program is for undergraduates whose questions are not contained within a single syllabus."
        </TextReveal>
        <p className="text-center korean text-gray-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto px-4 leading-relaxed">
          본 프로그램은 학과 커리큘럼으로 환원되지 않는 질문을 가진 학부생을 대상으로 합니다.
        </p>
      </div>
    </section>
  );
}