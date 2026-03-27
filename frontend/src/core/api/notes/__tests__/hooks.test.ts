import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  useNoteCreate,
  useNoteDelete,
  useNotesList,
  useNoteUpdate,
} from '../hooks';

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

describe('useNotesList', () => {
  it('calls useGet with /notes_list and no params by default', () => {
    renderHook(() => useNotesList());
    expect(useGet).toHaveBeenCalledWith('/notes_list', undefined);
  });

  it('forwards params to useGet', () => {
    const params = {
      filters: { page: 2, page_size: 10, sort: 'title' as const },
    };
    renderHook(() => useNotesList(params));
    expect(useGet).toHaveBeenCalledWith('/notes_list', params);
  });

  it('returns whatever useGet returns', () => {
    const { result } = renderHook(() => useNotesList());
    expect(result.current).toBe(mockQueryResult);
  });
});

describe('useNoteCreate', () => {
  it('calls usePost with /notes_create', () => {
    renderHook(() => useNoteCreate());
    expect(usePost).toHaveBeenCalledWith(
      '/notes_create',
      expect.objectContaining({ invalidateQueriesList: ['/notes_list'] })
    );
  });

  it('returns the mutation result', () => {
    const { result } = renderHook(() => useNoteCreate());
    expect(result.current).toBe(mockMutationResult);
  });
});

describe('useNoteUpdate', () => {
  it('calls usePatch with /notes_update and invalidates list + get', () => {
    renderHook(() => useNoteUpdate());
    expect(usePatch).toHaveBeenCalledWith(
      '/notes_update',
      expect.objectContaining({
        invalidateQueriesList: expect.arrayContaining(['/notes_list', '/note']),
      })
    );
  });
});

describe('useNoteDelete', () => {
  it('calls useDelete with /notes_cancel and invalidates list + get', () => {
    renderHook(() => useNoteDelete());
    expect(useDelete).toHaveBeenCalledWith(
      '/notes_cancel',
      expect.objectContaining({
        invalidateQueriesList: expect.arrayContaining(['/notes_list', '/note']),
      })
    );
  });
});
