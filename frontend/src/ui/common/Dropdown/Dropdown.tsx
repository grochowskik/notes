'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/ui';
import { useClickOutside, useEscapeKey } from '@/hooks';
import { dropdownStyles } from './Dropdown.styles';
import { cn } from '@/utils';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);

  useClickOutside(containerRef, close);
  useEscapeKey(close, isOpen);

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    close();
  };

  return (
    <div
      className={cn([dropdownStyles.container, className])}
      ref={containerRef}
    >
      {label && <label className={dropdownStyles.label}>{label}</label>}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={cn([
            dropdownStyles.trigger,
            disabled
              ? dropdownStyles.triggerDisabled
              : isOpen
                ? dropdownStyles.triggerOpen
                : dropdownStyles.triggerDefault,
          ])}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          <span
            className={
              selectedOption
                ? dropdownStyles.triggerValue
                : dropdownStyles.triggerPlaceholder
            }
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <Icon
            name="expand"
            width={16}
            height={16}
            className={cn([
              dropdownStyles.chevron,
              isOpen && dropdownStyles.chevronOpen,
            ])}
          />
        </button>

        {isOpen && (
          <div className={dropdownStyles.menu} role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={cn([
                  dropdownStyles.option,
                  option.value === value && dropdownStyles.optionActive,
                ])}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
