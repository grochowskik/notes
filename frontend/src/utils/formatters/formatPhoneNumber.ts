export const formatPhoneNumber = (
  phone: string,
  phone_area_code?: string,
): string => {
  return Boolean(phone_area_code)
    ? String(phone).startsWith(String(phone_area_code))
      ? `${phone_area_code} ${String(phone)?.slice(String(phone_area_code)?.length)}`
      : `${phone_area_code} ${phone}`
    : phone;
};
