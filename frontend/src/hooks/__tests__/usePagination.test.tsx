import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import usePagination from '../usePagination';

describe('usePagination', () => {
  it('initialises with default values', () => {
    const { result } = renderHook(() => usePagination());
    expect(result.current.pageNo).toBe(1);
    expect(result.current.pageSize).toBe(20);
    expect(result.current.nextPage).toBe('');
    expect(result.current.prevPage).toBe('');
  });

  it('accepts custom default values', () => {
    const { result } = renderHook(() => usePagination(2, 50));
    expect(result.current.pageNo).toBe(2);
    expect(result.current.pageSize).toBe(50);
  });

  it('handlePageChange updates pageNo', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.handlePageChange(3));
    expect(result.current.pageNo).toBe(3);
  });

  it('handlePageChange updates nextPage and prevPage cursors', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.handlePageChange(2, 20, 'first-id', 'last-id'));
    expect(result.current.prevPage).toBe('first-id');
    expect(result.current.nextPage).toBe('last-id');
  });

  it('handlePageChange updates pageSize when provided', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.handlePageChange(1, 50));
    expect(result.current.pageSize).toBe(50);
  });

  it('handlePageChange does not overwrite pageSize when undefined', () => {
    const { result } = renderHook(() => usePagination(1, 20));
    act(() => result.current.handlePageChange(2));
    expect(result.current.pageSize).toBe(20);
  });

  it('setPageNo directly updates the page number', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.setPageNo(10));
    expect(result.current.pageNo).toBe(10);
  });

  it('setPageSize directly updates the page size', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.setPageSize(100));
    expect(result.current.pageSize).toBe(100);
  });
});
