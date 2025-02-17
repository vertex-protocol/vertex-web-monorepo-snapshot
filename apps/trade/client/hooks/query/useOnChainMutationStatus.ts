import { MutationStatus } from '@tanstack/react-query';
import { useOnChainTransactionState } from 'client/hooks/query/useOnChainTransactionState';

interface Params {
  mutationStatus: MutationStatus;
  txHash: string | undefined;
}

/**
 * Util hook for mutations where the tx goes on-chain, in which case the "loading" state also needs
 * to include the time it takes for the tx to be confirmed.
 */
export function useOnChainMutationStatus({ mutationStatus, txHash }: Params) {
  const onChainState = useOnChainTransactionState({
    txHash,
  });

  return {
    isLoading: mutationStatus === 'pending' || onChainState.type === 'pending',
    isSuccess: onChainState.type === 'confirmed',
  };
}
