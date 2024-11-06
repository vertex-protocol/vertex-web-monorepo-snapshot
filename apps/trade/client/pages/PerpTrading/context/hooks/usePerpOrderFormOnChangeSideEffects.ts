import { BalanceSide } from '@vertex-protocol/client';
import { TpSlPlaceOrderFormValues } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { PerpOrderFormValues } from 'client/pages/PerpTrading/context/types';
import { useEffect } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<PerpOrderFormValues>;
  selectedLeverage: number;
  isTpSlCheckboxDisabled: boolean;
  setIsTpSlCheckboxChecked: (isChecked: boolean) => void;
  orderSide: BalanceSide;
  takeProfitOrderFormResetField: UseFormResetField<TpSlPlaceOrderFormValues>;
  stopLossOrderFormResetField: UseFormResetField<TpSlPlaceOrderFormValues>;
}

export function usePerpOrderFormOnChangeSideEffects({
  form,
  selectedLeverage,
  isTpSlCheckboxDisabled,
  setIsTpSlCheckboxChecked,
  orderSide,
  takeProfitOrderFormResetField,
  stopLossOrderFormResetField,
}: Params) {
  // Reset amounts on leverage change
  useEffect(
    () => {
      // Reset amount fields and keep the rest
      form.setValue('percentageAmount', 0);
      form.resetField('assetAmount');
      form.resetField('quoteAmount');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLeverage],
  );

  // Uncheck the TP/SL checkbox when it's disabled.
  useEffect(() => {
    if (isTpSlCheckboxDisabled) {
      setIsTpSlCheckboxChecked(false);
    }
  }, [setIsTpSlCheckboxChecked, isTpSlCheckboxDisabled]);

  // Reset the inputs on side change otherwise they may become invalid
  // when switching sides without any error indication in the form.
  useEffect(() => {
    takeProfitOrderFormResetField('triggerPrice');
    takeProfitOrderFormResetField('gainOrLossPercentage');
    stopLossOrderFormResetField('triggerPrice');
    stopLossOrderFormResetField('gainOrLossPercentage');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderSide]);
}
