import { cn } from '@/utils';
import { tableStyles } from '../Table.styles';
import { TableRowProps } from '../Table.type';

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
