'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BeakerIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { NavigationItem } from '@/types';
import clsx from 'clsx';

const navigation: NavigationItem[] = [
  {
    name: 'Home',
    nameKorean: '홈',
    href: '/',
  },
  {
    name: 'Program',
    nameKorean: '프로그램',
    href: '/program',
    icon: AcademicCapIcon,
    children: [
      { name: 'Overview', nameKorean: '개요', href: '/program/overview' },
      { name: 'Curriculum', nameKorean: '커리큘럼', href: '/program/curriculum' },
      { name: 'Support', nameKorean: '지원혜택', href: '/program/support' },
      { name: 'Timeline', nameKorean: '연간일정', href: '/program/timeline' },
    ],
  },
  {
    name: 'Research',
    nameKorean: '연구',
    href: '/research',
    icon: BeakerIcon,
    children: [
      { name: 'Focus Areas', nameKorean: '연구분야', href: '/research/areas' },
      { name: 'Projects', nameKorean: '프로젝트', href: '/research/projects' },
      { name: 'Publications', nameKorean: '논문', href: '/research/publications' },
    ],
  },
  {
    name: 'People',
    nameKorean: '구성원',
    href: '/people',
    icon: UserGroupIcon,
    children: [
      { name: 'Fellows', nameKorean: '펠로우', href: '/people/fellows' },
      { name: 'Mentors', nameKorean: '멘토', href: '/people/mentors' },
      { name: 'Alumni', nameKorean: '졸업생', href: '/people/alumni' },
    ],
  },
  {
    name: 'Apply',
    nameKorean: '지원하기',
    href: '/apply',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'News',
    nameKorean: '소식',
    href: '/news',
    icon: DocumentTextIcon,
  },
];

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="container-max">
            <div className="relative flex h-16 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">🧠</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                      Connectome Fellows
                    </span>
                    <span className="text-xs text-gray-500 korean">
                      서울대학교 커넥톰 펠로우십
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={clsx(
                        'nav-link px-3 py-2 text-sm',
                        pathname === item.href ? 'active' : ''
                      )}
                    >
                      <span className="flex items-center space-x-1">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.name}</span>
                        <span className="text-xs text-gray-400 korean">
                          {item.nameKorean}
                        </span>
                      </span>
                    </Link>

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brain-primary transition-colors duration-200"
                            >
                              <div className="flex justify-between items-center">
                                <span>{child.name}</span>
                                <span className="text-xs text-gray-400 korean">
                                  {child.nameKorean}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Auth/CTA Section */}
                <div className="flex items-center space-x-4 ml-4">
                  {session ? (
                    <>
                      <div className="text-sm text-gray-700">
                        <span>{session.user?.name}</span>
                        {session.user?.role === 'admin' && (
                          <Link href="/admin" className="ml-2 text-brain-primary hover:text-brain-secondary">
                            Admin Panel
                          </Link>
                        )}
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="btn-secondary text-sm"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => signIn()}
                        className="btn-ghost text-sm"
                      >
                        Sign In
                      </button>
                      <Link href="/apply" className="btn-primary">
                        <span>Apply Now</span>
                        <span className="ml-1 text-xs korean">지원하기</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brain-primary">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                      pathname === item.href
                        ? 'text-brain-primary bg-brain-primary/10'
                        : 'text-gray-700 hover:text-brain-primary hover:bg-gray-50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-400 korean">
                        {item.nameKorean}
                      </span>
                    </div>
                  </Link>

                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-brain-primary hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <span>{child.name}</span>
                            <span className="text-xs text-gray-400 korean">
                              {child.nameKorean}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="px-3 pt-4">
                <Link href="/apply" className="btn-primary w-full justify-center">
                  <span>Apply Now</span>
                  <span className="ml-2 text-sm korean">지원하기</span>
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}