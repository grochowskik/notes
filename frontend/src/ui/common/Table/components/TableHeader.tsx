import { cn } from '@/utils';
import { tableStyles } from '../Table.styles';
import { TableHeaderProps } from '../Table.type';

const TableHeader = ({ children, className, ...props }: TableHeaderProps) => {
  return (
    <thead className={cn([tableStyles.header.base, className])} {...props}>
      {children}
    </thead>
  );
};

export default TableHeader;
