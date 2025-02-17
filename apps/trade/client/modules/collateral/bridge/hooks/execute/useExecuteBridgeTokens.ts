import { useMutation } from '@tanstack/react-query';
import {
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { toPrintableObject } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/useSquidSDK';
import { getSquidRouteRequest } from 'client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { useCallback } from 'react';

export function useExecuteBridgeTokens() {
  const squidSDK = useSquidSDK();
  const vertexClient = usePrimaryChainVertexClient();

  const {
    connectionStatus: { signer },
  } = useEVMContext();
  const endpointAddress = vertexClient?.context.contractAddresses.endpoint;

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: BridgeRequestParams, context) => {
        if (!squidSDK) {
          throw Error('Squid SDK not initialized');
        }
        if (!endpointAddress) {
          throw Error('No Vertex endpoint address');
        }
        if (!signer) {
          throw Error('Signer not initialized');
        }

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
      [endpointAddress, signer, squidSDK],
    ),
  );

  return useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('BridgeTokens', error, variables);
    },
  });
}
