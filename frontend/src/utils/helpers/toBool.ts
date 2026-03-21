const toBool = (value?: string | number | boolean): boolean => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value === 1;
  if (typeof value === 'string')
    return ['yes', '1', 'true'].includes(value.trim().toLowerCase());
  return false;
};

export default toBool;
