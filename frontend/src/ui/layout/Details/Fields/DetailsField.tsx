import { cn } from '@/utils';
import { detailsStyles } from './DetailsField.styles';

type DetailsFieldProps = {
  label: string;
  value?: string | number | null;
  className?: string;
  onClick?: (value: string) => void;
};

const DetailsField = ({
  label,
  value,
  className,
  onClick,
}: DetailsFieldProps) => {
  const {
    wrapper,
    label: labelClass,
    value: valueClass,
    clickable,
    empty,
  } = detailsStyles;

  if (!label) return null;

  return (
    <div className={cn([wrapper, className])}>
      <p className={labelClass}>{label}</p>
      {value != null ? (
        <div
          className={cn([valueClass, onClick && clickable])}
          onClick={
            onClick && value != null ? () => onClick(String(value)) : undefined
          }
        >
          {value}
        </div>
      ) : (
        <div className={empty}>None</div>
      )}
    </div>
  );
};

export default DetailsField;
