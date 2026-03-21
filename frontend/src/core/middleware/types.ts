export interface SessionData {
  is_user_logged_in: boolean;
  sid: string;
  csrf_token: string;
  lifetime?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T = unknown> {
  result?: T;
  session?: SessionData;
  error?: string | ApiError;
}

export interface ExtendedRequestData {
  session?: SessionData | null;
  request?: unknown;
  [key: string]: unknown;
}

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface RequestMetadata {
  requestId: string;
  timestamp: number;
  url: string;
  duration?: number;
}

export type InterceptorName = 'loginListener';

export type InterceptorConfig = {
  [K in InterceptorName as `use-${K}`]?: boolean;
};

export interface RequestClassConfig extends InterceptorConfig {
  baseURL?: string;
  enableRequestId?: boolean;
  enablePerformanceTracking?: boolean;
  onRequestStart?: (metadata: RequestMetadata) => void;
  onRequestEnd?: (metadata: RequestMetadata) => void;
  onRequestError?: (metadata: RequestMetadata, error: unknown) => void;
}

export enum ErrorType {
  NETWORK = 'NETWORK',
  TIMEOUT = 'TIMEOUT',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN',
}

export interface ClassifiedError {
  type: ErrorType;
  originalError: unknown;
  shouldRetry: boolean;
  retryAfter?: number;
}
