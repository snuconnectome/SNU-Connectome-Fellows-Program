import { screen } from '@testing-library/react';
import { DashboardStats } from '../DashboardStats';
import { render } from '@/test/test-utils';

describe('DashboardStats Component', () => {
  it('renders all statistics cards', () => {
    render(<DashboardStats />);

    // Check for main statistics
    expect(screen.getByText('Active Fellows')).toBeInTheDocument();
    expect(screen.getByText('활성 펠로우')).toBeInTheDocument();

    expect(screen.getByText('Pending Applications')).toBeInTheDocument();
    expect(screen.getByText('대기 중인 지원서')).toBeInTheDocument();

    expect(screen.getByText('Mentors Network')).toBeInTheDocument();
    expect(screen.getByText('멘토 네트워크')).toBeInTheDocument();

    expect(screen.getByText('Budget Utilization')).toBeInTheDocument();
    expect(screen.getByText('예산 사용률')).toBeInTheDocument();
  });

  it('displays correct statistical values', () => {
    render(<DashboardStats />);

    // Check specific values
    expect(screen.getByText('1')).toBeInTheDocument(); // Active Fellows
    expect(screen.getByText('5')).toBeInTheDocument(); // Pending Applications
    expect(screen.getByText('4')).toBeInTheDocument(); // Mentors Network
    expect(screen.getByText('₩32M')).toBeInTheDocument(); // Budget
  });

  it('shows trend indicators', () => {
    render(<DashboardStats />);

    // Check for percentage changes
    expect(screen.getByText('+100%')).toBeInTheDocument();
    expect(screen.getByText('+67%')).toBeInTheDocument();
    expect(screen.getByText('+14%')).toBeInTheDocument();
  });

  it('includes proper descriptions for each stat', () => {
    render(<DashboardStats />);

    expect(screen.getByText('Currently enrolled in program')).toBeInTheDocument();
    expect(screen.getByText('현재 프로그램 참여 중')).toBeInTheDocument();

    expect(screen.getByText('Awaiting review')).toBeInTheDocument();
    expect(screen.getByText('검토 대기 중')).toBeInTheDocument();
  });

  it('renders icons for each statistic', () => {
    render(<DashboardStats />);

    // Check that all stat cards have icons
    const statCards = document.querySelectorAll('.bg-blue-500, .bg-yellow-500, .bg-purple-500, .bg-green-500, .bg-indigo-500, .bg-red-500');
    expect(statCards.length).toBe(6);
  });

  it('has hover effects on cards', () => {
    render(<DashboardStats />);

    const cards = document.querySelectorAll('.hover\\:shadow-md');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('displays bilingual content correctly', () => {
    render(<DashboardStats />);

    // Check for Korean text elements
    const koreanElements = document.querySelectorAll('.korean');
    expect(koreanElements.length).toBeGreaterThan(0);

    // Verify specific bilingual content
    expect(screen.getByText('Research Projects')).toBeInTheDocument();
    expect(screen.getByText('연구 프로젝트')).toBeInTheDocument();
  });

  it('shows proper color coding for different metrics', () => {
    render(<DashboardStats />);

    // Each statistic should have a different color
    expect(document.querySelector('.bg-blue-500')).toBeInTheDocument();
    expect(document.querySelector('.bg-yellow-500')).toBeInTheDocument();
    expect(document.querySelector('.bg-purple-500')).toBeInTheDocument();
    expect(document.querySelector('.bg-green-500')).toBeInTheDocument();
  });

  it('renders trend icons correctly', () => {
    render(<DashboardStats />);

    // Should have trending icons (up/down)
    const trendIcons = document.querySelectorAll('.text-green-500, .text-red-500, .text-gray-600');
    expect(trendIcons.length).toBeGreaterThan(0);
  });
});