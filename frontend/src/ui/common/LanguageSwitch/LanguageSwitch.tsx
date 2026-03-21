import { useClickOutside } from '@/hooks';
import { Icon, RadioSelect } from '@/ui';
import { cn } from '@/utils';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGUAGES = [
  { label: 'Polski (PL)', value: 'pl' },
  { label: 'English (EN)', value: 'en' },
  { label: 'Deutsch (DE)', value: 'de' },
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const handleLanguageChange = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  useClickOutside(containerRef, () => setIsOpen(false));

  const currentLang = (i18n.resolvedLanguage ?? i18n.language ?? 'en')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative z-10" ref={containerRef}>
      <button
        type="button"
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-surface-hover cursor-pointer transition-colors"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Icon name="globe" />
        <span className="w-7 text-sm font-medium text-text-default">
          {currentLang}
        </span>
        <Icon
          name="expand"
          width={14}
          height={14}
          className={cn([
            'transition-transform duration-200',
            isOpen && 'rotate-180',
          ])}
        />
      </button>

      {isOpen && (
        <div className="absolute bg-surface rounded-xl right-0 top-full mt-1 shadow-lg border border-border min-w-[160px] overflow-hidden">
          <RadioSelect
            options={SUPPORTED_LANGUAGES}
            active={i18n.resolvedLanguage}
            onChange={handleLanguageChange}
          />
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
