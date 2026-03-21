'use client';

import { Button, type ButtonProps } from '@/ui';
import { useFormContext } from 'react-hook-form';

type FormSubmitButtonProps = Omit<ButtonProps, 'loading' | 'type'> & {
  disableIfInvalid?: boolean;
};

function FormSubmitButton({
  label,
  disableIfInvalid = false,
  disabled = false,
  ...props
}: FormSubmitButtonProps) {
  const context = useFormContext();

  if (!context) {
    throw new Error('FormSubmitButton must be used within a Form component');
  }

  const {
    formState: { isSubmitting, isValid, isDirty, isValidating },
  } = context;

  const isDisabled =
    disabled || isValidating || (disableIfInvalid && isDirty && !isValid);

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      disabled={isDisabled}
      label={label}
      {...props}
    />
  );
}

export default FormSubmitButton;
