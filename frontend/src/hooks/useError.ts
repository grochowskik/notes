'use client';

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';

type ErrorType = AxiosError | null | Error | { message: string };

type OutputErrorMessage = {
  message?: string;
  requestURL?: string;
  code?: string;
  response?: unknown;
  area?: string;
  requestId?: string;
  id: string;
};

const normalizeError = (err: unknown): OutputErrorMessage => {
  if (typeof err === 'string') {
    return { message: err, id: err };
  }
  if (isAxiosError(err)) {
    const requestURL = err.request?.responseURL as string | undefined;
    const { code, response, message } = err;
    const id = `${code}:${requestURL}`;
    return { message, requestURL, code, response, id };
  }
  if (err instanceof Error) {
    return { message: err.message, id: 'error' };
  }
  return { id: 'unknown' };
};

export const toastError = (error: ErrorType, customTitle?: string) => {
  const { id, ...normError } = normalizeError(error);
  const options = {
    toastId: id,
    className: 'error-popup',
  };
  toast.error(customTitle ?? (normError.message as string), options);
};

export function useError(error: ErrorType | ErrorType[], customTitle?: string) {
  useEffect(() => {
    const errors = Array.isArray(error) ? error : [error];
    errors.forEach((er) => {
      if (er) {
        toastError(er, customTitle);
      }
    });
  }, [customTitle, error]);
}
