import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { toPrintableObject } from '@vertex-protocol/utils';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/base/useSquidSDK';
import { useEVMContext, useVertexClient } from '@vertex-protocol/web-data';
import { getSquidRouteRequest } from 'client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { ContractTransactionResponse } from 'ethers';

export function useExecuteBridgeTokens() {
  const squidSDK = useSquidSDK();
  const vertexClient = useVertexClient();

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
          subaccount: context.subaccount,
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
        })) as ContractTransactionResponse;

        return txResponse;
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
