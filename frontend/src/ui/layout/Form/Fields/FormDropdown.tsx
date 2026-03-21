'use client';

import { Dropdown, type DropdownOption } from '@/ui';
import { cn } from '@/utils';
import { memo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { formStyles } from './FormInput.styles';

interface FormDropdownProps {
  name: string;
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function FormDropdownComponent({
  name,
  label,
  className,
  ...props
}: FormDropdownProps) {
  const context = useFormContext();

  if (!context) {
    throw new Error('FormDropdown must be used within a Form component');
  }

  const { control } = context;
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className={cn([formStyles.input.container, className])}>
      <Dropdown
        label={label}
        value={field.value}
        onChange={field.onChange}
        {...props}
      />
      {error?.message && (
        <span role="alert" className={formStyles.input.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
}

const FormDropdown = memo(FormDropdownComponent);
FormDropdown.displayName = 'FormDropdown';

export default FormDropdown;
