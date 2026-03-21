const validateNip = (nip: string) => {
  const regex = /^(\d{3}-\d{2}-\d{2}-\d{3}|\d{10})$/;
  if (!regex.test(nip)) {
    return false;
  }

  const dig = `${nip}`.replaceAll('-', '').split('');
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

  let sum = 0;
  for (let i = 0; i < dig.length - 1; i++) {
    sum += weights[i] * parseInt(dig[i]);
  }
  sum %= 11;
  if (sum === parseInt(dig[dig.length - 1])) {
    return true;
  }
  return false;
};

export default validateNip;
