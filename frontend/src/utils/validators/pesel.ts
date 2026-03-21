const validatePesel = (pesel: string | number) => {
  const parsedPesel = String(pesel);
  if (parsedPesel.length === 11) {
    const arr = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += arr[i] * Number(parsedPesel[i]);
    }
    sum = sum % 10 === 0 ? 0 : 10 - (sum % 10);
    return String(sum) === parsedPesel[10];
  }
  return false;
};

export default validatePesel;
