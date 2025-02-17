import { useEVMContext } from '@vertex-protocol/react-client';
import { useCallback } from 'react';
import { isHex } from 'viem';
import { usePublicClient } from 'wagmi';

/**
 * A hook for retrieving a callback that:
 * - Takes in a promise that resolves to a transaction hash
 * - Waits for the transaction to be confirmed
 * - Returns the successful transaction receipt
 * - Throws an error if the transaction is rejected
 */
export function useGetConfirmedTx() {
  const {
    chainStatus: { connectedChain },
  } = useEVMContext();
  const publicClient = usePublicClient({ chainId: connectedChain?.id });

  return useCallback(
    async (txHashPromise: Promise<string>) => {
      if (!publicClient) {
        throw new Error('No public client available');
      }

      const hash = await txHashPromise;
      if (!isHex(hash)) {
        throw new Error(`Invalid transaction hash: ${hash}`);
      }

      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      if (transactionReceipt.status !== 'success') {
        throw new Error('Rejected transaction');
      }

      return { transactionReceipt, hash };
    },
    [publicClient],
  );
}
