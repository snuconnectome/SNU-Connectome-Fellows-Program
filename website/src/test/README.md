# Test Suite Documentation

This directory contains the comprehensive test suite for the SNU Connectome Fellows Program website, implementing Test-Driven Development (TDD) practices.

## 🧪 Testing Strategy

### Coverage Goals
- **Unit Tests**: 70%+ coverage for components and utilities
- **Integration Tests**: Form workflows and API interactions
- **E2E Tests**: Critical user journeys and accessibility
- **Security Tests**: Authentication and authorization flows

### Testing Pyramid
```
    /\     E2E Tests (Playwright)
   /  \    - Critical user journeys
  /____\   - Cross-browser compatibility
 /      \  - Mobile responsiveness
/__________\

    /\     Integration Tests
   /  \    - Component interactions
  /____\   - Form submissions
 /      \  - API integrations
/__________\

    /\     Unit Tests (Jest + RTL)
   /  \    - Component rendering
  /____\   - User interactions
 /      \  - Business logic
/__________\ - Utility functions
```

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)
- **Test Environment**: jsdom for React components
- **Coverage Thresholds**: 70% minimum across all metrics
- **Module Mapping**: Path aliases for clean imports
- **Setup Files**: Automated mocking and utilities

### Playwright Configuration (`playwright.config.ts`)
- **Multi-Browser**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS and Android viewports
- **Visual Regression**: Screenshot comparisons
- **Performance**: Core Web Vitals monitoring

## 📁 Test Structure

```
src/test/
├── jest.setup.js           # Jest configuration and global mocks
├── test-utils.tsx          # Custom render functions and utilities
└── README.md              # This documentation

src/components/
├── **/__tests__/           # Component unit tests
│   ├── Hero.test.tsx
│   ├── ApplicationForm.test.tsx
│   └── DashboardStats.test.tsx

src/app/api/
├── **/__tests__/           # API route tests
│   └── auth.test.ts

e2e/
├── homepage.spec.ts        # Homepage E2E tests
├── application.spec.ts     # Application flow tests
├── admin.spec.ts          # Admin dashboard tests
└── global-setup.ts        # Playwright setup
```

## 🚀 Running Tests

### Unit Tests (Jest + React Testing Library)
```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm run test Hero.test.tsx
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run tests in specific browser
npm run test:e2e -- --project=chromium

# Run tests in headed mode (visible browser)
npm run test:e2e -- --headed

# Debug specific test
npm run test:e2e -- --debug homepage.spec.ts
```

### Type Checking
```bash
# Verify TypeScript types
npm run type-check
```

## 🎯 Test Categories

### 1. Component Tests
**Location**: `src/components/**/__tests__/`

**Purpose**: Verify component rendering, props handling, user interactions
```tsx
// Example: Hero.test.tsx
describe('Hero Component', () => {
  it('renders hero section with main headings', () => {
    render(<Hero />);
    expect(screen.getByText('Foundations of Neural Intelligence')).toBeInTheDocument();
  });
});
```

### 2. Form Tests
**Location**: `src/components/forms/__tests__/`

**Purpose**: Validate form behavior, validation, submission
```tsx
// Example: ApplicationForm.test.tsx
describe('ApplicationForm', () => {
  it('validates required fields', async () => {
    render(<ApplicationForm />);
    // Test validation logic
  });
});
```

### 3. API Tests
**Location**: `src/app/api/**/__tests__/`

**Purpose**: Test API endpoints, authentication, error handling
```ts
// Example: auth.test.ts
describe('Authentication API', () => {
  it('handles login requests', async () => {
    // Test API functionality
  });
});
```

### 4. E2E Tests
**Location**: `e2e/`

**Purpose**: Test complete user workflows, cross-browser compatibility
```ts
// Example: homepage.spec.ts
test('should navigate to application page', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="apply-button"]');
  await expect(page).toHaveURL('/apply');
});
```

## 🛠️ Testing Utilities

