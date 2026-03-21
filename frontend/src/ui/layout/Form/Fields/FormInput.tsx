'use client';

import React, { memo } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { formStyles } from './FormInput.styles';
import { CircleAlert } from 'lucide-react';
import { cn } from '@/utils';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

function FormInputComponent({
  name,
  label,
  className = '',
  type = 'text',
  ...props
}: FormInputProps) {
  const { input } = formStyles;

  const context = useFormContext();

  if (!context) {
    throw new Error('FormInput must be used within a Form component');
  }

  const { register } = context;
  const { errors } = useFormState({ name });

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;
  const hasError = Boolean(errorMessage);

  return (
    <div className={input.container}>
      <label htmlFor={name} className={input.label}>
        {label}
      </label>

      <div className={input.inputWrapper}>
        <input
          id={name}
          type={type}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={cn([
            input.field.base,
            hasError ? input.field.error : input.field.default,
            className,
          ])}
          {...register(name)}
          {...props}
        />

        {hasError && <CircleAlert className={formStyles.input.errorIcon} />}
      </div>

      {hasError && (
        <span id={`${name}-error`} role="alert" className={input.errorMessage}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

const FormInput = memo(FormInputComponent);
FormInput.displayName = 'FormInput';

export default FormInput;
