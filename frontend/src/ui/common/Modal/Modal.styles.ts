export const modalStyles = {
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center p-4',
  backdrop: 'absolute inset-0 bg-black/50 backdrop-blur-xs',
  container: {
    base: 'relative bg-surface rounded-lg shadow-xl flex flex-col transform transition-all duration-200 ease-out',
    sizes: {
      xs: 'max-w-xs w-full',
      sm: 'max-w-sm w-full',
      md: 'max-w-md w-full',
      lg: 'max-w-2xl w-full',
      xl: 'max-w-4xl w-full',
      xxl: 'max-w-6xl w-full',
    },
    maxHeight: 'max-h-[calc(100vh-2rem)]',
  },
  header: {
    base: 'flex items-center justify-between p-6 border-b border-border',
    title: 'text-lg font-semibold text-text-default flex-1',
    closeIcon: 'cursor-pointer p-0 hover:scale-110',
    closeButton:
      'ml-4 p-2 text-text-subtle hover:text-text-muted hover:bg-surface-hover rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent',
  },
  body: 'p-6 overflow-y-auto flex-1',
  footer: {
    base: 'flex gap-3 p-6 border-t border-border',
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
} as const;
