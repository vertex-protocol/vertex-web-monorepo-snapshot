import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerMatchEventsParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { QueryState } from 'client/types/QueryState';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';

/**
 * The maximum shown in the UI + some buffer for filtering out RFQ matches.
 * Hardcoded here so we can avoid querying uniquely per `limit` and can share
 * with the WS handler. If we need more data, we can bump this number.
 */
export const LATEST_ORDER_FILLS_LIMIT = 75;

export interface LatestOrderFillsForProductParams<TSelectedData> {
  productId?: number;
  select?: (data: LatestOrderFill[]) => TSelectedData;
}

export interface LatestOrderFill {
  // A unique identifier for the order fill, used for better rendering performance
  id: string;
  // UNIX seconds
  timestamp: number;
  // Not decimal adjusted, negative for sell order
  amount: BigDecimal;
  price: BigDecimal;
}

export function latestOrderFillsForProductQueryKey(
  chainEnv?: ChainEnv,
  productId?: number,
) {
  return createQueryKey('latestOrderFills', chainEnv, productId);
}

export function useLatestOrderFillsForProduct<
  TSelectedData = LatestOrderFill[],
>({
  productId,
  select,
}: LatestOrderFillsForProductParams<TSelectedData>): QueryState<TSelectedData> {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient || !productId;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const params: GetIndexerMatchEventsParams = {
      productIds: [productId],
      limit: LATEST_ORDER_FILLS_LIMIT,
    };
    // Match events without a subaccount filter gives only taker orders, so no need to dedup here
    const baseData =
      await vertexClient.context.indexerClient.getMatchEvents(params);

    return baseData
      .filter((event) => {
        // RFQ orders are "private" so we don't want them to reflect in the public facing UI
        const isRfq = 'match_orders_r_f_q' in event.tx;
        // For non-USDC pairs, filtering on `product_id` will check both base & quote balances, so on a wETH-USDC market with an additional
        // mETH-wETH market, a fill on mETH-wETH will actually come back in the query for wETH-USDC. As such, we need to filter these events out
        const isCorrectProduct = (() => {
          if ('match_orders' in event.tx) {
            return event.tx.match_orders.product_id === productId;
          }
          // This should never happen
          return true;
        })();

        return !isRfq && isCorrectProduct;
      })
      .map((event): LatestOrderFill => {
        return {
          id: `${event.digest}_${event.submissionIndex}`,
          amount: event.baseFilled,
          price: calcOrderFillPrice(
            event.quoteFilled,
            event.totalFee,
            event.baseFilled,
          ),
          timestamp: event.timestamp.toNumber(),
        };
      });
  };

  return useQuery({
    queryKey: latestOrderFillsForProductQueryKey(primaryChainEnv, productId),
    queryFn,
    enabled: !disabled,
    select,
    // Refetch intervals are handled in useTradingWebsocketSubscriptions
    // IMPORTANT: If this is ever used outside of a trading page, we need to add refetch interval to params
  });
}
