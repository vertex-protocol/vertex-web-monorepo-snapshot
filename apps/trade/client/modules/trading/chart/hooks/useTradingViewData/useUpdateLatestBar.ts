import { removeDecimals } from '@vertex-protocol/utils';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { BarSubscriber } from 'client/modules/trading/chart/hooks/useTradingViewData/types';
import { getLastBarMapKey } from 'client/modules/trading/chart/hooks/useTradingViewData/utils';
import type { Bar } from 'public/charting_library';
import { MutableRefObject, useEffect } from 'react';

interface UseUpdateLatestBarParams {
  currentProductId: number | undefined;
  subscriberUIDToBarSubscriber: MutableRefObject<Map<string, BarSubscriber>>;
  productIdToSubscriberUIDs: MutableRefObject<Map<number, Set<string>>>;
  chartKeyToLastBar: MutableRefObject<Map<string, Bar>>;
}

export function useUpdateLatestBar({
  currentProductId,
  subscriberUIDToBarSubscriber,
  productIdToSubscriberUIDs,
  chartKeyToLastBar,
}: UseUpdateLatestBarParams) {
  const { data: latestFill } = useLatestOrderFill({
    productId: currentProductId,
  });

  // Update last bar when latest order fills come in
  useEffect(() => {
    if (!latestFill || !currentProductId) {
      return;
    }

    const subscriberUIDs =
      productIdToSubscriberUIDs.current.get(currentProductId);

    subscriberUIDs?.forEach((uid) => {
      const barSubscriber = subscriberUIDToBarSubscriber.current.get(uid);
      if (!barSubscriber) {
        return;
      }

      const lastBarKey = getLastBarMapKey(
        barSubscriber.productId,
        barSubscriber.chartIntervalSeconds,
      );
      const lastBar = chartKeyToLastBar.current.get(lastBarKey);

      if (!lastBar) {
        console.warn(
          '[useUpdateLastBar] No last bar was found for',
          lastBarKey,
        );
        return;
      }

      const { chartIntervalSeconds } = barSubscriber;
      const chartIntervalMillis = chartIntervalSeconds * 1000;

      const latestFillTimeMillis = latestFill.timestamp * 1000;
      const latestFillPrice = latestFill.price.toNumber();
      const latestFillSize = removeDecimals(latestFill.amount).abs().toNumber();

      // chart interval-adjusted time for the latest fill
      const latestFillBarTime =
        latestFillTimeMillis - (latestFillTimeMillis % chartIntervalMillis);

      if (latestFillBarTime < lastBar.time) {
        console.debug(
          `[useUpdateLastBar] Latest fill time is earlier than last bar time, ignoring stale update`,
        );
        return;
      }

      // reference bar we will update:
      // - if latest fill bar time is the same as the last bar, we'll update last bar
      // - if newer, we create a new bar with the open price set to the close of the last bar
      const referenceBar =
        latestFillBarTime === lastBar.time
          ? lastBar
          : ({
              time: latestFillBarTime,
              open: lastBar.close,
              low: lastBar.close,
              high: lastBar.close,
            } as Bar);

      // update reference bar with latest fill data
      const updatedBar = { ...referenceBar };
      updatedBar.close = latestFillPrice;
      updatedBar.low = Math.min(referenceBar.low, updatedBar.close);
      updatedBar.high = Math.max(referenceBar.high, updatedBar.close);
      updatedBar.volume = (referenceBar.volume ?? 0) + latestFillSize;

      chartKeyToLastBar.current.set(lastBarKey, updatedBar);
      barSubscriber.updateLatestBar(
        updatedBar,
        'in response to new latest order fill for this period',
      );
    });
  }, [
    latestFill,
    currentProductId,
    subscriberUIDToBarSubscriber,
    productIdToSubscriberUIDs,
    chartKeyToLastBar,
  ]);
}
