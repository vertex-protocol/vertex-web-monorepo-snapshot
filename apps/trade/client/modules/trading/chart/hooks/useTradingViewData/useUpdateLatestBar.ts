import { nowInSeconds } from '@vertex-protocol/client';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import type { Bar } from 'public/charting_library';
import { MutableRefObject, useEffect } from 'react';
import { BarSubscriber } from './types';
import { getLastBarMapKey, syncBarOpenWithValue } from './utils';

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
  const { data: latestOrderFill } = useLatestOrderFill({
    productId: currentProductId,
  });

  // Update last bar when latest order fills come in
  useEffect(() => {
    if (!latestOrderFill || !currentProductId) {
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

      const nowSeconds = nowInSeconds();
      const { chartIntervalSeconds } = barSubscriber;
      const lastBarTimeSeconds = lastBar.time / 1000;

      const latestOrderFillPrice = latestOrderFill.price.toNumber();
      const latestOrderFillSize = removeDecimals(latestOrderFill.amount)
        .abs()
        .toNumber();

      // If the bar is from this period, we update its values and add to its volume.
      if (lastBarTimeSeconds > nowSeconds - chartIntervalSeconds) {
        const updatedBar = { ...lastBar };
        updatedBar.close = latestOrderFillPrice;
        updatedBar.low = Math.min(lastBar.close, updatedBar.close);
        updatedBar.high = Math.max(lastBar.close, updatedBar.close);
        updatedBar.volume = (lastBar.volume ?? 0) + latestOrderFillSize;

        chartKeyToLastBar.current.set(lastBarKey, updatedBar);
        barSubscriber.updateLatestBar(
          updatedBar,
          'in response to new latest order fill for this period',
        );
      } else {
        // If it's from a previous period, we create a new bar for the current period.
        const newBar: Bar = {
          close: latestOrderFillPrice,
          open: latestOrderFillPrice,
          high: latestOrderFillPrice,
          low: latestOrderFillPrice,
          volume: latestOrderFillSize,
          // Set time to the current period (now % interval is the elapsed time).
          time: (nowSeconds - (nowSeconds % chartIntervalSeconds)) * 1000,
        };
        const syncedNewBar = syncBarOpenWithValue(newBar, lastBar.close);

        chartKeyToLastBar.current.set(lastBarKey, syncedNewBar);
        barSubscriber.updateLatestBar(
          syncedNewBar,
          'in response to new latest order fill for a previous period',
        );
      }
    });
  }, [
    latestOrderFill,
    currentProductId,
    subscriberUIDToBarSubscriber,
    productIdToSubscriberUIDs,
    chartKeyToLastBar,
  ]);
}
