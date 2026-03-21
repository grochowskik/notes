'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  dashboardSchema,
  type DashboardFormValues,
} from '../schemas/dashboard.schema';

export function useDashboardForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm<DashboardFormValues>({
    resolver: zodResolver(dashboardSchema),
    defaultValues: {
      email: '',
      age: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onSubmit = useCallback(
    async (data: DashboardFormValues) => {
      try {
        void data;
        handleOpenModal();
      } catch (error) {
        console.error('Form submission failed:', error);
      }
    },
    [handleOpenModal]
  );

  return {
    methods,
    onSubmit,
    isOpen: isModalOpen,
    onClose: handleCloseModal,
  };
}
