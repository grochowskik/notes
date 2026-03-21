import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';
import { renderWithProviders } from '@/tests/utils/render';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/',
}));

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText('Adres Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Hasło')).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    renderWithProviders(<LoginForm />);
    expect(
      screen.getByRole('button', { name: 'Zaloguj się' }),
    ).toBeInTheDocument();
  });

  it('shows required-field errors when form is submitted empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'Zaloguj się' }));

    await waitFor(() => {
      expect(screen.getByText('Email jest wymagany')).toBeInTheDocument();
    });
  });

  it('shows invalid email error for malformed email', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText('Adres Email'), 'not-an-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Niepoprawny format email')).toBeInTheDocument();
    });
  });

  it('shows password strength error when password is too short', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByLabelText('Hasło'), 'short');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText('Hasło musi mieć minimum 8 znaków'),
      ).toBeInTheDocument();
    });
  });

  it('password input has type="password"', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText('Hasło')).toHaveAttribute('type', 'password');
  });

  it('email input has type="email"', () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByLabelText('Adres Email')).toHaveAttribute(
      'type',
      'email',
    );
  });
});
