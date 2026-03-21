import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTablePageSize } from '../useTablePageSize';

describe('useTablePageSize', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the default size when nothing is stored', () => {
    const { result } = renderHook(() => useTablePageSize('my-table', 10));
    expect(result.current.pageSize).toBe(10);
  });

  it('falls back to 10 when no defaultSize argument is given', () => {
    const { result } = renderHook(() => useTablePageSize('my-table'));
    expect(result.current.pageSize).toBe(10);
  });

  it('persists the page size to localStorage when setPageSize is called', () => {
    const { result } = renderHook(() => useTablePageSize('my-table', 10));
    act(() => result.current.setPageSize(50));

    const stored = JSON.parse(localStorage.getItem('app.table')!);
    expect(stored.tables['my-table'].pageSize).toBe(50);
  });

  it('updates the in-memory pageSize state', () => {
    const { result } = renderHook(() => useTablePageSize('my-table', 10));
    act(() => result.current.setPageSize(25));
    expect(result.current.pageSize).toBe(25);
  });

  it('reads persisted value on mount', () => {
    const prefs = { tables: { 'persistent-table': { pageSize: 75 } } };
    localStorage.setItem('app.table', JSON.stringify(prefs));

    const { result } = renderHook(() =>
      useTablePageSize('persistent-table', 10),
    );
    expect(result.current.pageSize).toBe(75);
  });

  it('scopes size per tableId', () => {
    const { result: r1 } = renderHook(() => useTablePageSize('table-a', 10));
    const { result: r2 } = renderHook(() => useTablePageSize('table-b', 10));

    act(() => r1.current.setPageSize(30));

    expect(r1.current.pageSize).toBe(30);
    expect(r2.current.pageSize).toBe(10);
  });
});
