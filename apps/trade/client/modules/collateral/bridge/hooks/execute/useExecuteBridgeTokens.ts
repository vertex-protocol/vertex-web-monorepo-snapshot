import { useMutation } from '@tanstack/react-query';
import {
  useEVMContext,
  walletClientToSigner,
} from '@vertex-protocol/react-client';
import { toPrintableObject } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useSquidSDKQuery } from 'client/modules/collateral/bridge/hooks/useSquidSDKQuery';
import { getSquidRouteRequest } from 'client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { useCallback } from 'react';

export function useExecuteBridgeTokens() {
  const squidSDK = useSquidSDKQuery();
  const {
    connectionStatus: { walletClient },
  } = useEVMContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: BridgeRequestParams, context) => {
        if (!squidSDK) {
          throw new Error('Squid SDK not initialized');
        }
        // Note: we need to use `walletClient` from EVMContext instead of `context.walletClient`
        // This is because the wallet client is NOT expected to be on the primary chain (as we're bridging from a another chain)
        // but `context.walletClient` is set to the primary chain
        if (!walletClient) {
          throw new Error('Wallet client not initialized');
        }

        const signer = walletClientToSigner(walletClient);
        const endpointAddress =
          context.vertexClient.context.contractAddresses.endpoint;

        const transferParams = getSquidRouteRequest({
          ...params,
          subaccountAddress: context.subaccount.address,
          subaccountName: context.subaccount.name,
          endpointAddress,
        });
        console.log(
          '[useExecuteBridgeTokens] Bridging tokens',
          toPrintableObject(params),
          toPrintableObject(transferParams),
        );

        // Note: eventually requestId and integratorId will be required to use the Status API
        const { route } = await squidSDK.getRoute({
          ...transferParams,
          quoteOnly: false,
        });

        const txResponse = (await squidSDK.executeRoute({
          route,
          signer,
        })) as { hash: string };

        return txResponse.hash;
      },
      [squidSDK, walletClient],
    ),
  );

  return useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('BridgeTokens', error, variables);
    },
  });
}
