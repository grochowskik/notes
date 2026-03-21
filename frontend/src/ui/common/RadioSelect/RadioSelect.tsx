import { Icon } from '@/ui';
import { radioSelectStyles } from './RadioSelect.styles';

type RadioOption = {
  label: string;
  value: string;
};

type RadioSelectProps = {
  options: RadioOption[];
  active?: string;
  onChange: (value: string) => void;
};

export default function RadioSelect({
  options,
  active,
  onChange,
}: RadioSelectProps) {
  return (
    <div>
      {options.map(({ label, value }, index) => (
        <div
          className={radioSelectStyles.item}
          key={`${value}-${index}`}
          onClick={() => onChange(value)}
        >
          <Icon
            name={active === value ? 'radioSelected' : 'radioUnselected'}
            width={22}
            height={22}
          />
          <label className={radioSelectStyles.label}>{label}</label>
        </div>
      ))}
    </div>
  );
}
