import { cn } from '@/utils';
import { tableStyles } from '../Table.styles';
import { TableBodyProps } from '../Table.type';

const TableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <tbody className={cn([tableStyles.body.base, className])} {...props}>
      {children}
    </tbody>
  );
};

export default TableBody;
