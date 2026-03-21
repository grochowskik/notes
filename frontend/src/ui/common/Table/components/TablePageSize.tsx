import { useState } from 'react';
import Select, { type SingleValue } from 'react-select';
import { tableStyles } from '../Table.styles';
import { cn } from '@/utils';
import { Icon } from '@/ui';

type PageSizeOption = { label: string; value: string };

type TablePageSizeProps = {
  displayedItems: number;
  onChange?: (size: number) => void;
};

const pageSizeOptions: PageSizeOption[] = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
  { label: '250', value: '250' },
  { label: '500', value: '500' },
  { label: '1000', value: '1000' },
];

const TablePageSize = ({ displayedItems, onChange }: TablePageSizeProps) => {
  const { tablePageSize } = tableStyles;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<PageSizeOption>(
    pageSizeOptions.find((o) => Number(o.value) === displayedItems) ??
      pageSizeOptions[1],
  );

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleChange = (option: SingleValue<PageSizeOption>) => {
    if (!option) return;
    setSelected(option);
    onChange?.(Number(option.value));
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={cn([
          tablePageSize.icon,
          isOpen ? tablePageSize.iconExpanded : tablePageSize.iconCollapsed,
        ])}
        onClick={handleIconClick}
      >
        <Icon name="filter" />
      </div>
      {isOpen && (
        <div className={tablePageSize.menu}>
          <Select<PageSizeOption>
            value={selected}
            options={pageSizeOptions}
            onChange={handleChange}
            menuIsOpen
            menuPosition="fixed"
            isSearchable={false}
            noOptionsMessage={() => null}
          />
        </div>
      )}
    </>
  );
};

export default TablePageSize;
