import { BigDecimal, TriggerCriteriaType } from '@vertex-protocol/client';
import { BigDecimalish } from '@vertex-protocol/utils';
import {
  EnginePlaceOrderPriceType,
  TimeInForceType,
  TriggerPlaceOrderPriceType,
} from 'client/modules/trading/types';

export interface CommonOrderParams {
  productId: number;
  // Price for the order itself, not the stop price (for trigger orders)
  price: BigDecimalish;
  amount: BigDecimalish;
  spotLeverage?: boolean;
  // If true, skips rounding amount to the size increment. This is used for Market Spot orders to allow trading small
  // balances against the AMM
  allowAnyOrderSizeIncrement?: boolean;
  // If undefined, 'default' will be used as the order type.
  timeInForceType?: TimeInForceType;
  timeInForceInDays?: BigDecimal; // Used when timeInForceType is good_until and It's a limit order.
  postOnly?: boolean; // Used when timeInForceType is good_until and It's a limit order.
  reduceOnly?: boolean;
}

export interface ExecutePlaceEngineOrderParams extends CommonOrderParams {
  priceType: EnginePlaceOrderPriceType;
}

export interface ExecutePlaceTriggerOrderParams extends CommonOrderParams {
  priceType: TriggerPlaceOrderPriceType;
  triggerCriteriaType: TriggerCriteriaType;
  triggerPrice: BigDecimalish;
}

export type ExecutePlaceOrderParams =
  | ExecutePlaceEngineOrderParams
  | ExecutePlaceTriggerOrderParams;
