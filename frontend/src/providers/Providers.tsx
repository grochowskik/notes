'use client';

import '@/lib/i18n';
import { Loader } from '@/ui';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { QueryProvider } from './QueryProvider';
import { ReduxProvider } from './ReduxProvider';

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
