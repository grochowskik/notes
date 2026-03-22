'use client';

import { useState } from 'react';

const usePagination = ({ pageSize: defaultPageSize = 20 } = {}) => {
  const [pageNo, setPageNo] = useState<number>(1);
  const [nextPage, setNextPage] = useState<string | number>('');
  const [prevPage, setPrevPage] = useState<string | number>('');
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const handlePageChange = (
    newPage: number,
    pageSize?: number,
    firstId?: string,
    lastId?: string
  ) => {
    setPageNo(newPage);
    if (lastId !== undefined) setNextPage(lastId);
    if (firstId !== undefined) setPrevPage(firstId);
    if (pageSize !== undefined) setPageSize(pageSize);
  };

  return {
    pageNo,
    nextPage,
    prevPage,
    setPageNo,
    pageSize,
    setPageSize,
    handlePageChange,
  };
};

export default usePagination;
