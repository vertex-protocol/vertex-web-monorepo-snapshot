import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import {
  OrderFillNotificationData,
  OrderNotificationMetadata,
} from 'client/modules/notifications/types';
import { isTpSlOrderSize } from 'client/modules/trading/tpsl/utils/isTpSlOrderSize';
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

    // TPSL orders are placed with a very large amount to close the entire position, so fractionFilled will be derived
    // improperly if we don't do this check
    const isTpSlOrderWithMaxSize = isTpSlOrderSize(removeDecimals(totalAmount));
    // Backend events have SLIGHT rounding errors, so in some cases we end up with a fill amount slightly greater than 1
    const fractionFilled = isTpSlOrderWithMaxSize
      ? BigDecimals.ONE
      : newOrderFilledAmount.div(totalAmount).precision(2);
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
