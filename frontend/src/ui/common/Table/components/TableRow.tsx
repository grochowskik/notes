import { tableStyles } from '../Table.styles';
import { TableRowProps } from '../Table.type';
import { cn } from '@/utils';

const TableRow = ({
  children,
  className,
  onClick,
  ...props
}: TableRowProps) => {
  return (
    <tr
      className={cn([
        tableStyles.row.base,
        onClick && tableStyles.row.clickable,
        className,
      ])}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
