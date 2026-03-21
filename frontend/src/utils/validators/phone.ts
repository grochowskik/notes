const validatePhone = (phone: string) => {
  const regex = /^[+]?[0-9\- ]{9,15}$/;
  return regex.test(phone.replace(/\s?\t?\n?\r?\u00A0?/g, ''));
};

export default validatePhone;
