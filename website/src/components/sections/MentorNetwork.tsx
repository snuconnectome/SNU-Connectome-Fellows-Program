'use client';

import { motion } from 'framer-motion';

const mentors = [
  {
    name: '유신재 교수',
    nameEnglish: 'Prof. Yoo Sinjae',
    institution: 'Brookhaven National Laboratory',
    expertise: 'Brain Imaging, Neuroscience, Biomarkers',
    image: '/mentors/yoo-sinjae.jpg',
  },
  {
    name: 'Uri Hasson',
    nameKorean: '우리 하손 교수',
    institution: 'Princeton University',
    expertise: 'Language-Brain Modeling, Neural Communication',
    image: '/mentors/uri-hasson.jpg',
  },
  {
    name: '박기태 박사',
    nameEnglish: 'Dr. Kitae Park',
    institution: 'Brookhaven National Laboratory',
    expertise: 'Computational Neuroscience, ML for Neuroimaging',
    image: '/mentors/kitae-park.jpg',
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
            <span className="gradient-text">World-Class Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 korean">
            세계적 수준의 멘토들과 함께하는 연구 여정
          </p>
        </motion.div>

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
              <p className="text-sm text-gray-600">
                {mentor.expertise}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}