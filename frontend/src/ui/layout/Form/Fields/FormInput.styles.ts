export const formStyles = {
  input: {
    container: 'flex flex-col gap-1.5 w-full relative',
    label: 'text-sm font-medium text-text-muted ml-1 cursor-pointer',
    inputWrapper: 'relative flex items-center',
    field: {
      base: 'w-full px-4 py-2.5 bg-surface border rounded-md text-sm text-text-default focus:outline-none placeholder:text-text-subtle disabled:bg-surface-subtle disabled:text-text-subtle',
      default:
        'border-border hover:border-text-subtle focus:border-accent focus:ring-4 focus:ring-accent/10 shadow-sm',
      error:
        'border-error focus:border-error focus:ring-4 focus:ring-error/10 pr-10',
    },
    errorMessage: 'text-xs font-medium text-error mt-1 ml-1',
    errorIcon: 'absolute right-3 h-5 w-5 text-error pointer-events-none',
  },
  otp: {
    wrapper: 'grid w-max text-2xl bg-surface-subtle rounded-lg shadow p-8',
    title: 'px-3 pb-10',
    label: 'text-xs leading-4 w-fit self-center px-3',
    inputsContainer: 'flex justify-center gap-2.5 my-2',
    input:
      'rounded-md bg-transparent border-2 border-border focus:outline-none text-base h-12 w-10 text-center hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  },
} as const;
