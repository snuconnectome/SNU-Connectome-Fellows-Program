'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BeakerIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { NavigationItem } from '@/types';
import clsx from 'clsx';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const navigation: NavigationItem[] = [
  { name: 'Home', nameKorean: '홈', href: '/' },
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
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <Disclosure as="nav" className={clsx(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-neuro-base/80 backdrop-blur-xl border-white/5 shadow-lg" : "bg-transparent"
    )}>
      {({ open }) => (
        <>
          <div className="container-max">
            <div className="relative flex h-20 justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-neuro-primary to-neuro-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-neuro-primary/50 transition-all duration-300">
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
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:items-center lg:space-x-1">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group px-1">
                    <Link
                      href={item.href}
                      className={clsx(
                        'nav-link px-4 py-2 rounded-full text-sm transition-all duration-200',
                        pathname === item.href
                          ? 'text-white bg-white/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span className="flex items-center space-x-1">
                        <span>{item.name}</span>
                      </span>
                    </Link>

                    {/* Dropdown Menu */}
                    {item.children && (
                      <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        <div className="glass-panel p-2 shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-200"
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{child.name}</span>
                                <span className="text-xs text-gray-500 korean mt-0.5">
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

                {/* CTA Section */}
                <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-white/10">
                  <Link href="/apply" className="btn-primary px-6 py-2 text-sm shadow-lg shadow-neuro-primary/20">
                    <span>Apply</span>
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">
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
          <Disclosure.Panel className="lg:hidden bg-neuro-base/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'block px-3 py-3 rounded-lg text-base font-medium transition-colors duration-200',
                      pathname === item.href
                        ? 'text-white bg-white/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 korean">
                        {item.nameKorean}
                      </span>
                    </div>
                  </Link>
                  {item.children && (
                    <div className="ml-4 pl-4 border-l border-white/10 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <span>{child.name}</span>
                            <span className="text-xs text-gray-600 korean">
                              {child.nameKorean}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}