'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon,
  BeakerIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Dashboard',
    nameKorean: '대시보드',
    href: '/admin',
    icon: HomeIcon,
  },
  {
    name: 'Applications',
    nameKorean: '지원서',
    href: '/admin/applications',
    icon: ClipboardDocumentCheckIcon,
    badge: '5 pending',
  },
  {
    name: 'Fellows',
    nameKorean: '펠로우',
    href: '/admin/fellows',
    icon: UserGroupIcon,
  },
  {
    name: 'Mentors',
    nameKorean: '멘토',
    href: '/admin/mentors',
    icon: AcademicCapIcon,
  },
  {
    name: 'Research Projects',
    nameKorean: '연구 프로젝트',
    href: '/admin/research',
    icon: BeakerIcon,
  },
  {
    name: 'Analytics',
    nameKorean: '분석',
    href: '/admin/analytics',
    icon: ChartBarIcon,
  },
  {
    name: 'Reports',
    nameKorean: '보고서',
    href: '/admin/reports',
    icon: DocumentTextIcon,
  },
  {
    name: 'Notifications',
    nameKorean: '알림',
    href: '/admin/notifications',
    icon: BellIcon,
  },
  {
    name: 'Settings',
    nameKorean: '설정',
    href: '/admin/settings',
    icon: CogIcon,
  },
];

export function AdminSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brain-primary"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isMobileMenuOpen ? (
          <XMarkIcon className="block h-6 w-6" />
        ) : (
          <Bars3Icon className="block h-6 w-6" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 bg-gradient-brand">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">Admin Panel</div>
                <div className="text-xs text-brain-light korean">관리자 패널</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
                    isActive
                      ? 'bg-brain-primary text-white'
                      : 'text-gray-700 hover:text-brain-primary hover:bg-gray-50'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'mr-3 flex-shrink-0 h-5 w-5',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-brain-primary'
                    )}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs korean opacity-75">{item.nameKorean}</div>
                    </div>
                    {item.badge && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">Admin User</div>
                <div className="text-xs text-gray-500 korean">관리자</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}