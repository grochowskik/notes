import { tableStyles } from '../Table.styles';

type TablePageSizeProps = {
  value: number;
  onChange: (size: number) => void;
};

const pageSizeOptions = [1, 5, 10, 20, 50, 100, 250, 500, 1000];

const TablePageSize = ({ value, onChange }: TablePageSizeProps) => (
  <select
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className={tableStyles.tablePageSize}
  >
    {pageSizeOptions.map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))}
  </select>
);

export default TablePageSize;
