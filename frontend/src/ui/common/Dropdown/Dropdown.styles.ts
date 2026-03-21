export const dropdownStyles = {
  container: 'relative flex flex-col gap-1.5 w-full',
  label: 'text-sm font-medium text-text-muted ml-1 cursor-pointer',
  trigger:
    'flex items-center justify-between w-full px-4 py-2.5 bg-surface border rounded-md text-sm focus:outline-none shadow-sm transition-colors',
  triggerDefault:
    'border-border hover:border-text-subtle focus:border-accent focus:ring-4 focus:ring-accent/10',
  triggerDisabled: 'opacity-50 cursor-not-allowed bg-surface-subtle',
  triggerOpen: 'border-accent ring-4 ring-accent/10',
  triggerValue: 'text-text-default',
  triggerPlaceholder: 'text-text-subtle',
  chevron: 'shrink-0 transition-transform duration-200',
  chevronOpen: 'rotate-180',
  menu: 'absolute z-10 w-full top-full mt-1 bg-surface border border-border rounded-md shadow-lg overflow-hidden',
  option:
    'w-full px-4 py-2.5 text-sm text-left text-text-default hover:bg-surface-hover transition-colors',
  optionActive: 'bg-accent-subtle text-accent font-medium',
} as const;
