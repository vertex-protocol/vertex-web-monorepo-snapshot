import { BalanceSide } from '@vertex-protocol/contracts';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { OrderFormAmountSource } from 'client/store/trading/types';

export type EnginePlaceOrderPriceType = 'market' | 'limit';

export type TriggerPlaceOrderPriceType = 'stop';

export type PlaceOrderPriceType =
  | EnginePlaceOrderPriceType
  | TriggerPlaceOrderPriceType;

export type EngineOrderType =
  | EnginePlaceOrderPriceType
  | `${EnginePlaceOrderPriceType}_reduce`;

export type TriggerReduceOnlyOrderType = 'take_profit' | 'stop_loss';

export type TriggerOrderType =
  | TriggerPlaceOrderPriceType
  | TriggerReduceOnlyOrderType;

export type OrderType = EngineOrderType | TriggerOrderType;

export type OrderFormInputError =
  | 'invalid_input'
  | 'max_exceeded'
  | 'invalid_size_increment'
  | 'invalid_price_increment'
  | 'below_min'
  | 'time_in_force_in_days_invalid_input'
  | 'time_in_force_in_days_out_of_range';

export type OrderFormError =
  | OrderFormInputError
  | 'trigger_order_single_signature_disabled'
  | 'zero_buying_power_only_fok';

export interface OrderFormValidators {
  amount: InputValidatorFn<string, OrderFormError>;
  quoteAmount: InputValidatorFn<string, OrderFormError>;
  price: InputValidatorFn<string, OrderFormError>;
  timeInForceInDays: InputValidatorFn<string, OrderFormError>;
}

export type TimeInForceType = 'good_until' | 'ioc' | 'fok';

export interface BaseOrderFormValues {
  side: BalanceSide;
  priceType: PlaceOrderPriceType;
  amountSource: OrderFormAmountSource;
  // Stop price for stop orders, limit price for limit orders
  price: string;
  assetAmount: string;
  percentageAmount: number;
  quoteAmount: string;
  // Advanced Order Settings
  postOnly: boolean;
  reduceOnly: boolean;
  timeInForceInDays: string;
  timeInForceType: TimeInForceType;
}
