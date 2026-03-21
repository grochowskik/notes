const sanitizeAmount = (value: string, asInt: boolean = false) => {
  if (!value) return 0;
  const cleanValue = value.replaceAll(' ', '').replace(',', '.');
  const num = Math.round(Number(cleanValue) * 100) / 100;
  return asInt ? Math.round(num * 100) : num;
};

export default sanitizeAmount;
