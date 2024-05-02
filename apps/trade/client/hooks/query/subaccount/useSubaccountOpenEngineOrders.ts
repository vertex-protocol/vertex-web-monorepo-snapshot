import { useQuery } from '@tanstack/react-query';
import { EngineOrder } from '@vertex-protocol/engine-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { QueryState } from 'client/types/QueryState';

// Product ID -> EngineOrder[]
export type SubaccountOpenEngineOrders = Record<number, EngineOrder[]>;

export function subaccountOpenEngineOrdersQueryKey(
  chainId?: PrimaryChainID,
  sender?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountOpenEngineOrders',
    chainId,
    sender,
    subaccountName,
  );
}

/**
 * All open engine orders for the current subaccount
 * @param params
 */
export function useSubaccountOpenEngineOrders(): QueryState<SubaccountOpenEngineOrders> {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();
  const {
    currentSubaccount: { name, address },
  } = useSubaccountContext();
  const disabled = !vertexClient || !allProductIds?.length || !address;

  return useQuery({
    queryKey: subaccountOpenEngineOrdersQueryKey(primaryChainId, address, name),
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
    refetchInterval: 20000,
  });
}
