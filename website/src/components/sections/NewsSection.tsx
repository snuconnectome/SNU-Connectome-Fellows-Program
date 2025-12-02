'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const news = [
  {
    title: 'Program Launch Announcement',
    titleKorean: '프로그램 런칭 발표',
    date: '2025-01-15',
    category: 'Announcement',
    categoryKorean: '공지',
    excerpt: 'SNU Connectome Fellows Program officially launches with comprehensive support for neuroscience research.',
    excerptKorean: 'SNU 커넥톰 펠로우십 프로그램이 신경과학 연구를 위한 포괄적 지원과 함께 공식 런칭',
  },
  {
    title: 'Application Period Opens',
    titleKorean: '지원 기간 시작',
    date: '2025-02-01',
    category: 'Applications',
    categoryKorean: '지원',
    excerpt: 'Applications are now open for the inaugural 2025 cohort. Application deadline: March 31, 2025.',
    excerptKorean: '2025년 첫 코호트 지원이 시작되었습니다. 지원 마감: 2025년 3월 31일',
  },
  {
    title: 'BrainLM Research Collaboration',
    titleKorean: 'BrainLM 연구 협력',
    date: '2025-01-20',
    category: 'Research',
    categoryKorean: '연구',
    excerpt: 'New collaboration with international partners on BrainLM foundation model development.',
    excerptKorean: 'BrainLM Foundation Model 개발을 위한 국제 파트너와의 새로운 협력',
  },
];

export function NewsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Latest News</span>
          </h2>
          <p className="text-xl text-gray-600 korean">
            최신 소식
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {news.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <CalendarIcon className="w-4 h-4" />
                <span>{new Date(item.date).toLocaleDateString('ko-KR')}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-brain-primary font-medium">{item.category}</span>
                <span className="korean text-xs">{item.categoryKorean}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-gray-500 korean mb-3">
                {item.titleKorean}
              </p>

              <p className="text-gray-600 leading-relaxed mb-3">
                {item.excerpt}
              </p>
              <p className="text-sm korean text-gray-500 leading-relaxed">
                {item.excerptKorean}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center text-brain-primary font-semibold hover:text-brain-secondary transition-colors duration-200 group"
          >
            <span>View All News</span>
            <span className="ml-2 korean">모든 소식 보기</span>
            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}