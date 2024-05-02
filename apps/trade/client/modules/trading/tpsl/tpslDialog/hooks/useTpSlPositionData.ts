import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useMemo } from 'react';
import { TpSlPositionData } from '../types';

export function useTpSlPositionData({
  productId,
}: {
  productId: number;
}): TpSlPositionData | undefined {
  const { data: positionsData } = usePerpPositions();
  const { data: staticMarketsData } = useAllMarketsStaticData();
  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });

  return useMemo(() => {
    const staticMarketData = staticMarketsData?.perp[productId];
    const sizeIncrement = staticMarketData?.sizeIncrement;
    const priceIncrement = staticMarketData?.priceIncrement;

    // Perp Position Item
    const perpPositionItem = positionsData?.find(
      (position) => position.productId === productId,
    );

    if (!perpPositionItem) {
      return;
    }

    return {
      metadata: perpPositionItem.metadata,
      amount: perpPositionItem.amount,
      pnlInfo: {
        estimatedPnlUsd: perpPositionItem.estimatedPnlUsd,
        estimatedPnlFrac: perpPositionItem.estimatedPnlFrac,
      },
      averageEntryPrice: perpPositionItem.price.averageEntryPrice,
      lastPrice: latestOrderFillPrice?.price,
      fastOraclePrice: perpPositionItem.price.fastOraclePrice,
      sizeIncrement,
      priceIncrement,
    };
  }, [latestOrderFillPrice, positionsData, productId, staticMarketsData]);
}
