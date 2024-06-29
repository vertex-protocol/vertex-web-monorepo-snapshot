import { BigDecimal, TriggerCriteriaType } from '@vertex-protocol/client';
import { OrderType } from 'client/modules/trading/types';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';

interface ValidateModifiedLimitOrderParams {
  isLongOrder: boolean;
  newPrice: BigDecimal;
  marketPrice: BigDecimal | undefined;
}

export function validateModifiedLimitOrderPrice({
  isLongOrder,
  newPrice,
  marketPrice,
}: ValidateModifiedLimitOrderParams) {
  // If we don't have a market price for some reason, just let the backend handle validation.
  if (!marketPrice) {
    return;
  }

  const newPriceIsAboveMarketPrice = newPrice.isGreaterThan(marketPrice);
  const newPriceIsBelowMarketPrice = newPrice.isLessThan(marketPrice);

  if (!isLongOrder && !newPriceIsAboveMarketPrice) {
    throw new Error(buildErrorMsg('limit', 'higher'));
  }

  if (isLongOrder && !newPriceIsBelowMarketPrice) {
    throw new Error(buildErrorMsg('limit', 'lower'));
  }
}

interface ValidateModifiedTriggerOrderPriceParams {
  orderType: OrderType;
  newPrice: BigDecimal;
  marketPrice: BigDecimal | undefined;
  triggerCriteriaType: TriggerCriteriaType;
}

export function validateModifiedTriggerOrderPrice({
  orderType,
  newPrice,
  marketPrice,
  triggerCriteriaType,
}: ValidateModifiedTriggerOrderPriceParams) {
  // If we don't have a market price for some reason, just let the backend handle validation.
  if (!marketPrice) {
    return;
  }

  const newPriceIsAboveMarketPrice = newPrice.isGreaterThan(marketPrice);
  const newPriceIsBelowMarketPrice = newPrice.isLessThan(marketPrice);

  if (
    (triggerCriteriaType === 'last_price_above' ||
      triggerCriteriaType === 'oracle_price_above') &&
    !newPriceIsAboveMarketPrice
  ) {
    throw new Error(buildErrorMsg(orderType, 'higher'));
  }

  if (
    (triggerCriteriaType === 'last_price_below' ||
      triggerCriteriaType === 'oracle_price_below') &&
    !newPriceIsBelowMarketPrice
  ) {
    throw new Error(buildErrorMsg(orderType, 'lower'));
  }
}

function buildErrorMsg(
  orderType: OrderType,
  higherOrLower: 'higher' | 'lower',
) {
  return `${getOrderTypeLabel(orderType)} price must be ${higherOrLower} than current price`;
}
