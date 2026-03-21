'use client';

import { toastNotification, useRedirect } from '@/hooks';
import { setLoggedIn, setRole } from '@/redux/slice/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';

export function useLoginForm() {
  const { redirect } = useRedirect();
  const dispatch = useDispatch();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      void data;
      document.cookie = 'auth_session=1; path=/; SameSite=Lax';
      dispatch(setLoggedIn({ isLoggedIn: true }));
      dispatch(setRole('user'));
      toastNotification({
        title: 'Logowanie',
        details: 'Pomyślnie zalogowano',
      });
      redirect({ url: '/dashboard' });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return { methods, onSubmit };
}
