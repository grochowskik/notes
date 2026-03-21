export const toggleStyles = {
  wrapper: 'flex items-center',
  container:
    'flex items-center rounded-xl w-10 min-w-[40px] h-6 cursor-pointer transition-colors duration-200',
  checkedLight: 'bg-accent',
  circle:
    'mx-[3px] h-4 w-4 rounded-full transition-[translate] duration-200 bg-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.1)]',
  activeCircle: 'translate-x-[110%]',
  input: 'absolute opacity-0 pointer-events-none w-0 h-0',
  label: 'px-1',
} as const;
