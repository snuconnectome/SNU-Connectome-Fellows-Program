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
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">🧠</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">
                    Connectome Fellows
                  </span>
                  <span className="text-sm text-gray-600 korean">
                    서울대학교 커넥톰 펠로우십
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6 korean leading-relaxed">
                인류의 천년 공헌을 위한 차세대 신경과학 인재 양성 프로그램
              </p>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Training the next generation of neuroscience leaders for humanity's thousand-year contribution
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4 text-brain-primary" />
                  <span>connectome-fellows@snu.ac.kr</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4 text-brain-primary" />
                  <span>+82-2-880-xxxx</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 text-brain-primary mt-0.5" />
                  <div>
                    <div>Seoul National University</div>
                    <div className="korean">서울특별시 관악구 관악로 1</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Program <span className="korean text-xs">프로그램</span>
              </h3>
              <ul className="space-y-3">
                {footerNavigation.program.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-brain-primary transition-colors duration-200 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                        <span className="text-xs korean text-gray-400">
                          {item.nameKorean}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* People & Research Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Community <span className="korean text-xs">커뮤니티</span>
              </h3>
              <ul className="space-y-3 mb-6">
                {footerNavigation.people.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-brain-primary transition-colors duration-200 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                        <span className="text-xs korean text-gray-400">
                          {item.nameKorean}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Research <span className="korean text-xs">연구</span>
              </h3>
              <ul className="space-y-3">
                {footerNavigation.research.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-brain-primary transition-colors duration-200 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                        <span className="text-xs korean text-gray-400">
                          {item.nameKorean}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Support */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Support <span className="korean text-xs">지원</span>
              </h3>
              <ul className="space-y-3 mb-6">
                {footerNavigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-brain-primary transition-colors duration-200 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {item.name}
                        </span>
                        <span className="text-xs korean text-gray-400">
                          {item.nameKorean}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div>
                <h4 className="text-xs font-semibold text-gray-900 tracking-wider uppercase mb-3">
                  Related Links <span className="korean">관련 링크</span>
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-brain-primary transition-colors duration-200"
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
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>&copy; 2025 Seoul National University Connectome Lab</span>
              <span>•</span>
              <span className="korean">서울대학교 커넥톰 연구실</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <span>Version 1.0.0</span>
              <Link
                href="/privacy"
                className="hover:text-brain-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-brain-primary transition-colors duration-200"
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