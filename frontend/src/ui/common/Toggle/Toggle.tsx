import { cn } from '@/utils';
import type { ChangeEventHandler } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { toggleStyles } from './Toggle.styles';

type ToggleProps = {
  checked: boolean;
  leftLabel?: string;
  rightLabel?: string;
  name?: string;
  register?: Partial<UseFormRegisterReturn>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
};

const Toggle = ({
  checked,
  leftLabel,
  rightLabel,
  name,
  register,
  onChange,
  disabled,
}: ToggleProps) => (
  <div className={toggleStyles.wrapper}>
    {leftLabel && <label className={toggleStyles.label}>{leftLabel}</label>}
    <label
      className={cn([
        toggleStyles.container,
        checked && toggleStyles.checkedLight,
      ])}
    >
      <input
        className={toggleStyles.input}
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        {...register}
        onChange={onChange}
      />
      <span
        className={cn([
          toggleStyles.circle,
          checked && toggleStyles.activeCircle,
        ])}
      />
    </label>
    {rightLabel && <label className={toggleStyles.label}>{rightLabel}</label>}
  </div>
);

export default Toggle;
