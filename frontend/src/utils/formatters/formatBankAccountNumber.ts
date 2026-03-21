const formatBankAccountNumber = (bankAccountNumber: string) => {
  const formattedBankAccountNumber = `${bankAccountNumber?.slice(0, 2)} ${bankAccountNumber
    ?.slice(2)
    ?.match(/.{1,4}/g)
    ?.join(' ')}`;
  return bankAccountNumber ? formattedBankAccountNumber : '';
};

export default formatBankAccountNumber;
