import { toastError } from '@/hooks/useError';
import type { AxiosError } from 'axios';

const responseErrorHandler = (error: AxiosError): void => {
  toastError(error);
};

export default responseErrorHandler;
