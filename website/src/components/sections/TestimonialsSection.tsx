'use client';

import { motion } from 'framer-motion';

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-gray-600 korean mb-12">
            펠로우들의 성공 스토리
          </p>

          <div className="card-featured max-w-4xl mx-auto p-8">
            <blockquote className="text-xl text-gray-600 italic mb-6">
              "Program launching soon. First cohort testimonials will be featured here."
            </blockquote>
            <p className="text-lg korean text-gray-500 mb-6">
              "프로그램이 곧 시작됩니다. 첫 번째 코호트 후기가 여기에 소개될 예정입니다."
            </p>
            <div className="text-brain-primary font-semibold">
              — Coming Soon
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}