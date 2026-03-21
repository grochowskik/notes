import { ReactNode, HTMLAttributes } from 'react';

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  loadingRows?: number;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  className?: string;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode;
  className?: string;
}

export interface TableBodyCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
  className?: string;
}

export interface TableHeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
  width?: string | number;
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
  colSpan?: number;
}

export interface TableSkeletonProps {
  rows?: number;
}

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
}
