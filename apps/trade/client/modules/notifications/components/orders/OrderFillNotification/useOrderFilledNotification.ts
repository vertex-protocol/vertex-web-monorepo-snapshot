import { removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import {
  OrderFillNotificationData,
  OrderNotificationMetadata,
} from 'client/modules/notifications/types';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

export function useOrderFilledNotification(data: OrderFillNotificationData) {
  const { data: marketsStaticData } = useAllMarketsStaticData();
  const {
    productId,
    isTrigger,
    fillPrice,
    newOrderFilledAmount,
    orderType,
    totalAmount,
  } = data;

  const market = marketsStaticData?.all[productId];

  return useMemo(() => {
    if (!market) {
      return undefined;
    }
    const metadata: OrderNotificationMetadata = (() => {
      const priceIncrement = market.priceIncrement;
      const sizeIncrement = market.sizeIncrement;
      const sharedProductMetadata = getSharedProductMetadata(market.metadata);

      return {
        ...sharedProductMetadata,
        marketName: market.metadata.marketName,
        priceIncrement,
        sizeIncrement,
      };
    })();

    const isTriggerOrder = isTrigger;

    // Backend events have SLIGHT rounding errors, so in some cases we end up with a fill amount slightly greater than 1
    const fractionFilled = newOrderFilledAmount.div(totalAmount).precision(2);
    const isLimitOrder = orderType === 'limit' || orderType === 'limit_reduce';

    return {
      market,
      metadata,
      isTriggerOrder,
      fillPrice,
      orderType,
      currentFilledAmount: newOrderFilledAmount,
      decimalAdjustedFilledAmount: removeDecimals(newOrderFilledAmount),
      fractionFilled,
      fillStatus: fractionFilled.eq(1) ? 'full' : 'partial',
      isUnfilledLimitOrder: isLimitOrder && fractionFilled.lt(1),
    };
  }, [
    market,
    totalAmount,
    isTrigger,
    newOrderFilledAmount,
    fillPrice,
    orderType,
  ]);
}
