import { cn } from '@/utils';
import { tableStyles } from '../Table.styles';
import { TableHeaderCellProps } from '../Table.type';

const TableHeaderCell = ({
  children,
  className,
  width,
  ...props
}: TableHeaderCellProps) => {
  return (
    <th
      className={cn([tableStyles.headerCell.base, className])}
      style={{ width }}
      {...props}
    >
      {children}
    </th>
  );
};

export default TableHeaderCell;
