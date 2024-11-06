import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { TriggerOrderInfo } from '@vertex-protocol/trigger-client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import {
  getVertexClientHasLinkedSigner,
  useVertexClientHasLinkedSigner,
} from 'client/hooks/util/useVertexClientHasLinkedSigner';

// Product ID -> TriggerOrder[]
export type SubaccountOpenTriggerOrdersData = Record<
  number,
  TriggerOrderInfo[]
>;

export function subaccountOpenTriggerOrdersQueryKey(
  chainEnv?: ChainEnv,
  sender?: string,
  subaccountName?: string,
  // Without this in the query key, the query will be disabled but data will not be reset, resulting in "stale"
  // data from when 1CT was still enabled
  hasLinkedSigner?: boolean,
) {
  return createQueryKey(
    'currentSubaccountOpenTriggerOrders',
    chainEnv,
    sender,
    subaccountName,
    hasLinkedSigner,
  );
}

/**
 * All open trigger orders for the current subaccount
 */
export function useSubaccountOpenTriggerOrders() {
  const vertexClient = usePrimaryChainVertexClient();
  const hasLinkedSigner = useVertexClientHasLinkedSigner();
  const getRecvTime = useGetRecvTime();
  const {
    currentSubaccount: { name, address, chainEnv, chainId },
  } = useSubaccountContext();

  const disabled = !vertexClient || !address || !hasLinkedSigner;

  return useQuery({
    queryKey: subaccountOpenTriggerOrdersQueryKey(
      chainEnv,
      address,
      name,
      hasLinkedSigner,
    ),
    queryFn: async (): Promise<SubaccountOpenTriggerOrdersData> => {
      if (disabled || !getVertexClientHasLinkedSigner(vertexClient)) {
        throw new QueryDisabledError();
      }

      const recvTime = toBigDecimal(await getRecvTime());

      const allTriggerOrders = await vertexClient.market.getTriggerOrders({
        subaccountOwner: address,
        subaccountName: name,
        chainId,
        pending: true,
        recvTime,
      });

      const triggerOrdersByProductId: Record<number, TriggerOrderInfo[]> = {};

      allTriggerOrders.orders.forEach((info) => {
        const productId = info.order.productId;
        const orders = triggerOrdersByProductId[productId] ?? [];
        orders.push(info);
        triggerOrdersByProductId[productId] = orders;
      });

      return triggerOrdersByProductId;
    },
    enabled: !disabled,
    // This query is expensive, and our refetch-after-execute logic should take care of most data updates
    refetchInterval: 20000,
  });
}
