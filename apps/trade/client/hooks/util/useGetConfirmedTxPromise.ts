import {
  useEthersProvider,
  usePrimaryChainId,
} from '@vertex-protocol/react-client';
import { TxResponse } from 'client/types/TxResponse';
import { useCallback } from 'react';

export function useGetConfirmedTxPromise() {
  const primaryChainId = usePrimaryChainId();
  const provider = useEthersProvider({ chainId: primaryChainId });

  return useCallback(
    async (
      txResponsePromise: // This is in an object for compatibility with ethers ContractTransactionResponse
      Promise<TxResponse>,
    ) => {
      if (!provider) {
        throw new Error('Could not find provider to get transaction details');
      }
      const hash = (await txResponsePromise).hash;
      const transactionReceipt = await provider.waitForTransaction(hash);
      if (transactionReceipt?.status !== 1) {
        throw new Error('Rejected transaction');
      }
      return transactionReceipt;
    },
    [provider],
  );
}
