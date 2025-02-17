import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';
import { useCallback } from 'react';

export function useSelectedTickSpacingMultiplier(productId?: number) {
  const {
    savedUserSettings: {
      trading: { orderbookTickSpacingMultiplierByProductId },
    },
    setSavedUserSettings,
  } = useSavedUserSettings();

  const persistedTickSpacingMultiplierSelection = productId
    ? orderbookTickSpacingMultiplierByProductId[productId]
    : undefined;
  // Default tick spacing to 10x, this gives a good overview of the orderbook in the UI
  // Using a default of 1x would show too few price levels
  const tickSpacingMultiplier = persistedTickSpacingMultiplierSelection ?? 10;

  const setTickSpacingMultiplier = useCallback(
    (selectedValue: OrderbookPriceTickSpacingMultiplier) => {
      if (!productId) {
        console.warn(
          'Market not found, skip saving orderbook tick spacing multiplier',
        );
        return;
      }

      setSavedUserSettings((prev) => {
        prev.trading.orderbookTickSpacingMultiplierByProductId[productId] =
          selectedValue;

        return prev;
      });
    },
    [productId, setSavedUserSettings],
  );

  return {
    tickSpacingMultiplier,
    setTickSpacingMultiplier,
  };
}
