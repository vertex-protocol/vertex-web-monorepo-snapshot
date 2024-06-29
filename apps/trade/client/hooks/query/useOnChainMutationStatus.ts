import { MutationStatus } from '@tanstack/react-query';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';
import { TxResponse } from 'client/types/TxResponse';

interface Params {
  mutationStatus: MutationStatus;
  txResponse: TxResponse | undefined;
}

/**
 * Util hook for mutations where the tx goes on-chain, in which case the "loading" state also needs
 * to include the time it takes for the tx to be confirmed.
 */
export function useOnChainMutationStatus({
  mutationStatus,
  txResponse,
}: Params) {
  const onChainState = useOnChainTransactionState({
    txResponse,
  });

  return {
    isLoading: mutationStatus === 'pending' || onChainState.type === 'pending',
    isSuccess: onChainState.type === 'confirmed',
  };
}
