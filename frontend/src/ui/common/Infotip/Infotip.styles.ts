export const infotipStyles = {
  container: 'inline-block relative',
  icon: 'cursor-pointer translate-y-[10%]',
  tooltip:
    "fixed -translate-x-1/2 -translate-y-full bg-text-default text-background text-sm text-left p-3 rounded-lg shadow-lg min-w-min max-w-[400px] whitespace-normal break-words z-[9999] transition-opacity duration-200 pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-text-default",
} as const;
