'use client';

import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './QueryProvider';
import { ReduxProvider } from './ReduxProvider';
import { Suspense } from 'react';
import { Loader } from '@/ui';
import '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <Suspense fallback={<Loader />}>{children}</Suspense>
        <ToastContainer />
      </QueryProvider>
    </ReduxProvider>
  );
}
