export const accordionStyles = {
  summary: 'flex bg-transparent items-center w-full gap-x-2 cursor-pointer',
  icon: 'transition-transform duration-[0.2s]',
  expandedIcon: 'rotate-180',
  content: {
    base: 'grid overflow-hidden grid-rows-[minmax(0,0fr)] transition-[grid-template-rows] duration-[0.2s] ease-[ease-out]',
    expanded: 'grid-rows-[minmax(0,1fr)] ',
    collapsed: 'grid-rows-[minmax(0,0fr)]',
  },
} as const;
