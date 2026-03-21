import pageParamsReducer from '@/redux/slice/page-params';
import userReducer from '@/redux/slice/user';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export function createTestStore() {
  return configureStore({
    reducer: {
      pageParams: pageParamsReducer,
      user: userReducer,
    },
  });
}

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

function AllProviders({ children }: { children: React.ReactNode }) {
  const store = createTestStore();
  const queryClient = createTestQueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}
