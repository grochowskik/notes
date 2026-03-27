import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLogin, useRegister } from '../hooks';

vi.mock('@/core', () => ({
  useGet: vi.fn(),
  usePost: vi.fn(),
  usePatch: vi.fn(),
  useDelete: vi.fn(),
}));

import { useDelete, useGet, usePatch, usePost } from '@/core';

const mockQueryResult = { data: undefined, isLoading: false, isError: false };
const mockMutationResult = {
  mutate: vi.fn(),
  mutateSync: vi.fn(),
  isPending: false,
  isError: false,
};

beforeEach(() => {
  vi.mocked(useGet).mockReturnValue(
    mockQueryResult as ReturnType<typeof useGet>
  );
  vi.mocked(usePost).mockReturnValue(
    mockMutationResult as unknown as ReturnType<typeof usePost>
  );
  vi.mocked(usePatch).mockReturnValue(
    mockMutationResult as unknown as ReturnType<typeof usePatch>
  );
  vi.mocked(useDelete).mockReturnValue(
    mockMutationResult as unknown as ReturnType<typeof useDelete>
  );
});

describe('useLogin', () => {
  it('calls usePost with /login and no params by default', () => {
    renderHook(() => useLogin());
    expect(usePost).toHaveBeenCalledWith('/login', undefined);
  });
});

it('returns the mutation result', () => {
  const { result } = renderHook(() => useLogin());
  expect(result.current).toBe(mockQueryResult);
});

describe('useRegister', () => {
  it('calls usePost with /users_create', () => {
    renderHook(() => useRegister());
    expect(usePost).toHaveBeenCalledWith('/users_create', undefined);
  });

  it('returns the mutation result', () => {
    const { result } = renderHook(() => useRegister());
    expect(result.current).toBe(mockMutationResult);
  });
});
