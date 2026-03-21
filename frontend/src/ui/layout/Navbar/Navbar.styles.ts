export const navbarStyles = {
  navItem: {
    base: 'px-3 py-2 rounded-md text-sm font-medium transition-colors',
    active: 'text-accent bg-accent-subtle',
    inactive: 'text-text-muted hover:text-accent hover:bg-surface-hover',
  },
  section: {
    container: 'hidden md:flex items-center space-x-8',
  },
  navbar: {
    wrapper: 'bg-surface shadow-lg',
    inner: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    content: 'flex justify-between h-16',
  },
  logo: {
    container: 'flex items-center',
    link: 'flex-shrink-0',
    text: 'text-xl font-bold text-text-default',
  },
  userMenu: {
    container: 'relative flex items-center',
    trigger:
      'w-8 h-8 rounded-full bg-accent text-white text-sm font-medium flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer',
    dropdown:
      'absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-md shadow-lg z-50',
    item: 'w-full text-left px-4 py-3 text-sm text-text-default hover:bg-surface-hover transition-colors flex items-center gap-2 cursor-pointer',
    divider: 'border-t border-border',
  },
} as const;
