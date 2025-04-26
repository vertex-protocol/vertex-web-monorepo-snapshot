import { VertexClient, WalletClientWithAccount } from '@vertex-protocol/client';
import {
  usePrimaryChainPublicClient,
  usePrimaryChainVertexClient,
  usePrimaryChainWalletClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { useCallback } from 'react';
import { PublicClient } from 'viem';

export interface ValidExecuteContext {
  /**
   * Vertex client on the current chain
   */
  vertexClient: VertexClient;
  /**
   * Public client on the current chain
   */
  publicClient: PublicClient;
  /**
   * Wallet client on the current chain
   */
  walletClient: WalletClientWithAccount;
  subaccount: Required<AppSubaccount>;
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
      const { address, chainEnv, chainId, name } = currentSubaccount;
      if (!address) {
        throw new Error('No connected address found');
      }

      const executeContext: ValidExecuteContext = {
        vertexClient,
        publicClient,
        walletClient,
        subaccount: {
          address,
          chainEnv,
          chainId,
          name,
        },
      };

      return fn(params, executeContext);
    },
    [currentSubaccount, fn, vertexClient, publicClient, walletClient],
  );
}
