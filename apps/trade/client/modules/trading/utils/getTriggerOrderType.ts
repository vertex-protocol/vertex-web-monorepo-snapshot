import {
  TriggerOrderInfo,
  parseRawExpirationTimestamp,
} from '@vertex-protocol/client';
import { getIsTriggerPriceAbove } from 'client/modules/trading/tpsl/triggerCriteriaUtils';
import { TriggerOrderType } from 'client/modules/trading/types';

export function getTriggerOrderType(order: TriggerOrderInfo): TriggerOrderType {
  const { reduceOnly } = parseRawExpirationTimestamp(
    order.serverOrder.order.expiration,
  );

  if (!reduceOnly) {
    return 'stop';
  }

  // Reduce only order has reverse amount sign from position.
  const isLongPosition = order.order.amount.isNegative();

  // Order triggers above price
  const isTriggerPriceAbove = getIsTriggerPriceAbove(
    order.order.triggerCriteria.type,
  );

  // If current position > 0 (Long) has (Short) criteria price above. It's a take profit order.
  // If current position > 0 (Long) has (Short) criteria price bellow. It's a stop loss order.
  if (isLongPosition) {
    return isTriggerPriceAbove ? 'take_profit' : 'stop_loss';
  }

  // If current position < 0 (Short): has (Long) criteria price above. It's a stop loss order.
  // If current position < 0 (Short): has (Long) criteria price bellow. It's a take profit order.
  return isTriggerPriceAbove ? 'stop_loss' : 'take_profit';
}
