'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BeakerIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Note: BrainLM, Brain-JEPA, Brain Harmony are external-lab works (Yale van Dijk,
// NUS Helen Zhou, etc.) that the lab studies and builds on, not works authored
// by Connectome Lab. Framing reflects this distinction.
const researchAreas = [
  {
    title: 'BrainLM',
    titleKorean: 'BrainLM',
    subtitle: 'Foundation Model for fMRI (Yale)',
    subtitleKorean: '기능적 자기공명영상(fMRI) 기초 모델 (Yale)',
    paper: 'ICLR 2024',
    description: 'Transformer-based foundation model for brain activity recordings, trained with masked self-supervised pretraining on large fMRI datasets.',
    descriptionKorean: '대규모 fMRI 데이터에 마스킹 자기지도학습으로 사전학습된 뇌 활동 기록용 Transformer 기반 기초 모델',
    color: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Brain-JEPA',
    titleKorean: 'Brain-JEPA',
    subtitle: 'Joint-Embedding Predictive Architecture for fMRI (NUS)',
    subtitleKorean: 'fMRI 동역학용 결합 임베딩 예측 아키텍처 (NUS)',
    paper: 'NeurIPS 2024 Spotlight',
    description: 'Self-supervised brain dynamics foundation model with gradient positioning and spatiotemporal masking, trained on fMRI time-series.',
    descriptionKorean: 'fMRI 시계열에 대한 자기지도 뇌 동역학 기초 모델 (gradient positioning + spatiotemporal masking)',
    color: 'from-green-500 to-blue-500',
  },
  {
    title: 'Brain Harmony',
    titleKorean: 'Brain Harmony',
    subtitle: 'Structure–Function Multimodal Integration',
    subtitleKorean: '뇌 구조·기능 다중모달 통합',
    paper: 'NeurIPS 2025',
    description: 'Unified framework integrating structural morphology and functional dynamics into compact 1D token representations of the brain.',
    descriptionKorean: '뇌의 구조적 형태와 기능적 동역학을 단일 1D 토큰 표상으로 통합하는 프레임워크',
    color: 'from-purple-500 to-pink-500',
  },
];

export function ResearchHighlights() {
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
            <span className="gradient-text">Research Focus</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed korean">
            최첨단 신경과학 Foundation Model 연구
          </p>
        </motion.div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-featured group cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${area.color} text-white mb-6`}>
                <BeakerIcon className="w-6 h-6" />
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {area.title}
                </h3>
                <p className="text-sm font-medium text-gray-500 korean mb-2">
                  {area.titleKorean}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">{area.subtitle}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-brain-primary font-semibold">{area.paper}</span>
                </div>
                <p className="text-xs korean text-gray-500 mt-1">
                  {area.subtitleKorean}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-3">
                {area.description}
              </p>
              <p className="text-sm korean text-gray-500 leading-relaxed">
                {area.descriptionKorean}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/research"
            className="inline-flex items-center text-brain-primary font-semibold hover:text-brain-secondary transition-colors duration-200 group"
          >
            <span>Explore All Research Areas</span>
            <span className="ml-2 korean">모든 연구 분야 탐색</span>
            <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}