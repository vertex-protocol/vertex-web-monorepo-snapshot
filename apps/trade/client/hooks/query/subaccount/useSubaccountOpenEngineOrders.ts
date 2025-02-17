import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { EngineOrder } from '@vertex-protocol/engine-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryState } from 'client/types/QueryState';

// Product ID -> EngineOrder[]
export type SubaccountOpenEngineOrders = Record<number, EngineOrder[]>;

export function subaccountOpenEngineOrdersQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountOpenEngineOrders',
    chainEnv,
    sender,
    subaccountName,
  );
}

/**
 * All open engine orders for the current subaccount
 * @param params
 */
export function useSubaccountOpenEngineOrders(): QueryState<SubaccountOpenEngineOrders> {
  const vertexClient = usePrimaryChainVertexClient();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();
  const {
    currentSubaccount: { name, address, chainEnv },
  } = useSubaccountContext();
  const disabled = !vertexClient || !allProductIds?.length || !address;

  return useQuery({
    queryKey: subaccountOpenEngineOrdersQueryKey(chainEnv, address, name),
    queryFn: async (): Promise<SubaccountOpenEngineOrders> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const response =
        await vertexClient.market.getOpenSubaccountMultiProductOrders({
          subaccountOwner: address,
          subaccountName: name,
          productIds: allProductIds,
        });
      const multiProductOrders = response.productOrders;

      const productIdToOrders: SubaccountOpenEngineOrders = {};
      multiProductOrders.forEach((productOrders) => {
        productIdToOrders[productOrders.productId] = productOrders.orders;
      });

      return productIdToOrders;
    },
    enabled: !disabled,
    // This query is expensive, and our refetch-after-execute logic should take care of most data updates
    refetchInterval: 30000,
  });
}
