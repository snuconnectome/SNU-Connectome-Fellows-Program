import Link from 'next/link';
import {
  AcademicCapIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const footerNavigation = {
  program: [
    { name: 'Overview', nameKorean: '프로그램 개요', href: '/program/overview' },
    { name: 'Curriculum', nameKorean: '커리큘럼', href: '/program/curriculum' },
    { name: 'Support', nameKorean: '지원혜택', href: '/program/support' },
    { name: 'Timeline', nameKorean: '연간일정', href: '/program/timeline' },
  ],
  people: [
    { name: 'Fellows', nameKorean: '펠로우', href: '/people/fellows' },
    { name: 'Mentors', nameKorean: '멘토', href: '/people/mentors' },
    { name: 'Alumni', nameKorean: '졸업생', href: '/people/alumni' },
  ],
  research: [
    { name: 'Research Areas', nameKorean: '연구분야', href: '/research/areas' },
    { name: 'Projects', nameKorean: '프로젝트', href: '/research/projects' },
    { name: 'Publications', nameKorean: '논문', href: '/research/publications' },
  ],
  resources: [
    { name: 'Application Guide', nameKorean: '지원안내', href: '/apply/guide' },
    { name: 'FAQ', nameKorean: '자주묻는질문', href: '/faq' },
    { name: 'Contact', nameKorean: '문의', href: '/contact' },
    { name: 'Privacy Policy', nameKorean: '개인정보처리방침', href: '/privacy' },
  ],
};

const socialLinks = [
  {
    name: 'SNU Official',
    nameKorean: '서울대학교',
    href: 'https://www.snu.ac.kr',
    icon: GlobeAltIcon,
  },
  {
    name: 'Connectome Lab',
    nameKorean: '커넥톰 연구실',
    href: 'https://connectome.snu.ac.kr',
    icon: AcademicCapIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-neuro-surface border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neuro-primary/50 to-transparent" />

      <div className="container-max">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-neuro-primary to-neuro-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🧠</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white tracking-tight">
                    Connectome
                  </span>
                  <span className="text-[10px] text-gray-400 korean tracking-widest uppercase">
                    Fellows Program
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-6 korean leading-relaxed">
                꿈은 구체적으로, 호기심은 끄지 않게, 분야는 두 개 이상. 서울대 Connectome Lab의 학부생 펠로우십.
              </p>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                A specific dream. A curiosity that won&apos;t switch off. At least two fields in your head.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-400 hover:text-neuro-primary transition-colors">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>connectome-fellows@snu.ac.kr</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400 hover:text-neuro-primary transition-colors">
                  <PhoneIcon className="w-4 h-4" />
                  <span>+82-2-880-xxxx</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-400 hover:text-neuro-primary transition-colors">
                  <MapPinIcon className="w-4 h-4 mt-0.5" />
                  <div>
                    <div>Seoul National University</div>
                    <div className="korean">서울특별시 관악구 관악로 1</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Links */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                Program <span className="korean text-xs text-gray-500 ml-1">프로그램</span>
              </h3>
              <ul className="space-y-4">
                {footerNavigation.program.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group flex items-center justify-between"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                      <span className="text-xs korean text-gray-600 group-hover:text-gray-400">
                        {item.nameKorean}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* People & Research Links */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                Community <span className="korean text-xs text-gray-500 ml-1">커뮤니티</span>
              </h3>
              <ul className="space-y-4 mb-8">
                {footerNavigation.people.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group flex items-center justify-between"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                      <span className="text-xs korean text-gray-600 group-hover:text-gray-400">
                        {item.nameKorean}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                Research <span className="korean text-xs text-gray-500 ml-1">연구</span>
              </h3>
              <ul className="space-y-4">
                {footerNavigation.research.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group flex items-center justify-between"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                      <span className="text-xs korean text-gray-600 group-hover:text-gray-400">
                        {item.nameKorean}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Support */}
            <div>
              <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">
                Support <span className="korean text-xs text-gray-500 ml-1">지원</span>
              </h3>
              <ul className="space-y-4 mb-8">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200 group flex items-center justify-between"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </span>
                      <span className="text-xs korean text-gray-600 group-hover:text-gray-400">
                        {item.nameKorean}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div>
                <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
                  Related Links <span className="korean text-gray-500 ml-1">관련 링크</span>
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-neuro-primary transition-colors duration-200"
                      aria-label={item.name}
                    >
                      <item.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <span>&copy; 2025 Seoul National University Connectome Lab</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-600">
              <span>Version 2.0.0 (Neuro-Future)</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}