const validateBankAccountNumber = (accountNumber: string) => {
  if (!accountNumber) {
    return false;
  }
  const cleanNrb = accountNumber.replace(/[^0-9]+/g, '');
  const weights = [
    1, 10, 3, 30, 9, 90, 27, 76, 81, 34, 49, 5, 50, 15, 53, 45, 62, 38, 89, 17,
    73, 51, 25, 56, 75, 71, 31, 19, 93, 57,
  ];

  if (cleanNrb.length === 26) {
    const longNrb = cleanNrb.concat('2521');
    const workingNrb = longNrb.substring(2) + longNrb.substring(0, 2);
    let Z = 0;
    for (let i = 0; i < 30; i++) {
      Z += parseInt(workingNrb[29 - i]) * weights[i];
    }
    if (Z % 97 === 1) {
      return true;
    }
    return false;
  }
  return false;
};

export default validateBankAccountNumber;
