import { useQuery } from '@tanstack/react-query';
import { GetIndexerMatchEventsParams } from '@vertex-protocol/indexer-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { QueryState } from 'client/types/QueryState';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';

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
  chainId?: PrimaryChainID,
  productId?: number,
) {
  return createQueryKey('latestOrderFills', chainId, productId);
}

export function useLatestOrderFillsForProduct<
  TSelectedData = LatestOrderFill[],
>({
  productId,
  select,
}: LatestOrderFillsForProductParams<TSelectedData>): QueryState<TSelectedData> {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient || !productId;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const params: GetIndexerMatchEventsParams = {
      productIds: [productId],
      // This will be the maximum that we should need on the UI + some buffer for filtering out RFQ matches, because we want to avoid
      // querying uniquely per `limit`, we hardcode it here. If we need more data, we can bump this number
      limit: 75,
    };
    // Match events without a subaccount filter gives only taker orders, so no need to dedup here
    const baseData =
      await vertexClient.context.indexerClient.getMatchEvents(params);

    return baseData
      .filter((event) => {
        // RFQ orders are "private" so we don't want them to reflect in the public facing UI
        const isRfq = 'match_orders_r_f_q' in event.tx;
        return !isRfq;
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
    queryKey: latestOrderFillsForProductQueryKey(primaryChainId, productId),
    queryFn,
    enabled: !disabled,
    select,
    // Refetch intervals are handled in useTradingWebsocketSubscriptions
    // IMPORTANT: If this is ever used outside of a trading page, we need to add refetch interval to params
  });
}
