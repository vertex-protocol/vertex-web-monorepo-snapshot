import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { useMemo } from 'react';
import {
  OrderFillNotificationData,
  OrderNotificationMetadata,
} from '../../../types';

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
      const baseProductMetadata = getBaseProductMetadata(market.metadata);

      return {
        ...baseProductMetadata,
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
