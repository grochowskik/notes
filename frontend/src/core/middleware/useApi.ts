import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import ErrorClassifier from './ErrorClassifier';
import { getRequestClass } from './requestInstance';
import { ApiResponse } from './types';

const CACHE_TIME = 5 * 60 * 1000;

interface ApiQueryOptions {
  enabled?: boolean;
}

interface ApiMutationOptions<TRequest, TResponse> {
  invalidateQueriesList?: string[];
  onSuccess?: (data: TResponse, variables: TRequest) => void;
  onError?: (error: Error, variables: TRequest) => void;
}

interface ApiMutationResult<TRequest, TResponse> extends Omit<
  UseMutationResult<TResponse, Error, TRequest>,
  'mutate'
> {
  mutate: (variables: TRequest) => Promise<TResponse>;
  mutateSync: UseMutationResult<TResponse, Error, TRequest>['mutate'];
}

type HttpMutationMethod = 'post' | 'put' | 'patch' | 'delete';

export function useGet<TData = unknown, TParams = unknown>(
  url: string,
  params?: TParams,
  options: ApiQueryOptions = {}
): UseQueryResult<TData, Error> {
  return useQuery<TData, Error>({
    queryKey: [url, params],
    queryFn: async (): Promise<TData> => {
      const response = await getRequestClass().get<ApiResponse<TData>>(url, {
        params,
      });
      return response.data.result as TData;
    },
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) =>
      ErrorClassifier.shouldRetry(error, failureCount),
    retryDelay: (attemptIndex, error) =>
      ErrorClassifier.getRetryDelay(error, attemptIndex),
    ...options,
  });
}

function useMutationByMethod<TRequest = unknown, TResponse = unknown>(
  method: HttpMutationMethod,
  url: string,
  options: ApiMutationOptions<TRequest, TResponse> = {}
): ApiMutationResult<TRequest, TResponse> {
  const queryClient = useQueryClient();
  const { invalidateQueriesList, onSuccess, onError } = options;

  const mutation = useMutation<TResponse, Error, TRequest>({
    mutationFn: async (params: TRequest): Promise<TResponse> => {
      const rc = getRequestClass();
      const response =
        method === 'delete'
          ? await rc.delete<ApiResponse<TResponse>>(url, { data: params })
          : await (rc[method] as typeof rc.post)<ApiResponse<TResponse>>(
              url,
              params
            );
      return response.data.result as TResponse;
    },
    onSuccess: (data, variables) => {
      if (invalidateQueriesList) {
        invalidateQueriesList.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: [key] })
        );
      }
      onSuccess?.(data, variables);
    },
    onError,
    retry: (failureCount, error) =>
      ErrorClassifier.shouldRetry(error, failureCount),
    retryDelay: (attemptIndex, error) =>
      ErrorClassifier.getRetryDelay(error, attemptIndex),
  });

  return {
    ...mutation,
    mutate: mutation.mutateAsync,
    mutateSync: mutation.mutate,
  };
}

export function usePost<TRequest = unknown, TResponse = unknown>(
  url: string,
  options: ApiMutationOptions<TRequest, TResponse> = {}
): ApiMutationResult<TRequest, TResponse> {
  return useMutationByMethod<TRequest, TResponse>('post', url, options);
}

export function usePut<TRequest = unknown, TResponse = unknown>(
  url: string,
  options: ApiMutationOptions<TRequest, TResponse> = {}
): ApiMutationResult<TRequest, TResponse> {
  return useMutationByMethod<TRequest, TResponse>('put', url, options);
}

export function usePatch<TRequest = unknown, TResponse = unknown>(
  url: string,
  options: ApiMutationOptions<TRequest, TResponse> = {}
): ApiMutationResult<TRequest, TResponse> {
  return useMutationByMethod<TRequest, TResponse>('patch', url, options);
}

export function useDelete<TRequest = unknown, TResponse = unknown>(
  url: string,
  options: ApiMutationOptions<TRequest, TResponse> = {}
): ApiMutationResult<TRequest, TResponse> {
  return useMutationByMethod<TRequest, TResponse>('delete', url, options);
}
