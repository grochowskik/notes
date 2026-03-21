import { TableBodyCell, TableRow } from '@/ui';
import { tableStyles } from '../Table.styles';
import { TableSkeletonProps } from '../Table.type';

const TableSkeleton = ({
  rows = 5,
  columns = 3,
}: TableSkeletonProps & { columns?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableBodyCell key={colIndex}>
              <div className={tableStyles.skeleton.bar} />
            </TableBodyCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableSkeleton;
