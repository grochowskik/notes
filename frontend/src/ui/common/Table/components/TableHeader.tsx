import { tableStyles } from '../Table.styles';
import { TableHeaderProps } from '../Table.type';
import { cn } from '@/utils';

const TableHeader = ({ children, className, ...props }: TableHeaderProps) => {
  return (
    <thead className={cn([tableStyles.header.base, className])} {...props}>
      {children}
    </thead>
  );
};

export default TableHeader;
