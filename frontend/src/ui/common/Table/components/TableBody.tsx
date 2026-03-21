import { tableStyles } from '../Table.styles';
import { TableBodyProps } from '../Table.type';
import { cn } from '@/utils';

const TableBody = ({ children, className, ...props }: TableBodyProps) => {
  return (
    <tbody className={cn([tableStyles.body.base, className])} {...props}>
      {children}
    </tbody>
  );
};

export default TableBody;
