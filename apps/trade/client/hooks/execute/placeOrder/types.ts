import { BigDecimal, TriggerCriteriaType } from '@vertex-protocol/client';
import { BigDecimalish } from '@vertex-protocol/utils';
import {
  EnginePlaceOrderPriceType,
  TimeInForceType,
  TriggerPlaceOrderPriceType,
} from 'client/modules/trading/types';

export interface CommonOrderParams {
  // Override the subaccount name used for the order. There are 2 usecases:
  // 1. Trigger orders - trigger service does not support isolated, so we need to place the order via the isolated subaccount
  // 2. Reduce only engine orders - `PlaceIsolatedOrder` does not support reduce-only
  subaccountName?: string;
  productId: number;
  // Price for the order itself, not the stop price (for trigger orders)
  price: BigDecimalish;
  amount: BigDecimalish;
  // This doesn't exist for iso but is included in the typing for the sake of simplicity
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

export interface ExecutePlaceEngineOrderIsolatedParams {
  borrowMargin: boolean;
  margin: BigDecimalish;
}

export interface ExecutePlaceEngineOrderParams extends CommonOrderParams {
  priceType: EnginePlaceOrderPriceType;
  iso?: ExecutePlaceEngineOrderIsolatedParams;
}

export interface ExecutePlaceTriggerOrderParams extends CommonOrderParams {
  priceType: TriggerPlaceOrderPriceType;
  triggerCriteriaType: TriggerCriteriaType;
  triggerPrice: BigDecimalish;
}

export type ExecutePlaceOrderParams =
  | ExecutePlaceEngineOrderParams
  | ExecutePlaceTriggerOrderParams;
