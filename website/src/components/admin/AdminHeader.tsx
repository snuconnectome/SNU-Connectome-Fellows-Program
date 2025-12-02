'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  BellIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const pathTitles: Record<string, { title: string; titleKorean: string }> = {
  '/admin': { title: 'Dashboard Overview', titleKorean: '대시보드 개요' },
  '/admin/applications': { title: 'Application Management', titleKorean: '지원서 관리' },
  '/admin/fellows': { title: 'Fellow Management', titleKorean: '펠로우 관리' },
  '/admin/mentors': { title: 'Mentor Network', titleKorean: '멘토 네트워크' },
  '/admin/research': { title: 'Research Projects', titleKorean: '연구 프로젝트' },
  '/admin/analytics': { title: 'Program Analytics', titleKorean: '프로그램 분석' },
  '/admin/reports': { title: 'Reports & Statistics', titleKorean: '보고서 및 통계' },
  '/admin/notifications': { title: 'Notifications', titleKorean: '알림' },
  '/admin/settings': { title: 'System Settings', titleKorean: '시스템 설정' },
};

export function AdminHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentPage = pathTitles[pathname] || {
    title: 'Admin Panel',
    titleKorean: '관리자 패널'
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 lg:ml-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Page Title */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-brain-primary transition-colors duration-200"
            >
              <HomeIcon className="w-4 h-4 mr-1" />
              <span>Back to Website</span>
              <span className="ml-1 korean">웹사이트로 돌아가기</span>
            </Link>
            <span className="text-gray-300">|</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentPage.title}
              </h1>
              <p className="text-sm text-gray-500 korean">
                {currentPage.titleKorean}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>1 Active Fellow</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>5 Pending Applications</span>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brain-primary rounded-lg">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 bg-red-400 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {session?.user?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">
                  {session?.user?.role === 'admin' ? '관리자' :
                   session?.user?.role === 'mentor' ? '멘토' :
                   session?.user?.role === 'fellow' ? '펠로우' : '사용자'}
                </div>
              </div>
              <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                {session?.user?.name?.charAt(0) || 'U'}
              </div>
              <button
                onClick={handleSignOut}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                title="Sign out"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}