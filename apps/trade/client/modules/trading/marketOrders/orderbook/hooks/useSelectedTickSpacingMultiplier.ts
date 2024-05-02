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
  const tickSpacingMultiplier = persistedTickSpacingMultiplierSelection ?? 1;

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
