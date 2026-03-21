import { useCallback, useState } from 'react';

const STORAGE_KEY = 'app.table';

type TableStorage = {
  pageSize?: number;
};

type Storage = {
  tables: Record<string, TableStorage>;
};

function getPreferences(): Storage {
  if (typeof window === 'undefined') return { tables: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { tables: {} };
  } catch {
    return { tables: {} };
  }
}

function setPreferences(prefs: Storage) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

function readPageSize(tableId: string): number | undefined {
  return getPreferences().tables[tableId]?.pageSize;
}

function writePageSize(tableId: string, size: number) {
  const prefs = getPreferences();
  prefs.tables[tableId] = { ...prefs.tables[tableId], pageSize: size };
  setPreferences(prefs);
}

export function useTablePageSize(tableId: string, defaultSize = 10) {
  const [pageSize, setPageSizeState] = useState<number>(
    () => readPageSize(tableId) ?? defaultSize
  );

  const setPageSize = useCallback(
    (size: number) => {
      writePageSize(tableId, size);
      setPageSizeState(size);
    },
    [tableId]
  );

  return { pageSize, setPageSize };
}
