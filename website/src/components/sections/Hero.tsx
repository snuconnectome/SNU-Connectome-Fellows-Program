'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    label: 'Annual Investment',
    labelKorean: '연간 투자',
    value: '₩36.2M',
    description: 'per fellow',
    descriptionKorean: '펠로우당',
    icon: CurrencyDollarIcon,
  },
  {
    label: 'International Network',
    labelKorean: '국제 네트워크',
    value: '4+',
    description: 'top universities',
    descriptionKorean: '최고 대학',
    icon: GlobeAltIcon,
  },
  {
    label: 'Research Focus',
    labelKorean: '연구 분야',
    value: '100%',
    description: 'AI + Neuroscience',
    descriptionKorean: 'AI + 신경과학',
    icon: SparklesIcon,
  },
  {
    label: 'Elite Program',
    labelKorean: '엘리트 프로그램',
    value: 'Top 0.001%',
    description: 'global talent',
    descriptionKorean: '글로벌 인재',
    icon: AcademicCapIcon,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brain-light/5">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brain-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brain-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-brain-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-max py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-gradient-brand text-white mb-8 shadow-lg"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            <span>Now Accepting Applications</span>
            <span className="ml-2 korean">지원 모집 중</span>
          </motion.div>

          {/* Main Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text-accent">
                Foundations of
              </span>
              <br />
              <span className="gradient-text">
                Neural Intelligence
              </span>
            </h1>

            <div className="korean text-2xl md:text-4xl font-bold text-gray-800 leading-relaxed">
              인류 천년의 공헌을 위한
              <br />
              <span className="gradient-text">차세대 신경과학 인재 양성</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto space-y-4 mb-12"
          >
            <p className="text-xl text-gray-600 leading-relaxed">
              Training the next generation of neuroscience leaders through cutting-edge
              <span className="font-semibold text-brain-primary"> Foundation Model research</span>,
              world-class mentorship, and comprehensive support.
            </p>
            <p className="text-lg text-gray-500 korean leading-relaxed">
              최첨단 Foundation Model 연구, 세계적 멘토링, 그리고 포괄적 지원을 통해
              <br />
              차세대 신경과학 리더를 양성하는 프로그램입니다.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/apply" className="btn-primary text-lg px-8 py-4 shadow-xl">
              <span>Apply Now</span>
              <span className="ml-2 korean">지원하기</span>
            </Link>
            <Link href="/program" className="btn-secondary text-lg px-8 py-4">
              <span>Learn More</span>
              <span className="ml-2 korean">더 알아보기</span>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="card-featured text-center group cursor-default"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-brain-primary group-hover:text-brain-secondary transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-brain-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 mb-2 korean">
                  {stat.labelKorean}
                </div>
                <div className="text-xs text-gray-400">
                  <span>{stat.description}</span>
                  <span className="ml-1 korean">{stat.descriptionKorean}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center space-y-2 text-gray-400">
              <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
              <span className="text-xs korean">스크롤하여 탐색</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}