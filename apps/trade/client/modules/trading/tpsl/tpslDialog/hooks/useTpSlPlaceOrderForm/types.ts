import { BigDecimal, TriggerOrderInfo } from '@vertex-protocol/client';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { UseFormReturn } from 'react-hook-form';
import { LinkedPercentageAmountSource } from 'client/types/linkedPercentageAmountFormTypes';
import { TriggerCriteriaPriceType } from '../../types';

export type TpSlPlaceOrderErrorType =
  | 'trigger_price_must_be_above_price'
  | 'trigger_price_must_be_below_price'
  | 'invalid_input';

export interface TpSlPlaceOrderFormValues {
  triggerPrice: string;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  pnlFrac: number;
  priceSource: LinkedPercentageAmountSource;
}

export interface UseTpSlPlaceOrderForm {
  form: UseFormReturn<TpSlPlaceOrderFormValues>;
  // Error for the info box
  formError: TpSlPlaceOrderErrorType | undefined;
  buttonState: BaseActionButtonState;
  validateTriggerPrice: InputValidatorFn<string, TpSlPlaceOrderErrorType>;
  onSubmit: () => void;
  // Form values and methods
  pnlFrac: number | undefined;
  setPnlFrac: (fraction: number) => void;
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  setTriggerCriteriaPriceType: (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => void;
  triggerPrice: BigDecimal | undefined;

  // Derived values
  referencePrice: BigDecimal | undefined;
  estimatedPnlUsd: BigDecimal | undefined;
  priceFormatSpecifier: string;
  sizeFormatSpecifier: string;
  relevantOrder: TriggerOrderInfo | undefined;
  priceIncrement: BigDecimal | undefined;
  positionSize: BigDecimal | undefined;
  marketName: string | undefined;
}
