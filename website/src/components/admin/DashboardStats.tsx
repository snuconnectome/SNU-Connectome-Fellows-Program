'use client';

import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  DocumentTextIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Active Fellows',
    nameKorean: '활성 펠로우',
    value: '1',
    previousValue: 0,
    change: '+100%',
    changeType: 'increase' as const,
    icon: UserGroupIcon,
    color: 'bg-blue-500',
    description: 'Currently enrolled in program',
    descriptionKorean: '현재 프로그램 참여 중',
  },
  {
    name: 'Pending Applications',
    nameKorean: '대기 중인 지원서',
    value: '5',
    previousValue: 3,
    change: '+67%',
    changeType: 'increase' as const,
    icon: ClipboardDocumentCheckIcon,
    color: 'bg-yellow-500',
    description: 'Awaiting review',
    descriptionKorean: '검토 대기 중',
  },
  {
    name: 'Mentors Network',
    nameKorean: '멘토 네트워크',
    value: '4',
    previousValue: 4,
    change: '0%',
    changeType: 'neutral' as const,
    icon: AcademicCapIcon,
    color: 'bg-purple-500',
    description: 'International mentors',
    descriptionKorean: '국제 멘토',
  },
  {
    name: 'Budget Utilization',
    nameKorean: '예산 사용률',
    value: '₩32M',
    previousValue: 28,
    change: '+14%',
    changeType: 'increase' as const,
    icon: CurrencyDollarIcon,
    color: 'bg-green-500',
    description: 'Current annual investment',
    descriptionKorean: '현재 연간 투자',
  },
  {
    name: 'Research Projects',
    nameKorean: '연구 프로젝트',
    value: '2',
    previousValue: 1,
    change: '+100%',
    changeType: 'increase' as const,
    icon: BeakerIcon,
    color: 'bg-indigo-500',
    description: 'Active research initiatives',
    descriptionKorean: '진행 중인 연구',
  },
  {
    name: 'Publications',
    nameKorean: '논문',
    value: '3',
    previousValue: 2,
    change: '+50%',
    changeType: 'increase' as const,
    icon: DocumentTextIcon,
    color: 'bg-red-500',
    description: 'Published papers (in progress)',
    descriptionKorean: '발표된 논문 (진행 중)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function DashboardStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.name}
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-xs korean text-gray-500">{stat.nameKorean}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center">
                    {stat.changeType === 'increase' ? (
                      <TrendingUpIcon className="w-4 h-4 text-green-500" />
                    ) : stat.changeType === 'decrease' ? (
                      <TrendingDownIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-green-600'
                          : stat.changeType === 'decrease'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                <p className="text-xs korean text-gray-400">{stat.descriptionKorean}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}