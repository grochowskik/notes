import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import FormInput from '../FormInput';

function Wrapper({
  name = 'email',
  label = 'Email',
  defaultValues = {},
}: {
  name?: string;
  label?: string;
  defaultValues?: Record<string, string>;
}) {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <FormInput name={name} label={label} />
    </FormProvider>
  );
}

describe('FormInput', () => {
  it('renders a label with the given text', () => {
    render(<Wrapper name="username" label="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<Wrapper name="email" label="Email" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates the label with the input via htmlFor/id', () => {
    render(<Wrapper name="email" label="Email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'email');
    expect(screen.getByText('Email').closest('label')).toHaveAttribute(
      'for',
      'email'
    );
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Wrapper name="email" label="Email" />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  it('has no aria-invalid attribute by default (no error)', () => {
    render(<Wrapper name="email" label="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-invalid',
      'false'
    );
  });

  it('throws if used outside a FormProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<FormInput name="test" label="Test" />)).toThrow(
      'FormInput must be used within a Form component'
    );
    spy.mockRestore();
  });
});
