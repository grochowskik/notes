const formatAmountValue = (
  price?: number | string,
  curr?: string,
  precision: number = 2
): string => {
  if (price === null || price === undefined || price === '') {
    return '';
  }

  const cleanPriceString = price
    .toString()
    .replace(',', '.')
    .replaceAll(' ', '');
  const parsedPrice = parseFloat(cleanPriceString);

  if (isNaN(parsedPrice)) {
    return '';
  }

  const formattedPrice = parsedPrice
    .toFixed(precision)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return curr ? `${formattedPrice}\u00A0${curr}` : formattedPrice;
};

export const formatCentAmount = (price: number | string): string => {
  const formattedPrice = String(price).padStart(3, '0');
  const beforeComma = formattedPrice?.slice(0, formattedPrice?.length - 2);
  const afterComma = formattedPrice?.slice(formattedPrice?.length - 2);
  return isNaN(Number(price)) ? '' : beforeComma + ',' + afterComma;
};

export const formatPercentage = (value: number | string): string => {
  const formattedPercentage = `${Number(value)
    ?.toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}%`;
  return isNaN(Number(value)) ? '' : formattedPercentage;
};

export default formatAmountValue;
