export const replaceComma = (value: string | number): string => {
  if (value == null) return value;
  return String(value).replace(',', '.');
};

export const replaceDot = (value: string | number) => {
  return value ? String(value)?.replace('.', ',') : value;
};
