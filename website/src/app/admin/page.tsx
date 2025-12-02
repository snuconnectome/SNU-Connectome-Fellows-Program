import { Metadata } from 'next';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RecentApplications } from '@/components/admin/RecentApplications';
import { FellowProgress } from '@/components/admin/FellowProgress';
import { BudgetOverview } from '@/components/admin/BudgetOverview';
import { ResearchMetrics } from '@/components/admin/ResearchMetrics';
import { QuickActions } from '@/components/admin/QuickActions';

export const metadata: Metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'SNU Connectome Fellows Program administrative dashboard overview',
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-brand rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-brain-light korean">
              SNU 커넥톰 펠로우십 프로그램 관리 대시보드
            </p>
            <p className="text-sm text-brain-light mt-2">
              Last updated: {new Date().toLocaleDateString('ko-KR')}
            </p>
          </div>
          <div className="text-6xl opacity-20">🧠</div>
        </div>
      </div>

      {/* Key Statistics */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Applications & Fellows */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Applications */}
          <RecentApplications />

          {/* Fellow Progress */}
          <FellowProgress />

          {/* Research Metrics */}
          <ResearchMetrics />
        </div>

        {/* Right Column - Budget & Quick Actions */}
        <div className="space-y-6">
          {/* Budget Overview */}
          <BudgetOverview />

          {/* Quick Actions */}
          <QuickActions />
        </div>
      </div>
    </div>
  );
}