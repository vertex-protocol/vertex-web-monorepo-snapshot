import { useQuery } from '@tanstack/react-query';
import {
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { TxResponse } from 'client/types/TxResponse';
import { TransactionReceipt } from 'ethers';
import { useMemo } from 'react';

interface Params {
  txResponse: TxResponse | undefined;
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
  const {
    chainStatus: { connectedChain },
  } = useEVMContext();
  const getConfirmedTxPromise = useGetConfirmedTxPromise();

  const disabled = !txResponse || !connectedChain;
  const { data, error, isLoading } = useQuery({
    queryKey: ['onChainTransactionState', connectedChain?.id, txResponse?.hash],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return getConfirmedTxPromise(Promise.resolve(txResponse));
    },
    enabled: !disabled,
  });

  return useMemo((): UseOnChainTransactionState => {
    if (data) {
      // getConfirmedTxPromise checks for `status` of value 1, so no need to check data.status here
      return {
        type: 'confirmed',
        receipt: data,
        error: undefined,
      };
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
