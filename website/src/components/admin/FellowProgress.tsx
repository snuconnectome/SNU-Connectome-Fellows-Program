'use client';

import { UserGroupIcon, TrophyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const fellows = [
  {
    id: 'F2025-001',
    nameKorean: '김철수',
    nameEnglish: 'Cheolsu Kim',
    cohort: 2025,
    currentScore: 88,
    researchArea: 'BrainLM',
    publications: 1,
    presentations: 2,
    monthlyStipend: 1000000,
  },
];

export function FellowProgress() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5 text-brain-primary" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Fellow Progress</h3>
            <p className="text-sm text-gray-500 korean">펠로우 진행 상황</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {fellows.map((fellow) => (
          <div key={fellow.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold">
                  {fellow.nameKorean.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{fellow.nameKorean}</h4>
                  <p className="text-sm text-gray-500">{fellow.nameEnglish}</p>
                  <p className="text-xs text-brain-primary">{fellow.researchArea}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-brain-primary">{fellow.currentScore}</p>
                <p className="text-xs text-gray-500">Performance Score</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <DocumentTextIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">{fellow.publications}</p>
                <p className="text-xs text-gray-500 korean">논문</p>
              </div>
              <div className="text-center">
                <TrophyIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">{fellow.presentations}</p>
                <p className="text-xs text-gray-500 korean">발표</p>
              </div>
              <div className="text-center">
                <UserGroupIcon className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">₹{fellow.monthlyStipend / 10000}만원</p>
                <p className="text-xs text-gray-500 korean">월 장학금</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}