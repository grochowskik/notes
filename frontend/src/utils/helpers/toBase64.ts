export const imageToBase64 = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result?.toString().replace(/^.*,/, '');
      resolve(base64);
    };
    reader.onerror = () => {};
  });
};

const toBase64 = (file: File, agreementId: string = '') => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const fileContent = reader.result?.toString() || '';
      const modifiedContent = agreementId
        ? `AGREEMENT-ID=${agreementId}\n${fileContent}`
        : fileContent;

      const utf8Bytes = new TextEncoder().encode(modifiedContent);

      let binary = '';
      const chunkSize = 8192;

      for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        const chunk = utf8Bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
      }

      const base64 = btoa(binary);
      resolve(base64);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export default toBase64;
