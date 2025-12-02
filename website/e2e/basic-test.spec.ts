/**
 * Basic Website Test
 * ==================
 *
 * Simple test to verify the website loads and basic functionality works
 */

import { test, expect } from '@playwright/test';

test.describe('Basic Website Functionality', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if page title is correct
    await expect(page).toHaveTitle(/SNU Connectome Fellows/);

    // Check if main content is visible
    await expect(page.locator('main')).toBeVisible();

    // Take a screenshot for verification
    await page.screenshot({ path: 'test-results/homepage.png' });
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if navigation exists
    await expect(page.locator('nav')).toBeVisible();

    // Check if program overview section exists
    await expect(page.locator('text=Program Overview')).toBeVisible();
  });
});