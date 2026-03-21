const validateCardNumber = (cardNumber: string) => {
  if (cardNumber.length < 10) {
    return false;
  }
  let s = 0;
  let doubleDigit = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = +cardNumber[i];
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    s += digit;
    doubleDigit = !doubleDigit;
  }
  return s % 10 == 0;
};

export default validateCardNumber;
