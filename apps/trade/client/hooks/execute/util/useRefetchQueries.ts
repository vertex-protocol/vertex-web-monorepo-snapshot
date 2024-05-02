import { useQueryClient } from '@tanstack/react-query';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import { TransactionResponse } from 'ethers';
import { useEffect } from 'react';

/**
 * Refetches queries after a delay.
 *
 * @param queryKeys
 * @param afterMillis
 */
export function useRefetchQueries(
  queryKeys: unknown[][],
  afterMillis: number = 50,
) {
  const queryClient = useQueryClient();

  return () => {
    return setTimeout(() => {
      queryKeys.forEach((queryKey) =>
        queryClient.refetchQueries({
          queryKey,
          type: 'active',
        }),
      );
    }, afterMillis);
  };
}

/**
 * Refetches queries when a contract transaction is confirmed.
 *
 * @param queryKeys must be stable (i.e. a const or a memoized value)
 * @param txResponse
 * @param afterMillis
 */
export function useRefetchQueriesOnContractTransaction(
  queryKeys: unknown[][],
  txResponse: TransactionResponse | undefined,
  afterMillis: number = 2000,
) {
  const queryClient = useQueryClient();

  const { type } = useOnChainTransactionState({
    txResponse,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (type === 'confirmed') {
      timeout = setTimeout(() => {
        queryKeys.forEach((queryKey) =>
          queryClient.refetchQueries({
            queryKey,
            type: 'active',
          }),
        );
      }, afterMillis);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [afterMillis, queryClient, queryKeys, type]);
}
