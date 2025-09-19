import { test, expect } from '@playwright/test';

test.describe('Members Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to members page
    await page.goto('/members');
  });

  test('should display members page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Government Data Buddy/);

    // Check header content
    await expect(page.locator('page-header')).toBeVisible();
    await expect(page.locator('page-header')).toContainText('Members of Congress');

    // Check search filters are present
    await expect(page.locator('mat-form-field').filter({ hasText: 'Search Members' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'State' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'Party' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'Chamber' })).toBeVisible();

    // Take screenshot
    await page.screenshot({ path: 'e2e/screenshots/members-page-initial.png', fullPage: true });
  });

  test('should handle search input', async ({ page }) => {
    // Type in search field
    const searchInput = page.locator('input[placeholder*="Search by name"]');
    await searchInput.fill('Pelosi');

    // Wait for any debouncing
    await page.waitForTimeout(600);

    // Check URL contains search parameter
    await expect(page).toHaveURL(/.*search=Pelosi.*/);

    // Take screenshot of search results
    await page.screenshot({ path: 'e2e/screenshots/members-page-search.png', fullPage: true });
  });

  test('should handle filter selections', async ({ page }) => {
    // Select party filter
    await page.locator('mat-select').filter({ hasText: 'Party' }).click();
    await page.locator('mat-option').filter({ hasText: 'Democrat' }).click();

    // Wait for debouncing
    await page.waitForTimeout(600);

    // Check URL contains party parameter
    await expect(page).toHaveURL(/.*party=D.*/);

    // Select state filter
    await page.locator('mat-select').filter({ hasText: 'State' }).click();
    await page.locator('mat-option').filter({ hasText: 'California' }).click();

    // Wait for debouncing
    await page.waitForTimeout(600);

    // Check URL contains both parameters
    await expect(page).toHaveURL(/.*party=D.*/);
    await expect(page).toHaveURL(/.*state=CA.*/);

    // Take screenshot of filtered results
    await page.screenshot({ path: 'e2e/screenshots/members-page-filters.png', fullPage: true });
  });

  test('should handle responsive design on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that filters are still accessible
    await expect(page.locator('mat-form-field').filter({ hasText: 'Search Members' })).toBeVisible();

    // Take mobile screenshot
    await page.screenshot({ path: 'e2e/screenshots/members-page-mobile.png', fullPage: true });
  });

  test('should navigate to member profile', async ({ page }) => {
    // Wait for members to load
    await page.waitForTimeout(1000);

    // Click on first member card (if available)
    const memberCard = page.locator('mat-card').first();
    if (await memberCard.isVisible()) {
      await memberCard.click();

      // Should navigate to member profile
      await expect(page).toHaveURL(/.*\/members\/.*/);

      // Check profile page elements
      await expect(page.locator('page-header')).toContainText('Member Profile');

      // Take screenshot of profile page
      await page.screenshot({ path: 'e2e/screenshots/member-profile-page.png', fullPage: true });
    }
  });

  test('should handle URL with query parameters', async ({ page }) => {
    // Navigate with query parameters
    await page.goto('/members?search=Pelosi&party=D&state=CA');

    // Check that form fields are populated
    const searchInput = page.locator('input[placeholder*="Search by name"]');
    await expect(searchInput).toHaveValue('Pelosi');

    // Take screenshot of pre-populated form
    await page.screenshot({ path: 'e2e/screenshots/members-page-url-params.png', fullPage: true });
  });

  test('should handle browser navigation', async ({ page }) => {
    // Perform a search
    const searchInput = page.locator('input[placeholder*="Search by name"]');
    await searchInput.fill('Smith');
    await page.waitForTimeout(600);

    // Go back
    await page.goBack();

    // Check that we're back to initial state
    await expect(page).toHaveURL('/members');

    // Go forward
    await page.goForward();

    // Check that search is restored
    await expect(page).toHaveURL(/.*search=Smith.*/);
  });
});
