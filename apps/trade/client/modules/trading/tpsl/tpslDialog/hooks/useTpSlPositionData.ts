import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { TpSlPositionData } from 'client/modules/trading/tpsl/tpslDialog/types';
import { useMemo } from 'react';

export function useTpSlPositionData({
  productId,
  isoSubaccountName,
}: {
  productId: number;
  isoSubaccountName: string | null;
}): TpSlPositionData | undefined {
  const { data: positionsData } = usePerpPositions();
  const { data: staticMarketsData } = useAllMarketsStaticData();
  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });

  return useMemo(() => {
    const staticMarketData = staticMarketsData?.perp[productId];
    const sizeIncrement = staticMarketData?.sizeIncrement;
    const priceIncrement = staticMarketData?.priceIncrement;
    const longWeightInitial = staticMarketData?.longWeightInitial;

    const perpPositionItem = positionsData?.find((position) => {
      const matchesProductId = position.productId === productId;
      const matchesMarginMode =
        position.iso?.subaccountName === (isoSubaccountName ?? undefined);

      return matchesProductId && matchesMarginMode;
    });

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
      isoLeverage: perpPositionItem.iso?.leverage,
      sizeIncrement,
      priceIncrement,
      longWeightInitial,
    };
  }, [
    isoSubaccountName,
    latestOrderFillPrice?.price,
    positionsData,
    productId,
    staticMarketsData?.perp,
  ]);
}
