'use client';

import { Form, FormInput, FormSubmitButton } from '@/ui';
import { useLoginForm } from '../hooks/useLoginForm';

export function LoginForm() {
  const { methods, onSubmit } = useLoginForm();

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormInput
        name="email"
        label="Adres Email"
        placeholder="jan@przyklad.pl"
        type="email"
        autoComplete="email"
      />
      <FormInput
        name="password"
        label="Hasło"
        placeholder="Podaj hasło"
        type="password"
        autoComplete="current-password"
      />
      <FormSubmitButton
        label="Zaloguj się"
        variant="primary"
        disableIfInvalid
      />
    </Form>
  );
}
