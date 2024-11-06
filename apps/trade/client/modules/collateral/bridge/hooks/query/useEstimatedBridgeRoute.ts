import { Squid } from '@0xsquid/sdk';
import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSquidSDK } from 'client/modules/collateral/bridge/hooks/useSquidSDK';
import { getSquidRouteRequest } from 'client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';

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
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: { address: subaccountAddress, name: subaccountName },
  } = useSubaccountContext();

  const disabled = !params || !squidSDK || !subaccountAddress || !vertexClient;

  return useQuery({
    queryKey: estimatedBridgeRouteQueryKey(
      subaccountAddress,
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
          subaccountAddress,
          subaccountName,
          endpointAddress: vertexClient.context.contractAddresses.endpoint,
        }),
      );
    },
    enabled: !disabled,
  });
}
