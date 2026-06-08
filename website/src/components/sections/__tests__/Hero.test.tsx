import { screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { render } from '@/test/test-utils';

describe('Hero Component (2026 mission-aligned)', () => {
  it('renders main headline', () => {
    render(<Hero />);
    expect(screen.getByText('Foundations of')).toBeInTheDocument();
    expect(screen.getByText('Neural Intelligence')).toBeInTheDocument();
  });

  it('renders mission-aligned Korean subhead', () => {
    render(<Hero />);
    expect(screen.getByText(/꿈은 구체적으로/)).toBeInTheDocument();
    expect(screen.getByText(/분야는 두 개 이상/)).toBeInTheDocument();
  });

  it('renders 2026 cohort badge', () => {
    render(<Hero />);
    expect(screen.getByText('2026 Cohort — Applications Open · Jun 15 Deadline')).toBeInTheDocument();
    expect(screen.getByText('2026년 모집 — 지원 접수 중 · 6월 15일 마감')).toBeInTheDocument();
  });

  it('renders anti-resume description (KR & EN)', () => {
    render(<Hero />);
    expect(screen.getByText(/We don't evaluate you on your resume/)).toBeInTheDocument();
    expect(screen.getByText(/저희는 이력서로 평가하지 않습니다/)).toBeInTheDocument();
  });

  it('renders cohort stats with PI direct time', () => {
    render(<Hero />);
    expect(screen.getByText('DGX Spark')).toBeInTheDocument();
    expect(screen.getByText('1:1')).toBeInTheDocument();
    expect(screen.getByText('PI Direct Time')).toBeInTheDocument();
  });

  it('does NOT contain mission-misaligned legacy copy', () => {
    render(<Hero />);
    expect(screen.queryByText(/Top 0\.001%/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Elite Program/)).not.toBeInTheDocument();
    expect(screen.queryByText(/0\.001%/)).not.toBeInTheDocument();
  });

  it('includes Apply Now CTA pointing to /apply', () => {
    render(<Hero />);
    const applyButton = screen.getByRole('link', { name: /apply now/i });
    expect(applyButton).toHaveAttribute('href', '/apply');
  });
});
