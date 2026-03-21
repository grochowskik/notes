const validateEmail = (email: string) => {
  const regex =
    /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,6})$/;
  return regex.test(email);
};

export default validateEmail;
