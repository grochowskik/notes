'use client';

import { useState } from 'react';
import { useTablePageSize } from './useTablePageSize';

const usePagination = ({
  pageSize: defaultPageSize = 20,
  tableId = '',
}: { pageSize?: number; tableId?: string } = {}) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string | number>('');
  const [prevPage, setPrevPage] = useState<string | number>('');
  const { pageSize, setPageSize } = useTablePageSize(tableId, defaultPageSize);

  const handlePageChange = (
    newPage: number,
    firstId?: string,
    lastId?: string
  ) => {
    setPageNo(newPage);
    if (lastId !== undefined) setNextPage(lastId);
    if (firstId !== undefined) setPrevPage(firstId);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageNo(1);
  };

  return {
    pageNo,
    nextPage,
    prevPage,
    setPageNo,
    pageSize,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePagination;
