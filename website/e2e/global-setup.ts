import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Global setup for E2E tests
  console.log('🎭 Starting Playwright E2E Test Suite');
  console.log('📊 Testing SNU Connectome Fellows Program Website');

  // Setup test database or mock services if needed
  // For now, we'll use the default development setup

  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
  process.env.NEXTAUTH_SECRET = 'test-secret';
  process.env.NEXTAUTH_URL = 'http://localhost:3000';

  // Log test configuration
  console.log('✅ Test environment configured');
  console.log(`🌐 Base URL: ${process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'}`);
}

export default globalSetup;