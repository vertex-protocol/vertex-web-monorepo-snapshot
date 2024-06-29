import { VertexClient } from '@vertex-protocol/client';
import {
  useEVMContext,
  usePrimaryChainPublicClient,
  usePrimaryChainVertexClient,
  usePrimaryChainWalletClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { Subaccount } from 'client/context/subaccount/types';
import { Signer } from 'ethers';
import { useCallback } from 'react';

export interface ValidExecuteContext {
  vertexClient: VertexClient;
  publicClient: NonNullable<ReturnType<typeof usePrimaryChainPublicClient>>;
  walletClient: NonNullable<ReturnType<typeof usePrimaryChainWalletClient>>;
  subaccount: Required<Subaccount>;
  signer: Signer;
}

/**
 * A simple higher order "hook" that takes in a function for executing an engine transaction,
 * but does pre-flight checks before sending it off
 */
export function useExecuteInValidContext<TParams = unknown, TData = unknown>(
  fn: (params: TParams, context: ValidExecuteContext) => Promise<TData>,
): (params: TParams) => Promise<TData> {
  const vertexClient = usePrimaryChainVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const walletClient = usePrimaryChainWalletClient();

  const {
    connectionStatus: { signer },
  } = useEVMContext();
  const { currentSubaccount } = useSubaccountContext();

  return useCallback(
    async (params: TParams) => {
      if (!vertexClient) {
        throw new Error('Vertex client not initialized');
      }
      if (!publicClient) {
        throw new Error('Public client not initialized');
      }
      if (!walletClient) {
        throw new Error('Wallet client not initialized');
      }

      // Need to destructure here for typecheck statement on address to work
      const { address, chainId, name } = currentSubaccount;
      if (!address || !signer) {
        throw new Error('Wallet not connected');
      }

      const executeContext: ValidExecuteContext = {
        vertexClient,
        publicClient,
        walletClient,
        signer,
        subaccount: {
          address,
          chainId,
          name,
        },
      };

      return fn(params, executeContext);
    },
    [currentSubaccount, fn, signer, vertexClient, publicClient, walletClient],
  );
}
