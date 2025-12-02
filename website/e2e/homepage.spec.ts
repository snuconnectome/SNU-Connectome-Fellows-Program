import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main navigation', async ({ page }) => {
    // Check main logo and navigation
    await expect(page.getByText('Connectome Fellows')).toBeVisible();
    await expect(page.getByText('서울대학교 커넥톰 펠로우십')).toBeVisible();

    // Check navigation items
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /program/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /research/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /people/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /apply/i })).toBeVisible();
  });

  test('should display hero section with key information', async ({ page }) => {
    // Check main headings
    await expect(page.getByText('Foundations of Neural Intelligence')).toBeVisible();
    await expect(page.getByText('인류 천년의 공헌을 위한')).toBeVisible();
    await expect(page.getByText('차세대 신경과학 인재 양성')).toBeVisible();

    // Check key statistics
    await expect(page.getByText('₩36.2M')).toBeVisible();
    await expect(page.getByText('per fellow')).toBeVisible();
    await expect(page.getByText('Top 0.001%')).toBeVisible();
    await expect(page.getByText('global talent')).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /apply now/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /learn more/i })).toBeVisible();
  });

  test('should display program overview section', async ({ page }) => {
    await page.getByText('Program Excellence').scrollIntoViewIfNeeded();

    await expect(page.getByText('Program Excellence')).toBeVisible();
    await expect(page.getByText('최고 수준의 지원과 세계적 멘토링을 통해')).toBeVisible();

    // Check feature cards
    await expect(page.getByText('Comprehensive Support')).toBeVisible();
    await expect(page.getByText('포괄적 지원')).toBeVisible();
    await expect(page.getByText('World-Class Mentorship')).toBeVisible();
    await expect(page.getByText('세계적 멘토링')).toBeVisible();
  });

  test('should display program statistics', async ({ page }) => {
    await page.getByText('Program by the Numbers').scrollIntoViewIfNeeded();

    await expect(page.getByText('Program by the Numbers')).toBeVisible();
    await expect(page.getByText('숫자로 보는 프로그램의 탁월함')).toBeVisible();

    // Check specific statistics
    await expect(page.getByText('Annual Investment')).toBeVisible();
    await expect(page.getByText('Elite Selection')).toBeVisible();
    await expect(page.getByText('International Network')).toBeVisible();
  });

  test('should navigate to application page', async ({ page }) => {
    await page.getByRole('link', { name: /apply now/i }).first().click();
    await expect(page).toHaveURL('/apply');
    await expect(page.getByText('Begin Your Journey')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check mobile navigation
    await expect(page.getByRole('button', { name: /open main menu/i })).toBeVisible();

    // Check that content is still accessible
    await expect(page.getByText('Foundations of')).toBeVisible();
    await expect(page.getByText('Neural Intelligence')).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    await page.getByText('© 2025 Seoul National University').scrollIntoViewIfNeeded();

    // Check footer content
    await expect(page.getByText('Connectome Fellows')).toBeVisible();
    await expect(page.getByText('서울대학교 커넥톰 펠로우십')).toBeVisible();

    // Check footer links
    await expect(page.getByRole('link', { name: /privacy policy/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /terms of service/i })).toBeVisible();
  });

  test('should display research highlights', async ({ page }) => {
    await page.getByText('Research Focus').scrollIntoViewIfNeeded();

    await expect(page.getByText('Research Focus')).toBeVisible();
    await expect(page.getByText('최첨단 신경과학 Foundation Model 연구')).toBeVisible();

    // Check research areas
    await expect(page.getByText('BrainLM')).toBeVisible();
    await expect(page.getByText('Brain-JEPA')).toBeVisible();
    await expect(page.getByText('Brain Harmony')).toBeVisible();
  });

  test('should display mentor network', async ({ page }) => {
    await page.getByText('World-Class Mentors').scrollIntoViewIfNeeded();

    await expect(page.getByText('World-Class Mentors')).toBeVisible();
    await expect(page.getByText('세계적 수준의 멘토들과 함께하는 연구 여정')).toBeVisible();

    // Check mentor information
    await expect(page.getByText('유신재 교수')).toBeVisible();
    await expect(page.getByText('Brookhaven National Laboratory')).toBeVisible();
    await expect(page.getByText('Uri Hasson')).toBeVisible();
    await expect(page.getByText('Princeton University')).toBeVisible();
  });

  test('should have proper page title and meta tags', async ({ page }) => {
    await expect(page).toHaveTitle(/SNU Connectome Fellows Program/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /차세대 신경과학 인재 양성/);
  });
});