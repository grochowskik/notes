import { tableStyles } from '../Table.styles';
import { TableBodyCellProps } from '../Table.type';
import { cn } from '@/utils';

const TableCell = ({ children, className, ...props }: TableBodyCellProps) => {
  return (
    <td className={cn([tableStyles.cell.base, className])} {...props}>
      {children ?? '-'}
    </td>
  );
};

export default TableCell;
