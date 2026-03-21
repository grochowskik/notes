export const buttonStyles = {
  base: 'relative flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',

  variants: {
    primary:
      'bg-accent text-white hover:bg-accent-foreground focus:ring-accent shadow-sm',
    secondary:
      'bg-surface text-text-muted border border-border hover:bg-surface-hover focus:ring-border',
    danger: 'bg-error text-white hover:bg-error-foreground focus:ring-error',
  },

  disabledStyle: {
    primary: 'opacity-60 cursor-not-allowed',
    secondary: 'opacity-50 cursor-not-allowed bg-surface-subtle',
    danger: 'opacity-60 cursor-not-allowed',
  },

  content: {
    visible: 'opacity-100 transition-opacity duration-200',
    hidden: 'opacity-0',
  },
} as const;
