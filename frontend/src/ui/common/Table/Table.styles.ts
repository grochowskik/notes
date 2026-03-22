export const tableStyles = {
  wrapper: 'w-full overflow-x-auto rounded-lg border border-border',
  table: 'w-full border-collapse',

  header: {
    base: 'bg-surface-subtle border-b border-border',
  },

  headerCell: {
    base: 'px-4 py-3 text-left text-sm font-semibold text-text-muted',
  },

  body: {
    base: '',
  },

  row: {
    base: 'border-b border-border last:border-0',
    clickable: 'hover:bg-surface-hover cursor-pointer transition-colors',
  },

  cell: {
    base: 'px-4 py-3 text-sm text-text-default',
  },

  skeleton: {
    bar: 'h-4 bg-surface-hover rounded animate-pulse',
  },

  pagination: {
    wrapper:
      'flex items-center justify-between px-4 py-3 border-t border-border',
    info: 'text-sm text-text-muted',
    controls: 'flex items-center gap-2',
    button:
      'px-3 py-1.5 text-sm border border-border rounded hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
    buttonActive:
      'px-3 py-1.5 text-sm border border-accent bg-accent-subtle text-accent rounded font-medium',
    ellipsis: 'px-2 text-text-subtle',
  },

  tablePageSize:
    'px-2 py-1.5 text-sm border border-border rounded bg-surface text-text-default cursor-pointer hover:bg-surface-hover transition-colors [&>option]:bg-surface [&>option]:hover:bg-surface',
} as const;

export type TableStyles = typeof tableStyles;
