import { BigDecimals } from '@vertex-protocol/utils';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { isHighSpread } from 'client/modules/trading/utils/isHighSpread';
import { useMemo } from 'react';

export function useIsHighSpread(productId: number | undefined) {
  const { data: latestMarketPrice } = useLatestMarketPrice({
    productId,
  });

  return useMemo(() => {
    if (
      !productId ||
      !latestMarketPrice?.safeAsk ||
      !latestMarketPrice?.safeBid
    ) {
      return false;
    }

    const spread = latestMarketPrice.safeAsk.minus(latestMarketPrice.safeBid);

    const spreadFrac = latestMarketPrice.safeAverage
      ? spread.div(latestMarketPrice.safeAverage)
      : BigDecimals.ZERO;

    return isHighSpread(spreadFrac);
  }, [latestMarketPrice, productId]);
}
