const formatCardNumber = (cardNumber: number | string): string => {
  const numberString = String(cardNumber);
  const formattedCardNumber = numberString.replace(
    /(\d{4})(\d{5})(\d{5})(\d+)/,
    '$1 $2 $3 $4'
  );
  return isNaN(Number(cardNumber)) ? '' : formattedCardNumber;
};

export default formatCardNumber;
