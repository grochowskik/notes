'use client';

import { Button } from '@/ui';
import { cn } from '@/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { formStyles } from './FormInput.styles';

type OtpInputProps = {
  loading?: boolean;
  name: string;
  length?: number;
  disabled?: boolean;
};

function OtpInput({ length = 6, name, loading, disabled }: OtpInputProps) {
  const {
    wrapper,
    title,
    label: labelStyle,
    inputsContainer,
    input: inputStyle,
  } = formStyles.otp;

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  if (!register) {
    throw new Error('OtpInput must be used within a Form component');
  }

  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const otpReference = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    register(name);
  }, [register, name]);

  const updateOtpValue = (newOtp: string[]) => {
    setOtp(newOtp);
    const combinedValue = newOtp.join('');
    setValue(name, combinedValue, { shouldValidate: true, shouldDirty: true });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const otpArr = [...otp];
    otpArr[index] = value;
    updateOtpValue(otpArr);

    if (value && index < length - 1) {
      otpReference.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        updateOtpValue(newOtp);
        otpReference.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        updateOtpValue(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpReference.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      otpReference.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, length).split('');
    const filledArray = [
      ...pastedOtp,
      ...new Array(length - pastedOtp.length).fill(''),
    ].slice(0, length);

    updateOtpValue(filledArray);

    const focusIndex = Math.min(pastedOtp.length, length - 1);
    otpReference.current[focusIndex]?.focus();
  };

  const hasError = !!errors[name];

  return (
    <div className={wrapper}>
      <div className={title}>OTP Verification</div>
      <label className={labelStyle}>Enter the code sent to your email</label>

      <div className={inputsContainer}>
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              otpReference.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={value}
            disabled={disabled}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={cn([inputStyle, hasError && 'border-error'])}
          />
        ))}
      </div>

      {hasError && (
        <span
          role="alert"
          className="text-error text-sm mt-2 block text-center"
        >
          {errors[name]?.message as string}
        </span>
      )}

      <Button loading={loading} type="submit" label="Next" />
    </div>
  );
}

export default OtpInput;
