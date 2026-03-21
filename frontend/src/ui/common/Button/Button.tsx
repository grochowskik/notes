import { LoaderIcon } from '@/ui';
import { cn } from '@/utils';
import React from 'react';
import { buttonStyles } from './Button.styles';

type ButtonVariant = keyof typeof buttonStyles.variants;

export type ButtonProps = {
  id?: string;
  label: string;
  onClick?: (id?: string | React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  onClick,
  label,
  type = 'button',
  variant = 'primary',
  disabled,
  loading,
}: ButtonProps) => {
  const { base, variants, disabledStyle, content } = buttonStyles;
  return (
    <button
      className={cn([
        base,
        variants[variant],
        disabled && disabledStyle[variant],
      ])}
      disabled={loading || disabled}
      onClick={onClick}
      type={type}
    >
      {loading && <LoaderIcon />}
      <div className={loading ? content.hidden : content.visible}>{label}</div>
    </button>
  );
};

export default Button;
