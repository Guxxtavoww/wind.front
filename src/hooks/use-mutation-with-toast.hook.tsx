import {
  useMutation,
  type DefaultError,
  type UseMutationResult,
  type UseMutationOptions,
  type UseBaseMutationResult,
} from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo, useRef, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';

/**
 * Options for using a mutation with toast notifications.
 *
 * @template TData - The type of data returned by the mutation. Defaults to `unknown`.
 * @template TError - The type of error returned by the mutation. Defaults to `DefaultError`.
 * @template TVariables - The type of variables passed to the mutation. Defaults to `void`.
 * @template TContext - The type of context passed to the mutation. Defaults to `unknown`.
 */
export interface UseMutationWithToastOptions<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  /**
   * Custom error message to display in the toast notification.
   */
  toastCustomError?: string;

  /**
   * Custom success message to display in the toast notification.
   */
  toastCustomSuccessMessage?: string;

  /**
   * Action element to include in the toast notification.
   */
  toastAction?: (
    mutationResult: UseMutationResult<TData, TError, TVariables, TContext>,
  ) => ReactNode;

  /**
   * The maximum number of retry attempts for the mutation.
   */
  retryLimit?: number;
}

const TOAST_MUTATION_ID = 'mutation-toast';

export function useMutationWithToast<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>({
  toastCustomSuccessMessage = 'Operação concluída com sucesso!',
  toastCustomError = 'Erro!',
  toastAction,
  onSuccess,
  onError,
  retryLimit = 3,
  ...options
}: UseMutationWithToastOptions<
  TData,
  TError,
  TVariables,
  TContext
>): UseBaseMutationResult<TData, TError, TVariables, TContext> & {
  isRetryAttemptsExceeded: boolean;
  disabled: boolean;
} {
  const retriesCountRef = useRef<number>(0);

  const isRetryAttemptsExceeded = useMemo(
    () => retriesCountRef.current >= retryLimit,
    [retriesCountRef.current, retryLimit],
  );

  const mutationResult = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    onSuccess: (data, variables, context) => {
      retriesCountRef.current = 0;

      toast.success(toastCustomSuccessMessage, { id: TOAST_MUTATION_ID });

      return onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (isRetryAttemptsExceeded) {
        toast.warning('Tentativas de repetição excedidas', {
          id: TOAST_MUTATION_ID,
          action: null,
          cancel: undefined,
        });

        return onError?.(error, variables, context);
      }

      let description: ReactNode;

      if (error instanceof Error) {
        description = error.message;
      } else {
        description = (
          <>
            <strong>Error:</strong>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        );
      }

      retriesCountRef.current++;

      toast.error(toastCustomError, {
        description,
        id: TOAST_MUTATION_ID,
        action: toastAction ? (
          toastAction(mutationResult)
        ) : (
          <Button
            onClick={() => {
              mutationResult.mutateAsync(variables);
              toast.dismiss(TOAST_MUTATION_ID);
            }}
            className="ml-auto"
            // isLoading={mutationResult.isPending}
            // disabled={mutationResult.isPending}
          >
            Tente de novo
          </Button>
        ),
      });

      return onError?.(error, variables, context);
    },
  });

  const disabled = useMemo(
    () => isRetryAttemptsExceeded || mutationResult.isPending,
    [isRetryAttemptsExceeded, mutationResult.isPending],
  );

  return {
    ...mutationResult,
    isRetryAttemptsExceeded,
    disabled,
  };
}
