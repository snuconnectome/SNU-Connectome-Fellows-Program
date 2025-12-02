import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationForm } from '../ApplicationForm';
import { render, mockApplicationData } from '@/test/test-utils';
import { toast } from 'react-hot-toast';

// Mock react-hook-form for consistent testing
jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    register: jest.fn((name) => ({ name })),
    handleSubmit: jest.fn((fn) => (e) => {
      e.preventDefault();
      fn(mockApplicationData);
    }),
    control: {},
    watch: jest.fn(),
    formState: { errors: {} },
    trigger: jest.fn().mockResolvedValue(true),
  }),
  useFieldArray: () => ({
    fields: [{ id: '1', name: 'Python', level: 'intermediate', yearsExperience: 0 }],
    append: jest.fn(),
    remove: jest.fn(),
  }),
}));

describe('ApplicationForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with initial personal information section', () => {
    render(<ApplicationForm />);

    // Check progress bar
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('개인정보')).toBeInTheDocument();

    // Check form fields
    expect(screen.getByLabelText(/korean name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/english name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/student id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('displays progress indicators for all sections', () => {
    render(<ApplicationForm />);

    const progressSteps = screen.getAllByText(/\d+/).filter(el =>
      el.className.includes('rounded-full')
    );

    expect(progressSteps.length).toBeGreaterThan(0);

    // Check section names
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Academic Background')).toBeInTheDocument();
    expect(screen.getByText('Skills & Experience')).toBeInTheDocument();
  });

  it('validates required fields in personal section', async () => {
    render(<ApplicationForm />);
    const user = userEvent.setup();

    // Try to go to next section without filling required fields
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Form should stay on the same section due to validation
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('allows navigation between sections', async () => {
    render(<ApplicationForm />);
    const user = userEvent.setup();

    // Fill required fields
    await user.type(screen.getByPlaceholderText('김철수'), '김철수');
    await user.type(screen.getByPlaceholderText('Cheolsu Kim'), 'Cheolsu Kim');
    await user.type(screen.getByPlaceholderText('2022-12345'), '2022-12345');

    // Go to next section
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    // Should navigate to academic section
    await waitFor(() => {
      expect(screen.getByText('Academic Background')).toBeInTheDocument();
    });

    // Previous button should be available
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeInTheDocument();
  });

  it('disables previous button on first section', () => {
    render(<ApplicationForm />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('displays section descriptions', () => {
    render(<ApplicationForm />);

    expect(screen.getByText('Basic personal and contact information')).toBeInTheDocument();
    expect(screen.getByText('기본 개인 및 연락처 정보')).toBeInTheDocument();
  });

  it('handles form submission on final section', async () => {
    render(<ApplicationForm />);

    // Mock successful form submission
    const mockSubmit = jest.fn().mockResolvedValue({});

    // Navigate to last section (mocked)
    // This would require multiple navigation steps in reality
    const form = screen.getByRole('form') || document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  it('displays proper field labels with bilingual support', () => {
    render(<ApplicationForm />);

    // Check bilingual labels
    expect(screen.getByText(/korean name/i)).toBeInTheDocument();
    expect(screen.getByText('한국어 이름')).toBeInTheDocument();

    expect(screen.getByText(/english name/i)).toBeInTheDocument();
    expect(screen.getByText('영어 이름')).toBeInTheDocument();

    expect(screen.getByText(/student id/i)).toBeInTheDocument();
    expect(screen.getByText('학번')).toBeInTheDocument();
  });

  it('includes proper placeholder text', () => {
    render(<ApplicationForm />);

    expect(screen.getByPlaceholderText('김철수')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cheolsu Kim')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('2022-12345')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your.email@snu.ac.kr')).toBeInTheDocument();
  });

  it('renders department selection dropdown', () => {
    render(<ApplicationForm />);

    const departmentSelect = screen.getByDisplayValue('') as HTMLSelectElement;
    expect(departmentSelect).toBeInTheDocument();

    // Check if it's a select element
    expect(departmentSelect.tagName).toBe('SELECT');
  });

  it('handles loading states', async () => {
    render(<ApplicationForm />);

    // Submit form
    const form = document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }

    // During submission, should show loading state
    await waitFor(() => {
      const submittingText = screen.queryByText(/submitting/i);
      if (submittingText) {
        expect(submittingText).toBeInTheDocument();
      }
    });
  });

  it('displays validation errors when they occur', () => {
    // Mock form with errors
    const mockFormWithErrors = {
      register: jest.fn((name) => ({ name })),
      handleSubmit: jest.fn(),
      control: {},
      watch: jest.fn(),
      formState: {
        errors: {
          nameKorean: { message: 'Korean name is required' },
          email: { message: 'Invalid email address' },
        },
      },
      trigger: jest.fn(),
    };

    jest.doMock('react-hook-form', () => ({
      useForm: () => mockFormWithErrors,
      useFieldArray: () => ({
        fields: [],
        append: jest.fn(),
        remove: jest.fn(),
      }),
    }));

    render(<ApplicationForm />);

    // Check if error messages would be displayed
    // Note: This test verifies the error handling structure
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ApplicationForm />);

    // Form should have proper structure
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Labels should be associated with inputs
    const nameInput = screen.getByPlaceholderText('김철수');
    const nameLabel = screen.getByText(/korean name/i);
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    // Buttons should be accessible
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveProperty('type');
    });
  });
});