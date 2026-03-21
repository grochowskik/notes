import { describe, it, expect } from 'vitest';
import axios from 'axios';
import ErrorClassifier from '../ErrorClassifier';
import { ErrorType } from '../types';

function makeAxiosError(options: {
  code?: string;
  responseStatus?: number;
  responseHeaders?: Record<string, string>;
}) {
  const err = new axios.AxiosError('Test error', options.code);
  if (options.responseStatus !== undefined) {
    err.response = {
      status: options.responseStatus,
      headers: options.responseHeaders ?? {},
      data: {},
      statusText: '',
      config: err.config!,
    };
  }
  return err;
}

describe('ErrorClassifier.classify', () => {
  it('classifies a non-Axios error as UNKNOWN with no retry', () => {
    const result = ErrorClassifier.classify(new Error('generic'));
    expect(result.type).toBe(ErrorType.UNKNOWN);
    expect(result.shouldRetry).toBe(false);
  });

  it('classifies plain objects as UNKNOWN', () => {
    const result = ErrorClassifier.classify({ message: 'weird' });
    expect(result.type).toBe(ErrorType.UNKNOWN);
    expect(result.shouldRetry).toBe(false);
  });

  it('classifies ECONNABORTED as TIMEOUT with retry', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ code: 'ECONNABORTED' }),
    );
    expect(result.type).toBe(ErrorType.TIMEOUT);
    expect(result.shouldRetry).toBe(true);
  });

  it('classifies ETIMEDOUT as TIMEOUT with retry', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ code: 'ETIMEDOUT' }),
    );
    expect(result.type).toBe(ErrorType.TIMEOUT);
    expect(result.shouldRetry).toBe(true);
  });

  it('classifies network error (no response) as NETWORK with retry', () => {
    const result = ErrorClassifier.classify(makeAxiosError({}));
    expect(result.type).toBe(ErrorType.NETWORK);
    expect(result.shouldRetry).toBe(true);
  });

  it('classifies 5xx as SERVER with retry', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 500 }),
    );
    expect(result.type).toBe(ErrorType.SERVER);
    expect(result.shouldRetry).toBe(true);

    const result503 = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 503 }),
    );
    expect(result503.type).toBe(ErrorType.SERVER);
  });

  it('classifies 4xx (non-408/429) as CLIENT without retry', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 400 }),
    );
    expect(result.type).toBe(ErrorType.CLIENT);
    expect(result.shouldRetry).toBe(false);

    const result404 = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 404 }),
    );
    expect(result404.shouldRetry).toBe(false);
  });

  it('classifies 408 as CLIENT with retry', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 408 }),
    );
    expect(result.type).toBe(ErrorType.CLIENT);
    expect(result.shouldRetry).toBe(true);
  });

  it('classifies 429 as CLIENT with retry and extracts Retry-After header', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({
        responseStatus: 429,
        responseHeaders: { 'retry-after': '30' },
      }),
    );
    expect(result.type).toBe(ErrorType.CLIENT);
    expect(result.shouldRetry).toBe(true);
    expect(result.retryAfter).toBe(30_000);
  });

  it('returns undefined retryAfter when Retry-After header is absent', () => {
    const result = ErrorClassifier.classify(
      makeAxiosError({ responseStatus: 429 }),
    );
    expect(result.retryAfter).toBeUndefined();
  });
});

describe('ErrorClassifier.shouldRetry', () => {
  it('returns false when attempt has reached maxAttempts', () => {
    const networkError = makeAxiosError({});
    expect(ErrorClassifier.shouldRetry(networkError, 3, 3)).toBe(false);
    expect(ErrorClassifier.shouldRetry(networkError, 4, 3)).toBe(false);
  });

  it('returns true for a retryable error before maxAttempts', () => {
    const networkError = makeAxiosError({});
    expect(ErrorClassifier.shouldRetry(networkError, 0, 3)).toBe(true);
    expect(ErrorClassifier.shouldRetry(networkError, 2, 3)).toBe(true);
  });

  it('returns false for a non-retryable error regardless of attempt count', () => {
    const clientError = makeAxiosError({ responseStatus: 400 });
    expect(ErrorClassifier.shouldRetry(clientError, 0, 3)).toBe(false);
  });
});

describe('ErrorClassifier.getRetryDelay', () => {
  it('returns retryAfter in ms when present', () => {
    const error = makeAxiosError({
      responseStatus: 429,
      responseHeaders: { 'retry-after': '5' },
    });
    expect(ErrorClassifier.getRetryDelay(error, 0)).toBe(5_000);
  });

  it('returns exponential delay with jitter when no retryAfter', () => {
    const error = makeAxiosError({ responseStatus: 500 });
    const delay0 = ErrorClassifier.getRetryDelay(error, 0);
    const delay1 = ErrorClassifier.getRetryDelay(error, 1);

    expect(delay0).toBeGreaterThanOrEqual(1000);
    expect(delay0).toBeLessThanOrEqual(10_000);
    expect(delay1).toBeGreaterThanOrEqual(2000);
    expect(delay1).toBeLessThanOrEqual(10_000);
  });
});
