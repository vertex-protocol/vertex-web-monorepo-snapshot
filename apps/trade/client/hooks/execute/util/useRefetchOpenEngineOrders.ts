import { useQueryClient } from '@tanstack/react-query';
import { asyncResult } from '@vertex-protocol/utils';
import {
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  SubaccountOpenEngineOrders,
  subaccountOpenEngineOrdersQueryKey,
} from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { useCallback } from 'react';

export function useRefetchOpenEngineOrders() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const queryClient = useQueryClient();
  const {
    currentSubaccount: { name: subaccountName, address: subaccountOwner },
  } = useSubaccountContext();

  return useCallback(
    async (productIds: number[]) => {
      if (!subaccountOwner || !vertexClient || !productIds.length) {
        return;
      }

      const refetchFn = async () => {
        const [newOrdersForProducts, error] = await asyncResult(
          vertexClient.market.getOpenSubaccountMultiProductOrders({
            productIds,
            subaccountName,
            subaccountOwner,
          }),
        );

        const queryKey = subaccountOpenEngineOrdersQueryKey(
          primaryChainId,
          subaccountOwner,
          subaccountName,
        );

        if (!newOrdersForProducts || error) {
          // We couldn't load up-to-date data, so mark queries as stale (we don't want to refetch immediately as its unlikely
          // that a second query will succeed if the first fails
          queryClient.invalidateQueries({
            queryKey,
          });
          return;
        }

        queryClient.setQueriesData<SubaccountOpenEngineOrders>(
          {
            queryKey,
          },
          (prevData) => {
            const newData = {
              ...prevData,
            };

            newOrdersForProducts.productOrders.forEach((ordersForProduct) => {
              newData[ordersForProduct.productId] = ordersForProduct.orders;
            });

            return newData;
          },
        );
      };

      setTimeout(refetchFn, 50);
    },
    [
      primaryChainId,
      queryClient,
      subaccountName,
      subaccountOwner,
      vertexClient,
    ],
  );
}
