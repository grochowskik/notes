import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page).not.toHaveTitle('');
  });

  test('has a link or button pointing to /dashboard', async ({ page }) => {
    await page.goto('/');
    const dashboardLink = page.getByRole('link', { name: /dashboard/i }).or(
      page.getByRole('button', { name: /dashboard/i }),
    );
    await expect(dashboardLink).toBeVisible();
  });

  test('navigates to /dashboard when dashboard link is clicked', async ({ page }) => {
    await page.goto('/');
    const dashboardLink = page.getByRole('link', { name: /dashboard/i }).or(
      page.getByRole('button', { name: /dashboard/i }),
    );
    await dashboardLink.click();
    await expect(page).toHaveURL('/dashboard');
  });
});
