'use client';

import Link from 'next/link';
import {
  PlusIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

const quickActions = [
  {
    name: 'Add New Fellow',
    nameKorean: '새 펠로우 추가',
    href: '/admin/fellows/new',
    icon: UserPlusIcon,
    color: 'bg-blue-500 hover:bg-blue-600',
    description: 'Onboard a new fellow',
  },
  {
    name: 'Review Applications',
    nameKorean: '지원서 검토',
    href: '/admin/applications',
    icon: DocumentPlusIcon,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    description: '5 pending reviews',
  },
  {
    name: 'Send Notification',
    nameKorean: '알림 발송',
    href: '/admin/notifications/new',
    icon: EnvelopeIcon,
    color: 'bg-green-500 hover:bg-green-600',
    description: 'Notify fellows/mentors',
  },
  {
    name: 'Generate Report',
    nameKorean: '보고서 생성',
    href: '/admin/reports/new',
    icon: ChartBarIcon,
    color: 'bg-purple-500 hover:bg-purple-600',
    description: 'Monthly/quarterly reports',
  },
  {
    name: 'System Settings',
    nameKorean: '시스템 설정',
    href: '/admin/settings',
    icon: CogIcon,
    color: 'bg-gray-500 hover:bg-gray-600',
    description: 'Configure system',
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-500 korean">빠른 작업</p>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="block group"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-brain-primary hover:bg-gray-50 transition-all duration-200">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-white transition-colors duration-200`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-brain-primary">
                  {action.name}
                </h4>
                <p className="text-xs korean text-gray-500">{action.nameKorean}</p>
                <p className="text-xs text-gray-400 mt-1">{action.description}</p>
              </div>
              <PlusIcon className="w-4 h-4 text-gray-400 group-hover:text-brain-primary" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}