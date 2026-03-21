export const cn = (
  classnames: (string | undefined | false | null)[],
): string => {
  return classnames.filter(Boolean).join(' ');
};
