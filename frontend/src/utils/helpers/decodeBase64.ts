export const decodeBase64 = (base64: string) => {
  const text = atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
};
