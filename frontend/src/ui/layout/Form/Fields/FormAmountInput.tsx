'use client';

import { KeyboardEvent, FocusEvent, ChangeEvent } from 'react';
import { sanitizeAmount, formatAmountValue } from '@/utils';
import FormInput from './FormInput';
import { useFormContext } from 'react-hook-form';

export interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  maxAmount?: number;
  hideLabel?: boolean;
  precision?: number;
}

function FormAmountInput({
  name,
  label,
  maxAmount,
  hideLabel = false,
  precision = 2,
  ...props
}: AmountInputProps) {
  const { register, setValue } = useFormContext();

  if (!register) {
    throw new Error('FormAmountInput must be used within a Form component');
  }

  const { onChange: rhfOnChange, onBlur: rhfOnBlur } = register(name);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const controlKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End',
    ];
    if (e.ctrlKey || e.metaKey || controlKeys.includes(e.key)) return;

    const value = e.currentTarget.value;
    const selectionStart = e.currentTarget.selectionStart || 0;
    const allowedKeys = /[0-9.,]/;

    if ((e.key === '.' || e.key === ',') && /[.,]/.test(value)) {
      e.preventDefault();
      return;
    }

    if (!allowedKeys.test(e.key)) {
      e.preventDefault();
      return;
    }

    const separatorIndex =
      value.indexOf('.') >= 0 ? value.indexOf('.') : value.indexOf(',');
    if (separatorIndex >= 0 && selectionStart > separatorIndex) {
      const decimals = value.slice(separatorIndex + 1);
      if (
        decimals.length >= precision &&
        e.currentTarget.selectionStart === e.currentTarget.selectionEnd
      ) {
        e.preventDefault();
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9.,]/g, '');

    const parts = val.split(/[.,]/);
    if (parts.length > 1) {
      val = `${parts[0]}.${parts[1].slice(0, precision)}`;
    }

    e.target.value = val;
    rhfOnChange(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue) {
      const rawAmount = Number(sanitizeAmount(rawValue));
      const amount =
        maxAmount !== undefined && rawAmount >= maxAmount
          ? maxAmount
          : rawAmount;

      const formatted = formatAmountValue(amount, undefined, precision);

      setValue(name, formatted, { shouldValidate: true });
    }
    rhfOnBlur(e);
  };

  return (
    <FormInput
      {...props}
      name={name}
      label={hideLabel ? '' : (label ?? 'Amount')}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      inputMode="decimal"
    />
  );
}

export default FormAmountInput;
