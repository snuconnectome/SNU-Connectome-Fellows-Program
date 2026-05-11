'use client';

import { motion } from 'framer-motion';

const pi = {
  name: '차지욱 교수',
  nameEnglish: 'Prof. Jiook Cha',
  institution: 'Seoul National University, Department of Psychology',
  role: 'Program Lead (PI)',
  roleKorean: '프로그램 책임 (PI)',
  expertise: 'Connectome Foundation Models, fMRI–LLM Alignment, Computational Psychiatry',
  expertiseKorean: '커넥톰 기초 모델, fMRI–LLM 정렬, 계산 정신의학',
};

const mentors = [
  {
    name: '유신재 박사',
    nameEnglish: 'Dr. Shinjae Yoo',
    institution: 'Brookhaven National Laboratory',
    expertise: 'Computational Research Lead, ML for Brain Imaging',
    expertiseKorean: 'Computational Research Lead · 뇌영상 기계학습',
    image: '/mentors/shinjae-yoo.jpg',
  },
  {
    name: '박케태 박사',
    nameEnglish: 'Dr. David Keetae Park',
    institution: 'Brookhaven National Laboratory',
    expertise: 'Spatiotemporal ML, Neural Fields, Brain Imaging Applications',
    expertiseKorean: '시공간 기계학습 · Neural Fields · 뇌영상 응용',
    image: '/mentors/david-keetae-park.jpg',
  },
  {
    name: 'Uri Hasson',
    nameKorean: '유리 하손 교수',
    institution: 'Princeton University',
    expertise: 'Language–Brain Modeling, Neural Communication',
    expertiseKorean: '언어–뇌 모델링 · 신경 communication',
    image: '/mentors/uri-hasson.jpg',
  },
];

export function MentorNetwork() {
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
            <span className="gradient-text">Program Lead and Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 korean">
            프로그램 책임자와 협력 멘토진
          </p>
        </motion.div>

        {/* Program Lead (PI) — separate, larger card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card text-center max-w-2xl mx-auto mb-12 border-2 border-brain-primary/30"
        >
          <div className="inline-block px-3 py-1 mb-4 bg-brain-primary/10 text-brain-primary text-xs font-semibold rounded-full">
            {pi.role} <span className="korean ml-1">{pi.roleKorean}</span>
          </div>
          <div className="w-28 h-28 bg-gradient-brand rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
            {pi.name.charAt(0)}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {pi.name}
          </h3>
          <p className="text-base text-gray-500 mb-2">{pi.nameEnglish}</p>
          <p className="text-base font-medium text-brain-primary mb-4">
            {pi.institution}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {pi.expertise}
          </p>
          <p className="text-sm text-gray-500 korean">
            {pi.expertiseKorean}
          </p>
        </motion.div>

        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-2">
          Active Collaborating Mentors
        </h3>
        <p className="text-sm text-gray-500 text-center mb-8 korean">
          현재 활동 중인 협력 멘토진
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card text-center"
            >
              <div className="w-24 h-24 bg-gradient-brand rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                {mentor.name.charAt(0)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {mentor.name}
              </h3>
              {mentor.nameEnglish && (
                <p className="text-sm text-gray-500 mb-2">{mentor.nameEnglish}</p>
              )}
              {mentor.nameKorean && (
                <p className="text-sm text-gray-500 korean mb-2">{mentor.nameKorean}</p>
              )}
              <p className="text-sm font-medium text-brain-primary mb-3">
                {mentor.institution}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                {mentor.expertise}
              </p>
              <p className="text-xs text-gray-500 korean">
                {mentor.expertiseKorean}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Alumni network — honest framing */}
        <p className="text-sm text-gray-500 text-center mt-10 max-w-3xl mx-auto leading-relaxed">
          Lab alumni network spans MIT EECS and Stanford. Active partnerships are with BNL and Princeton (Hasson Lab). Additional mentor collaborations will be announced as confirmed.
        </p>
        <p className="text-sm text-gray-500 text-center mt-2 max-w-3xl mx-auto korean leading-relaxed">
          본 lab의 alumni 네트워크는 MIT EECS·Stanford에 닿아 있으며, 현재 활동 중인 공식 협력은 BNL·Princeton(Hasson Lab)입니다. 추가 멘토 협력은 확정 시 별도 공지합니다.
        </p>
      </div>
    </section>
  );
}