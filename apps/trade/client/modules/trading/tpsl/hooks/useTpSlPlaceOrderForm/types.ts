import { BigDecimal, TriggerOrderInfo } from '@vertex-protocol/client';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { useExecutePlaceOrder } from 'client/hooks/execute/placeOrder/useExecutePlaceOrder';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { LinkedPercentageAmountSource } from 'client/types/linkedPercentageAmountFormTypes';
import { UseFormReturn } from 'react-hook-form';

export type TpSlPlaceOrderErrorType =
  | 'trigger_price_must_be_above_price'
  | 'trigger_price_must_be_below_price'
  | 'invalid_input';

export interface TpSlPlaceOrderFormValues {
  triggerPrice: string;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  gainOrLossPercentage: string;
  priceSource: LinkedPercentageAmountSource;
}

export interface UseTpSlPlaceOrderForm {
  isTakeProfit: boolean;
  form: UseFormReturn<TpSlPlaceOrderFormValues>;
  // Error for the info box
  formError: TpSlPlaceOrderErrorType | undefined;
  validateTriggerPrice: InputValidatorFn<string, TpSlPlaceOrderErrorType>;
  onSubmit: () => void;
  // Form values and methods
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  validTriggerPrice: BigDecimal | undefined;
  executePlaceOrder: ReturnType<typeof useExecutePlaceOrder>;

  // Derived values
  referencePrice: BigDecimal | undefined;
  estimatedPnlUsd: BigDecimal | undefined;
  priceFormatSpecifier: string;
  priceIncrement: BigDecimal | undefined;
  existingTriggerOrder: TriggerOrderInfo | undefined;
  hasExistingPosition: boolean;
}

export interface TpSlPlaceOrderFormPositionChanges {
  /**
   * Delta of form amount and existing position amount, decimals removed.
   */
  assetAmountDelta: BigDecimal;
  /**
   * Delta of form net entry and existing position net entry, decimals removed.
   */
  netEntryAmountDelta: BigDecimal;
}
