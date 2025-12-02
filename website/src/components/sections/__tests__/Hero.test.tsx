import { screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { render } from '@/test/test-utils';

describe('Hero Component', () => {
  it('renders hero section with main headings', () => {
    render(<Hero />);

    // Check for main English heading
    expect(screen.getByText('Foundations of')).toBeInTheDocument();
    expect(screen.getByText('Neural Intelligence')).toBeInTheDocument();

    // Check for Korean heading
    expect(screen.getByText('인류 천년의 공헌을 위한')).toBeInTheDocument();
    expect(screen.getByText('차세대 신경과학 인재 양성')).toBeInTheDocument();
  });

  it('displays key statistics', () => {
    render(<Hero />);

    // Check for investment amount
    expect(screen.getByText('₩36.2M')).toBeInTheDocument();
    expect(screen.getByText('per fellow')).toBeInTheDocument();

    // Check for elite program indicator
    expect(screen.getByText('Top 0.001%')).toBeInTheDocument();
    expect(screen.getByText('global talent')).toBeInTheDocument();

    // Check for international network
    expect(screen.getByText('4+')).toBeInTheDocument();
    expect(screen.getByText('top universities')).toBeInTheDocument();
  });

  it('includes call-to-action buttons', () => {
    render(<Hero />);

    const applyButton = screen.getByRole('link', { name: /apply now/i });
    const learnMoreButton = screen.getByRole('link', { name: /learn more/i });

    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute('href', '/apply');

    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute('href', '/program');
  });

  it('displays program badge with application status', () => {
    render(<Hero />);

    expect(screen.getByText('Now Accepting Applications')).toBeInTheDocument();
    expect(screen.getByText('지원 모집 중')).toBeInTheDocument();
  });

  it('includes scroll indicator', () => {
    render(<Hero />);

    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
    expect(screen.getByText('스크롤하여 탐색')).toBeInTheDocument();
  });

  it('renders all statistics with proper structure', () => {
    render(<Hero />);

    // Check that all stat cards are rendered
    const statCards = screen.getAllByRole('generic').filter(el =>
      el.className.includes('card-featured')
    );

    expect(statCards).toHaveLength(4);
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);

    // Hero section should be accessible
    const heroSection = screen.getByRole('generic');
    expect(heroSection).toBeInTheDocument();

    // CTA buttons should be accessible
    const buttons = screen.getAllByRole('link');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('href');
    });
  });

  it('displays bilingual content correctly', () => {
    render(<Hero />);

    // Check that Korean content has proper class
    const koreanElements = document.querySelectorAll('.korean');
    expect(koreanElements.length).toBeGreaterThan(0);

    // Verify specific bilingual pairs
    expect(screen.getByText('Apply Now')).toBeInTheDocument();
    expect(screen.getByText('지원하기')).toBeInTheDocument();

    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('더 알아보기')).toBeInTheDocument();
  });

  it('renders gradient text elements', () => {
    render(<Hero />);

    // Check for gradient text classes
    const gradientElements = document.querySelectorAll('.gradient-text, .gradient-text-accent');
    expect(gradientElements.length).toBeGreaterThan(0);
  });

  it('includes program description', () => {
    render(<Hero />);

    expect(screen.getByText(/Training the next generation of neuroscience leaders/)).toBeInTheDocument();
    expect(screen.getByText(/최첨단 Foundation Model 연구/)).toBeInTheDocument();
  });
});