'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-brain-primary to-brain-secondary">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <AcademicCapIcon className="w-10 h-10 text-white" />
          </div>

          {/* Headlines */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Begin Your Journey
          </h2>
          <p className="text-2xl md:text-3xl font-semibold mb-2 korean">
            여정을 시작하세요
          </p>

          <p className="text-xl text-brain-light mb-8 max-w-3xl mx-auto leading-relaxed">
            Join an elite community dedicated to advancing neuroscience through AI.
            <br />
            Applications are now open for the 2025 cohort.
          </p>
          <p className="text-lg text-white/80 korean mb-12 max-w-2xl mx-auto leading-relaxed">
            AI를 통한 신경과학 발전에 헌신하는 엘리트 커뮤니티에 합류하세요.
            <br />
            2025년 코호트 지원이 시작되었습니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/apply"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-brain-primary font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span>Apply Now</span>
              <span className="ml-2 korean">지원하기</span>
              <ArrowRightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/program"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-200 text-lg"
            >
              <span>Learn More</span>
              <span className="ml-2 korean">더 알아보기</span>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-white/60">
              Application deadline: March 31, 2025
              <span className="mx-2">•</span>
              <span className="korean">지원 마감: 2025년 3월 31일</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}