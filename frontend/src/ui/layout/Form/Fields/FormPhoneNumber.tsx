'use client';

import { memo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { Dropdown } from '@/ui';
import { formStyles } from './FormInput.styles';
import { cn } from '@/utils';

const DIAL_CODES = [
  { label: '+1', value: '1' },
  { label: '+7', value: '7' },
  { label: '+31', value: '31' },
  { label: '+32', value: '32' },
  { label: '+33', value: '33' },
  { label: '+34', value: '34' },
  { label: '+39', value: '39' },
  { label: '+41', value: '41' },
  { label: '+43', value: '43' },
  { label: '+44', value: '44' },
  { label: '+45', value: '45' },
  { label: '+46', value: '46' },
  { label: '+47', value: '47' },
  { label: '+48', value: '48' },
  { label: '+49', value: '49' },
  { label: '+351', value: '351' },
  { label: '+358', value: '358' },
  { label: '+420', value: '420' },
  { label: '+421', value: '421' },
];

interface FormPhoneNumberProps {
  name: string;
  codeName?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function FormPhoneNumberComponent({
  name,
  codeName = 'dialCode',
  label,
  placeholder,
  disabled,
  className,
}: FormPhoneNumberProps) {
  const context = useFormContext();

  if (!context) {
    throw new Error('FormPhoneNumber must be used within a Form component');
  }

  const { control, register } = context;

  const { field: codeField } = useController({
    name: codeName,
    control,
    defaultValue: '48',
  });

  const { fieldState } = useController({ name, control });
  const error = fieldState.error;

  const { input } = formStyles;

  return (
    <div className={cn([input.container, className])}>
      {label && <label className={input.label}>{label}</label>}
      <div className="flex gap-2 items-start">
        <div className="w-24 shrink-0">
          <Dropdown
            options={DIAL_CODES}
            value={codeField.value}
            onChange={codeField.onChange}
            disabled={disabled}
          />
        </div>
        <div className={cn([input.inputWrapper, 'flex-1'])}>
          <input
            id={name}
            type="tel"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${name}-error` : undefined}
            placeholder={placeholder}
            disabled={disabled}
            className={cn([
              input.field.base,
              error ? input.field.error : input.field.default,
            ])}
            {...register(name)}
          />
        </div>
      </div>
      {error?.message && (
        <span id={`${name}-error`} role="alert" className={input.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
}

const FormPhoneNumber = memo(FormPhoneNumberComponent);
FormPhoneNumber.displayName = 'FormPhoneNumber';

export default FormPhoneNumber;
