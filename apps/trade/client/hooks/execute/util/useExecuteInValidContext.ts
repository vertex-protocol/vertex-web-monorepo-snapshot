import { VertexClient } from '@vertex-protocol/client';
import { useEVMContext, useVertexClient } from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { Subaccount } from 'client/context/subaccount/types';
import { useCallback, useMemo } from 'react';
import { Chain } from 'viem';

export interface ValidExecuteContext {
  primaryChain: Chain;
  vertexClient: VertexClient;
  subaccount: Required<Subaccount>;
}

/**
 * A simple higher order "hook" that takes in a function for executing an engine transaction,
 * but does pre-flight checks before sending it off
 */
export function useExecuteInValidContext<TParams = unknown, TData = unknown>(
  fn: (params: TParams, context: ValidExecuteContext) => Promise<TData>,
): (params: TParams) => Promise<TData> {
  const vertexClient = useVertexClient();
  const { connectionStatus, primaryChain } = useEVMContext();
  const {
    currentSubaccount: { name: currentSubaccountName },
  } = useSubaccountContext();

  const executeContext = useMemo((): ValidExecuteContext | undefined => {
    if (!vertexClient) {
      return;
    }
    if (connectionStatus.type !== 'connected') {
      return;
    }

    return {
      vertexClient,
      primaryChain,
      subaccount: {
        name: currentSubaccountName,
        address: connectionStatus.address,
      },
    };
  }, [
    connectionStatus.address,
    connectionStatus.type,
    currentSubaccountName,
    primaryChain,
    vertexClient,
  ]);

  return useCallback(
    async (params: TParams) => {
      if (connectionStatus.type !== 'connected') {
        throw new Error('Wallet not connected');
      }
      if (!executeContext) {
        throw new Error('Execution context not initialized');
      }
      return fn(params, executeContext);
    },
    [connectionStatus.type, executeContext, fn],
  );
}
