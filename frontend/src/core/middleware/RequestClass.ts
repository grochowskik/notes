import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { responseErrorHandler, loginListener } from '@/core';
import SessionManager from './SessionManager';
import RequestIdGenerator from './RequestIdGenerator';
import ErrorClassifier from './ErrorClassifier';
import {
  RequestClassConfig,
  ApiResponse,
  RequestMetadata,
  InterceptorName,
  InterceptorConfig,
} from './types';

type ConfigWithMetadata = InternalAxiosRequestConfig & {
  metadata?: RequestMetadata;
};

const INTERCEPTORS = {
  loginListener,
} as const;

export class RequestClass {
  protected readonly request: AxiosInstance;
  private sessionManager: SessionManager;
  private config: RequestClassConfig;

  constructor(config: RequestClassConfig = {}) {
    const {
      baseURL = '/api',
      enableRequestId = true,
      enablePerformanceTracking = true,
      ...interceptorOptions
    } = config;

    this.config = {
      baseURL,
      enableRequestId,
      enablePerformanceTracking,
      ...interceptorOptions,
    };

    this.sessionManager = new SessionManager();
    this.request = axios.create({ baseURL });

    this.setupRequestInterceptors();
    this.setupResponseInterceptors();
    this.applyConditionalInterceptors(interceptorOptions);
  }

  private setupRequestInterceptors(): void {
    this.request.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const startTime = Date.now();
        const session = this.sessionManager.getSession();

        if (session?.sid) {
          config.headers['Authorization'] = `Bearer ${session.sid}`;
        }

        if (this.config.enableRequestId) {
          const requestId = RequestIdGenerator.generate();
          config.headers['X-Request-ID'] = requestId;

          (config as ConfigWithMetadata).metadata = {
            requestId,
            timestamp: startTime,
            url: config.url || '',
          };
        }

        if (this.config.enablePerformanceTracking) {
          this.config.onRequestStart?.({
            requestId: config.headers['X-Request-ID'] as string,
            timestamp: startTime,
            url: config.url || '',
          });
        }

        return config;
      },
    );
  }

  private setupResponseInterceptors(): void {
    this.request.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>): AxiosResponse<ApiResponse> => {
        this.handleSuccessfulResponse(response);
        this.trackPerformance(response.config, Date.now());
        return response;
      },
      (error: AxiosError): Promise<never> => {
        this.trackError(error);
        responseErrorHandler(error);
        return Promise.reject(error);
      },
    );
  }

  private handleSuccessfulResponse(response: AxiosResponse<ApiResponse>): void {
    const { session, error } = response.data || {};

    if (session) {
      this.sessionManager.saveSession(session);
    }

    if (error) {
      this.handleApiError(error);
    }
  }

  private handleApiError(error: string | { message: string }): void {
    const message = typeof error === 'string' ? error : error.message;
    console.error('[API Error]', message);
  }

  private trackPerformance(config: ConfigWithMetadata, endTime: number): void {
    if (!this.config.enablePerformanceTracking || !config.metadata) return;

    const duration = endTime - config.metadata.timestamp;
    const metadata: RequestMetadata = {
      ...config.metadata,
      duration,
    };

    this.config.onRequestEnd?.(metadata);

    if (duration > 3000) {
      console.warn(`[Slow Request] ${config.url} took ${duration}ms`);
    }
  }

  private trackError(error: AxiosError): void {
    if (!this.config.enablePerformanceTracking) return;

    const config = error.config as ConfigWithMetadata;
    const metadata = config?.metadata;

    if (metadata) {
      this.config.onRequestError?.(metadata, error);
    }

    const classified = ErrorClassifier.classify(error);
    console.error('[Request Error]', {
      type: classified.type,
      url: config?.url,
      shouldRetry: classified.shouldRetry,
      retryAfter: classified.retryAfter,
    });
  }

  private applyConditionalInterceptors(options: InterceptorConfig): void {
    const defaultOptions = this.getDefaultInterceptorOptions();
    const mergedOptions = { ...defaultOptions, ...options };

    (
      Object.entries(INTERCEPTORS) as [InterceptorName, typeof loginListener][]
    ).forEach(([key, interceptor]) => {
      const optionKey = `use-${key}` as keyof InterceptorConfig;

      if (mergedOptions[optionKey]) {
        this.request.interceptors.response.use(interceptor);
      }
    });
  }

  private getDefaultInterceptorOptions(): InterceptorConfig {
    return (Object.keys(INTERCEPTORS) as InterceptorName[]).reduce(
      (acc, key) => {
        acc[`use-${key}` as keyof InterceptorConfig] = true;
        return acc;
      },
      {} as InterceptorConfig,
    );
  }

  get post() {
    return this.request.post.bind(this.request);
  }

  get get() {
    return this.request.get.bind(this.request);
  }

  get put() {
    return this.request.put.bind(this.request);
  }

  get patch() {
    return this.request.patch.bind(this.request);
  }

  get delete() {
    return this.request.delete.bind(this.request);
  }
}

export default RequestClass;
