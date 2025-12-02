import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

// Create a custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  session?: Session | null;
  queryClient?: QueryClient;
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    session = null,
    queryClient,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const testQueryClient = queryClient || createTestQueryClient();

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SessionProvider session={session}>
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock session data for different user types
export const mockSessions = {
  admin: {
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@snu.ac.kr',
      role: 'admin',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  } as Session,

  mentor: {
    user: {
      id: '2',
      name: 'Mentor User',
      email: 'mentor@snu.ac.kr',
      role: 'mentor',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  } as Session,

  fellow: {
    user: {
      id: '3',
      name: 'Fellow User',
      email: 'fellow@snu.ac.kr',
      role: 'fellow',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  } as Session,

  applicant: {
    user: {
      id: '4',
      name: 'Student User',
      email: 'student@snu.ac.kr',
      role: 'applicant',
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  } as Session,
};

// Mock application data for testing
export const mockApplicationData = {
  nameKorean: '김철수',
  nameEnglish: 'Cheolsu Kim',
  studentId: '2022-12345',
  email: 'cheolsu@snu.ac.kr',
  phone: '010-1234-5678',
  department: '전기정보공학부',
  year: 3,
  gpaOverall: 4.1,
  gpaMajor: 4.3,
  programmingSkills: [
    { name: 'Python', level: 'advanced', yearsExperience: 2 }
  ],
  mlSkills: [
    { name: 'PyTorch', level: 'intermediate', yearsExperience: 1 }
  ],
  neuroTools: [],
  researchInterests: [
    { area: 'Brain Foundation Models', description: 'Interest in BrainLM research', priority: 1 }
  ],
  motivationStatement: 'I am passionate about neuroscience and AI research...',
  researchProposal: 'I propose to work on brain foundation models...',
  longTermVision: 'I aim to contribute to the advancement of neuroscience...',
  relevantCourses: [
    { name: 'Machine Learning', grade: 'A+', credits: 3 }
  ],
  references: [
    {
      name: 'Professor Kim',
      position: 'Professor',
      institution: 'Seoul National University',
      email: 'prof.kim@snu.ac.kr',
      relationship: 'Course instructor'
    }
  ],
  publications: [],
  githubUrl: 'https://github.com/cheolsu',
  portfolioUrl: 'https://cheolsu.dev',
  englishScore: 'TOEFL 105',
};

// Mock fellow data
export const mockFellowData = {
  id: 'F2025-001',
  application: mockApplicationData,
  status: 'active',
  cohort: 2025,
  startDate: '2025-03-01',
  expectedGraduation: '2027-02-28',
  primaryMentor: 'mentor-1',
  researchProject: 'BrainLM Foundation Model',
  researchArea: 'Neuroscience Foundation Models',
  monthlyStipend: 2000000,
  aiBudgetUsd: 500,
  evaluations: [],
  publications: ['Paper 1', 'Paper 2'],
  presentations: ['Conference A', 'Conference B'],
  conferencesAttended: ['NeurIPS 2024'],
  overseasVisits: [],
  dgxSparkAssigned: true,
  cloudCreditsUsd: 1000,
};

// Form testing helpers
export function fillForm(container: HTMLElement, data: Record<string, any>) {
  Object.entries(data).forEach(([key, value]) => {
    const input = container.querySelector(`[name="${key}"]`) as HTMLInputElement;
    if (input) {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = Boolean(value);
      } else {
        input.value = String(value);
      }
    }
  });
}

// Wait for async operations in tests
export function waitForAsync(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Custom matchers for better testing
expect.extend({
  toHaveFormValues(received: HTMLElement, expected: Record<string, any>) {
    const pass = Object.entries(expected).every(([name, value]) => {
      const input = received.querySelector(`[name="${name}"]`) as HTMLInputElement;
      return input && input.value === String(value);
    });

    return {
      message: () =>
        pass
          ? `Expected form not to have values ${JSON.stringify(expected)}`
          : `Expected form to have values ${JSON.stringify(expected)}`,
      pass,
    };
  },
});

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { renderWithProviders as render };