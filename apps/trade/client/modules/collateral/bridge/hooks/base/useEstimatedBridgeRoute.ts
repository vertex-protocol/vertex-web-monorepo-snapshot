import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { useQuery } from '@tanstack/react-query';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/base/useSquidSDK';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { getSquidRouteRequest } from 'client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useVertexClient } from '@vertex-protocol/web-data';
import { Squid } from '@0xsquid/sdk';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export type EstimatedBridgeRoute = Awaited<ReturnType<Squid['getRoute']>>;

function estimatedBridgeRouteQueryKey(
  subaccountAddress?: string,
  subaccountName?: string,
  bridgeParams?: BridgeRequestParams,
) {
  // This is a bit ugly, but results in a readable query key
  return createQueryKey(
    'estimateBridgeRoute',
    subaccountAddress,
    subaccountName,
    bridgeParams?.amount.toString(),
    bridgeParams?.sourceToken.chainId,
    bridgeParams?.sourceToken.symbol,
    bridgeParams?.destinationToken.chainId,
    bridgeParams?.destinationToken.symbol,
  );
}

export function useEstimatedBridgeRoute(
  params: BridgeRequestParams | undefined,
) {
  const squidSDK = useSquidSDK();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountAddr, name: subaccountName },
  } = useSubaccountContext();

  const disabled = !params || !squidSDK || !subaccountAddr || !vertexClient;

  return useQuery({
    queryKey: estimatedBridgeRouteQueryKey(
      subaccountAddr,
      subaccountName,
      params,
    ),
    queryFn: (): Promise<EstimatedBridgeRoute> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return squidSDK.getRoute(
        getSquidRouteRequest({
          ...params,
          subaccount: {
            address: subaccountAddr,
            name: subaccountName,
          },
          endpointAddress: vertexClient.context.contractAddresses.endpoint,
        }),
      );
    },
    enabled: !disabled,
  });
}
