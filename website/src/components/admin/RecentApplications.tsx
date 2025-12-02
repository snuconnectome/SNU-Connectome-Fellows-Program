'use client';

import Link from 'next/link';
import {
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

// Mock data - would come from API
const recentApplications = [
  {
    id: 'APP-2025-001',
    nameKorean: '김철수',
    nameEnglish: 'Cheolsu Kim',
    department: '전기정보공학부',
    year: 3,
    gpa: 4.2,
    submittedAt: '2025-01-15T09:30:00Z',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'APP-2025-002',
    nameKorean: '이영희',
    nameEnglish: 'Younghee Lee',
    department: '심리학과',
    year: 2,
    gpa: 4.4,
    submittedAt: '2025-01-14T14:20:00Z',
    status: 'under_review',
    priority: 'high',
  },
  {
    id: 'APP-2025-003',
    nameKorean: '박민수',
    nameEnglish: 'Minsu Park',
    department: '컴퓨터공학부',
    year: 4,
    gpa: 4.0,
    submittedAt: '2025-01-13T11:45:00Z',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'APP-2025-004',
    nameKorean: '정수진',
    nameEnglish: 'Sujin Jung',
    department: '뇌인지과학과',
    year: 3,
    gpa: 4.3,
    submittedAt: '2025-01-12T16:10:00Z',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'APP-2025-005',
    nameKorean: '최도현',
    nameEnglish: 'Dohyun Choi',
    department: '자유전공학부',
    year: 2,
    gpa: 4.1,
    submittedAt: '2025-01-11T10:20:00Z',
    status: 'pending',
    priority: 'medium',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <ClockIcon className="w-4 h-4 text-yellow-500" />;
    case 'under_review':
      return <ExclamationCircleIcon className="w-4 h-4 text-blue-500" />;
    case 'accepted':
      return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    default:
      return <ClockIcon className="w-4 h-4 text-gray-400" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return { en: 'Pending Review', ko: '검토 대기' };
    case 'under_review':
      return { en: 'Under Review', ko: '검토 중' };
    case 'accepted':
      return { en: 'Accepted', ko: '합격' };
    default:
      return { en: 'Unknown', ko: '알 수 없음' };
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function RecentApplications() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Applications
            </h3>
            <p className="text-sm text-gray-500 korean">
              최근 지원서
            </p>
          </div>
          <Link
            href="/admin/applications"
            className="inline-flex items-center text-sm text-brain-primary hover:text-brain-secondary transition-colors duration-200"
          >
            <span>View All</span>
            <span className="ml-1 korean">전체보기</span>
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Applications List */}
      <div className="divide-y divide-gray-100">
        {recentApplications.map((application) => {
          const status = getStatusText(application.status);
          const timeAgo = new Date(application.submittedAt).toLocaleDateString('ko-KR');

          return (
            <Link
              key={application.id}
              href={`/admin/applications/${application.id}`}
              className="block px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-medium">
                    {application.nameKorean.charAt(0)}
                  </div>

                  {/* Application Info */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {application.nameKorean}
                      </h4>
                      <span className="text-xs text-gray-500">
                        ({application.nameEnglish})
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(
                          application.priority
                        )}`}
                      >
                        {application.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center">
                        <AcademicCapIcon className="w-3 h-3 mr-1" />
                        {application.department}
                      </span>
                      <span className="flex items-center">
                        <UserIcon className="w-3 h-3 mr-1" />
                        {application.year}학년
                      </span>
                      <span>GPA: {application.gpa}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Time */}
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-1 mb-1">
                    {getStatusIcon(application.status)}
                    <span className="text-sm font-medium text-gray-700">
                      {status.en}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 korean">{status.ko}</p>
                  <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 rounded-b-xl">
        <p className="text-xs text-gray-500 text-center">
          Showing 5 of 12 total applications
          <span className="ml-1 korean">총 12개 지원서 중 5개 표시</span>
        </p>
      </div>
    </div>
  );
}