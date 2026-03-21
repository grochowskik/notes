import {
  TableBody,
  TableBodyCell,
  TableHeader,
  TableHeaderCell,
  TablePageSize,
  TablePagination,
  TableRow,
  TableSkeleton,
} from '@/ui';
import { tableStyles } from './Table.styles';
import { TableProps, TableHeaderProps, TableBodyProps } from './Table.type';

import { cn } from '@/utils';
import { Children, isValidElement, cloneElement } from 'react';

function TableRoot({
  children,
  className,
  loading = false,
  loadingRows = 5,
  ...props
}: TableProps) {
  const getColumnCount = (): number => {
    let columnCount = 0;

    Children.forEach(children, (child) => {
      if (
        isValidElement<TableHeaderProps>(child) &&
        child.type === TableHeader
      ) {
        Children.forEach(child.props.children, (row) => {
          if (isValidElement(row) && row.type === TableRow) {
            columnCount = Children.count(
              (row.props as { children?: React.ReactNode }).children,
            );
          }
        });
      }
    });

    return columnCount;
  };

  const renderChildren = () => {
    if (!loading) return children;

    const columnCount = getColumnCount();

    return Children.map(children, (child) => {
      if (isValidElement<TableBodyProps>(child) && child.type === TableBody) {
        return cloneElement(child, {
          children: <TableSkeleton rows={loadingRows} columns={columnCount} />,
        });
      }
      return child;
    });
  };

  return (
    <div className={cn([tableStyles.wrapper, className])} {...props}>
      <table className={tableStyles.table}>{renderChildren()}</table>
    </div>
  );
}

const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableBodyCell,
  Skeleton: TableSkeleton,
  PageSize: TablePageSize,
  Pagination: TablePagination,
});

export default Table;
