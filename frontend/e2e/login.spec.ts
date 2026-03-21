import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('displays the email and password fields', async ({ page }) => {
    await expect(page.getByLabel('Adres Email')).toBeVisible();
    await expect(page.getByLabel('Hasło')).toBeVisible();
  });

  test('displays the submit button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Zaloguj się' }),
    ).toBeVisible();
  });

  test('shows validation errors when submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await expect(page.getByText('Email jest wymagany')).toBeVisible();
  });

  test('shows invalid email error for malformed email', async ({ page }) => {
    await page.getByLabel('Adres Email').fill('not-an-email');
    await page.getByLabel('Hasło').click();
    await expect(page.getByText('Niepoprawny format email')).toBeVisible();
  });

  test('shows password length error for short password', async ({ page }) => {
    await page.getByLabel('Hasło').fill('short');
    await page.getByLabel('Adres Email').click();
    await expect(
      page.getByText('Hasło musi mieć minimum 8 znaków'),
    ).toBeVisible();
  });

  test('navigates to /dashboard on successful login', async ({ page }) => {
    await page.getByLabel('Adres Email').fill('user@example.com');
    await page.getByLabel('Hasło').fill('ValidPass1!');
    await page.getByRole('button', { name: 'Zaloguj się' }).click();
    await expect(page).toHaveURL('/dashboard');
  });
});
