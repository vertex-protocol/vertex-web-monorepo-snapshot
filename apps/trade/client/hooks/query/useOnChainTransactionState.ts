import { useMemo } from 'react';
import { TransactionReceipt, TransactionResponse } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { usePrimaryChainId } from '@vertex-protocol/web-data';

interface Params {
  txResponse?: TransactionResponse;
}

type UseOnChainTransactionState =
  | {
      type: 'idle';
      receipt: undefined;
      error: undefined;
    }
  | {
      type: 'pending';
      receipt: undefined;
      error: undefined;
    }
  | {
      type: 'confirmed';
      receipt: TransactionReceipt;
      error: undefined;
    }
  | {
      type: 'error';
      receipt?: TransactionReceipt;
      error?: unknown;
    };

export function useOnChainTransactionState({
  txResponse,
}: Params): UseOnChainTransactionState {
  const primaryChainId = usePrimaryChainId();
  const disabled = !txResponse;
  const { data, error, isLoading } = useQuery({
    queryKey: ['onChainTransactionState', primaryChainId, txResponse?.hash],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return txResponse.wait();
    },
    enabled: !disabled,
  });

  return useMemo((): UseOnChainTransactionState => {
    if (data) {
      if (data.status === 1) {
        return {
          type: 'confirmed',
          receipt: data,
          error: undefined,
        };
      } else {
        return {
          type: 'error',
          receipt: data,
          error: error ?? new Error(`Transaction ${data?.hash} reverted`),
        };
      }
    } else if (isLoading) {
      return {
        type: 'pending',
        receipt: undefined,
        error: undefined,
      };
    } else if (error) {
      return {
        type: 'error',
        receipt: data ?? undefined,
        error,
      };
    } else {
      return {
        type: 'idle',
        error: undefined,
        receipt: undefined,
      };
    }
  }, [data, error, isLoading]);
}
