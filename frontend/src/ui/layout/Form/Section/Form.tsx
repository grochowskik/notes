'use client';

import React from 'react';
import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';

import { formStyles } from './Form.styles';
import { cn } from '@/utils';
import {
  AmountInput,
  FormDropdown,
  FormPhoneNumber,
  Input,
  FormOtp,
  FormSubmitButton,
} from '@/ui';

interface FormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function Form<T extends FieldValues>({
  methods,
  onSubmit,
  children,
  className = '',
  id,
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn([formStyles.form, className])}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

Form.AmountInput = AmountInput;
Form.Dropdown = FormDropdown;
Form.Input = Input;
Form.OtpInput = FormOtp;
Form.PhoneNumber = FormPhoneNumber;
Form.SubmitButton = FormSubmitButton;

export default Form;
