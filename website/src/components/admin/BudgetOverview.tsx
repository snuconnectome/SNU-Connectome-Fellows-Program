'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CurrencyDollarIcon, TrendingUpIcon } from '@heroicons/react/24/outline';

const budgetData = [
  { name: 'Student Stipends', nameKorean: '학생 장학금', value: 12000000, color: '#667eea' },
  { name: 'Equipment', nameKorean: '장비', value: 6000000, color: '#764ba2' },
  { name: 'Overseas Programs', nameKorean: '해외 프로그램', value: 10000000, color: '#f093fb' },
  { name: 'AI Resources', nameKorean: 'AI 리소스', value: 7200000, color: '#48bb78' },
  { name: 'Books & Materials', nameKorean: '도서 및 자료', value: 1000000, color: '#ed8936' },
];

const monthlySpending = [
  { month: 'Jan', korean: '1월', amount: 2800000 },
  { month: 'Feb', korean: '2월', amount: 3200000 },
  { month: 'Mar', korean: '3월', amount: 2900000 },
  { month: 'Apr', korean: '4월', amount: 3100000 },
];

const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);
const totalSpent = monthlySpending.reduce((sum, item) => sum + item.amount, 0);
const utilizationRate = (totalSpent / totalBudget) * 100;

export function BudgetOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="w-5 h-5 text-brain-primary" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Budget Overview
            </h3>
            <p className="text-sm text-gray-500 korean">
              예산 개요
            </p>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="px-6 py-4 bg-gradient-brand text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-brain-light">Total Annual Budget</p>
            <p className="text-xs korean text-brain-light/80">연간 총 예산</p>
            <p className="text-2xl font-bold">₩{(totalBudget / 10000).toFixed(0)}만원</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-brain-light">Utilization Rate</p>
            <p className="text-xs korean text-brain-light/80">사용률</p>
            <div className="flex items-center">
              <TrendingUpIcon className="w-4 h-4 mr-1" />
              <p className="text-xl font-bold">{utilizationRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">
          Budget Allocation <span className="korean text-xs">예산 배분</span>
        </h4>

        {/* Simple Budget List */}
        <div className="space-y-3">
          {budgetData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs korean text-gray-500">{item.nameKorean}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ₩{(item.value / 10000).toFixed(0)}만원
                </p>
                <p className="text-xs text-gray-500">
                  {((item.value / totalBudget) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Spending Trend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-4">
            Monthly Spending <span className="korean text-xs">월별 지출</span>
          </h4>
          <div className="space-y-2">
            {monthlySpending.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {month.month} <span className="korean text-xs">({month.korean})</span>
                </span>
                <span className="text-sm font-medium text-gray-900">
                  ₩{(month.amount / 10000).toFixed(0)}만원
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Total Spent</span>
              <span className="text-lg font-bold text-brain-primary">
                ₩{(totalSpent / 10000).toFixed(0)}만원
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}