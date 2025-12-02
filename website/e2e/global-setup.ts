import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

async function globalSetup(config: FullConfig) {
  // Global setup for E2E tests
  console.log('🎭 Starting Playwright E2E Test Suite');
  console.log('📊 Testing SNU Connectome Fellows Program Website');

  // Load test environment variables from .env.test
  const envPath = path.join(process.cwd(), '.env.test');
  dotenv.config({ path: envPath });

  // Ensure required NextAuth environment variables are set
  if (!process.env.NEXTAUTH_SECRET) {
    process.env.NEXTAUTH_SECRET = 'test-secret-key-for-playwright-testing-environment-minimum-32-characters';
  }
  if (!process.env.NEXTAUTH_URL) {
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
  }

  // Set other test-specific environment variables
  process.env.NEXT_PUBLIC_APP_ENV = 'test';
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

  // Log test configuration
  console.log('✅ Test environment configured');
  console.log(`🌐 Base URL: ${process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'}`);
  console.log(`🔐 NextAuth Secret: ${process.env.NEXTAUTH_SECRET ? 'Set' : 'Not Set'}`);
  console.log(`🌍 NextAuth URL: ${process.env.NEXTAUTH_URL}`);
}

export default globalSetup;