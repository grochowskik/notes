import type { AxiosError } from 'axios';
import axios from 'axios';
import { ClassifiedError, ErrorType } from './types';

class ErrorClassifier {
  static classify(error: unknown): ClassifiedError {
    if (!axios.isAxiosError(error)) {
      return {
        type: ErrorType.UNKNOWN,
        originalError: error,
        shouldRetry: false,
      };
    }

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return {
        type: ErrorType.TIMEOUT,
        originalError: error,
        shouldRetry: true,
      };
    }

    if (!error.response) {
      return {
        type: ErrorType.NETWORK,
        originalError: error,
        shouldRetry: true,
      };
    }

    const status = error.response.status;

    if (status >= 500) {
      const retryAfter = this.getRetryAfter(error);
      return {
        type: ErrorType.SERVER,
        originalError: error,
        shouldRetry: true,
        retryAfter,
      };
    }

    if (status >= 400 && status < 500) {
      const shouldRetry = status === 408 || status === 429;
      const retryAfter = status === 429 ? this.getRetryAfter(error) : undefined;

      return {
        type: ErrorType.CLIENT,
        originalError: error,
        shouldRetry,
        retryAfter,
      };
    }

    return {
      type: ErrorType.UNKNOWN,
      originalError: error,
      shouldRetry: false,
    };
  }

  private static getRetryAfter(error: AxiosError): number | undefined {
    const retryAfter = error.response?.headers['retry-after'];

    if (!retryAfter) return undefined;

    const parsed = parseInt(retryAfter, 10);
    return isNaN(parsed) ? undefined : parsed * 1000;
  }

  static shouldRetry(
    error: unknown,
    attemptNumber: number,
    maxAttempts: number = 3
  ): boolean {
    if (attemptNumber >= maxAttempts) return false;

    const classified = this.classify(error);
    return classified.shouldRetry;
  }

  static getRetryDelay(error: unknown, attemptNumber: number): number {
    const classified = this.classify(error);

    if (classified.retryAfter) {
      return classified.retryAfter;
    }

    const baseDelay = 1000;
    const exponentialDelay = baseDelay * Math.pow(2, attemptNumber);
    const jitter = Math.random() * 1000;

    return Math.min(exponentialDelay + jitter, 10000);
  }
}

export default ErrorClassifier;
