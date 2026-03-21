import { test, expect } from '@playwright/test';

test.describe('Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('loads without errors', async ({ page }) => {
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('body')).not.toContainText('Application error');
  });

  test('renders the Button showcase section', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Secondary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Danger' })).toBeVisible();
  });

  test('renders the Toggle section with labels', async ({ page }) => {
    await expect(page.getByText('Off')).toBeVisible();
    await expect(page.getByText('On')).toBeVisible();
  });

  test('toggle changes state when clicked', async ({ page }) => {
    const checkbox = page.getByRole('checkbox').first();
    const initialChecked = await checkbox.isChecked();
    await checkbox.click();
    expect(await checkbox.isChecked()).toBe(!initialChecked);
  });

  test('Accordion expands on click', async ({ page }) => {
    const accordionButton = page.getByRole('button', {
      name: /click to expand/i,
    });
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'false');
    await accordionButton.click();
    await expect(accordionButton).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Content inside accordion')).toBeVisible();
  });

  test('Modal opens and closes', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Modal Title')).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).first().click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('Modal closes with Escape key', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('Tabs switch active tab on click', async ({ page }) => {
    const tab2 = page.getByRole('button', { name: 'Tab 2' });
    await tab2.click();
    await expect(tab2).toBeVisible();
  });
});
