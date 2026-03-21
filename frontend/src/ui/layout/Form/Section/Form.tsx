'use client';

import React from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

import {
  AmountInput,
  FormDropdown,
  FormOtp,
  FormPhoneNumber,
  FormSubmitButton,
  Input,
} from '@/ui';
import { cn } from '@/utils';
import { formStyles } from './Form.styles';

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