### Custom Render Function
```tsx
import { renderWithProviders } from '@/test/test-utils';

// Renders component with all necessary providers
renderWithProviders(<Component />, {
  session: mockSessions.admin,
  queryClient: testQueryClient,
});
```

### Mock Data
```tsx
import { mockApplicationData, mockFellowData } from '@/test/test-utils';

// Pre-configured mock data for consistent testing
const application = mockApplicationData;
const fellow = mockFellowData;
```

### Session Mocking
```tsx
import { mockSessions } from '@/test/test-utils';

// Test with different user roles
render(<AdminDashboard />, { session: mockSessions.admin });
render(<MentorPortal />, { session: mockSessions.mentor });
render(<FellowDashboard />, { session: mockSessions.fellow });
```

## 📊 Coverage Requirements

### Minimum Coverage Thresholds
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Critical Components (90%+ Coverage Required)
- Authentication flows
- Form validation and submission
- Admin dashboard functionality
- Payment and budget calculations

### Excluded from Coverage
- Configuration files
- Test utilities
- Story files
- Type definitions
- Layout components (loading, error, not-found)

## 🔍 Test Examples

### Component Testing Pattern
```tsx
describe('ComponentName', () => {
  // Rendering tests
  it('renders correctly with props', () => {});

  // Interaction tests
  it('handles user interactions', async () => {});

  // Accessibility tests
  it('has proper accessibility attributes', () => {});

  // Bilingual content tests
  it('displays Korean and English content', () => {});
});
```

### E2E Testing Pattern
```ts
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for each test
  });

  test('happy path workflow', async ({ page }) => {
    // Test main user journey
  });

  test('error handling', async ({ page }) => {
    // Test error scenarios
  });

  test('mobile responsiveness', async ({ page }) => {
    // Test on mobile viewport
  });
});
```

## 🚨 Common Testing Patterns

### 1. Form Testing
```tsx
// Fill form and submit
await user.type(screen.getByLabelText(/name/i), 'Test Name');
await user.click(screen.getByRole('button', { name: /submit/i }));
await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
```

### 2. Authentication Testing
```tsx
// Test protected routes
render(<ProtectedComponent />, { session: mockSessions.admin });
expect(screen.getByText('Admin Panel')).toBeInTheDocument();
```

### 3. API Testing
```ts
// Mock API responses
const mockFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ success: true }),
});
global.fetch = mockFetch;
```

## 📈 Quality Metrics

### Test Quality Indicators
- **Test Coverage**: >70% across all categories
- **Test Speed**: Unit tests <1s, E2E tests <30s
- **Flakiness**: <1% test failure rate
- **Maintenance**: Regular updates with feature changes

### Performance Testing
- **Core Web Vitals**: Monitored in E2E tests
- **Bundle Size**: Tracked in CI/CD pipeline
- **Accessibility**: WCAG 2.1 AA compliance verified

## 🎯 Best Practices

### 1. Test Organization
- Group related tests in describe blocks
- Use clear, descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

### 2. Mock Strategy
- Mock external dependencies
- Use real implementations for internal logic
- Provide meaningful mock data

### 3. Accessibility Testing
- Test with screen readers (simulated)
- Verify ARIA labels and roles
- Check keyboard navigation

### 4. Bilingual Testing
- Test both English and Korean content
- Verify proper font loading
- Check text overflow and wrapping

## 🔧 Maintenance

### Regular Tasks
- **Weekly**: Review test coverage reports
- **Monthly**: Update mock data and dependencies
- **Quarterly**: Performance and accessibility audits
- **Per Release**: Full regression test suite

### Debugging Tests
```bash
# Debug Jest tests
node --inspect-brk node_modules/.bin/jest --runInBand

# Debug Playwright tests
npx playwright test --debug

# Visual comparison updates
npx playwright test --update-snapshots
```

---

This comprehensive test suite ensures the SNU Connectome Fellows Program website maintains high quality, accessibility, and reliability across all user journeys and device types.