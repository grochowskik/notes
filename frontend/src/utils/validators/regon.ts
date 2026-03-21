const validateRegon = (regon: string) => {
  const regex = /^\d{14}|\d{9}$/;
  if (!regex.test(regon)) {
    return false;
  }

  const dig =
    `${regon.slice(-5) === '00000' ? regon.slice(0, 9) : regon}`.split('');
  let weights;

  if (dig.length === 9) {
    weights = [8, 9, 2, 3, 4, 5, 6, 7];
  } else if (dig.length === 14) {
    weights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
  } else {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < dig.length - 1; i++) {
    sum += weights[i] * parseInt(dig[i]);
  }
  sum %= 11;
  if (sum === 10) {
    sum = 0;
  }

  if (sum === parseInt(dig[dig.length - 1])) {
    return true;
  }
  return false;
};

export default validateRegon;
