export const formatNip = (nip: string, withCountryCode = false): string => {
  const isDigits = /^\d+$/.test(nip);
  return isDigits
    ? nip
    : withCountryCode
      ? `${nip?.slice(0, 2)} ${nip?.slice(2)}`
      : nip?.slice(2);
};
