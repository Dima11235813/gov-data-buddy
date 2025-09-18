import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');

    // Take a screenshot for visual regression testing
    await page.screenshot({
      path: 'e2e/screenshots/home-page-current.png',
      fullPage: true
    });

    // Verify the main heading is present
    await expect(page.locator('h1').filter({ hasText: 'Government Data Buddy' })).toBeVisible();

    // Verify the subtitle is present
    await expect(page.locator('p').filter({ hasText: 'Your comprehensive companion for understanding and tracking United States congressional activities' })).toBeVisible();

    // Verify navigation buttons are present
    await expect(page.locator('button').filter({ hasText: 'Explore Bills' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Browse Committees' })).toBeVisible();

    // Verify features section is present
    await expect(page.locator('h2').filter({ hasText: 'What You Can Do' })).toBeVisible();

    // Verify mission section is present
    await expect(page.locator('h2').filter({ hasText: 'Our Mission' })).toBeVisible();

    // Verify call-to-action section is present
    await expect(page.locator('h2').filter({ hasText: 'Ready to Explore?' })).toBeVisible();
  });

  test('should navigate to bills page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click the "Explore Bills" button
    await page.locator('button').filter({ hasText: 'Explore Bills' }).click();

    // Verify navigation to bills page
    await expect(page).toHaveURL(/.*bills/);
  });

  test('should navigate to committee page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click the "Browse Committees" button
    await page.locator('button').filter({ hasText: 'Browse Committees' }).click();

    // Verify navigation to committee page
    await expect(page).toHaveURL(/.*committee/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Take mobile screenshot
    await page.screenshot({
      path: 'e2e/screenshots/home-page-mobile.png',
      fullPage: true
    });

    // Verify elements are still visible on mobile
    await expect(page.locator('h1').filter({ hasText: 'Government Data Buddy' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Explore Bills' })).toBeVisible();
  });
});
