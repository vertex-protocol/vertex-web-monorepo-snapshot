import { BalanceSide } from '@vertex-protocol/client';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { TpSlPlaceOrderFormValues } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { PlaceOrderPriceType } from 'client/modules/trading/types';
import { PerpOrderFormValues } from 'client/pages/PerpTrading/context/types';
import { useEffect } from 'react';
import { UseFormResetField, UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<PerpOrderFormValues>;
  marginMode: MarginMode;
  isTpSlCheckboxDisabled: boolean;
  setIsTpSlCheckboxChecked: (isChecked: boolean) => void;
  orderSide: BalanceSide;
  priceType: PlaceOrderPriceType;
  takeProfitOrderFormResetField: UseFormResetField<TpSlPlaceOrderFormValues>;
  stopLossOrderFormResetField: UseFormResetField<TpSlPlaceOrderFormValues>;
}

export function usePerpOrderFormOnChangeSideEffects({
  form,
  marginMode,
  isTpSlCheckboxDisabled,
  setIsTpSlCheckboxChecked,
  orderSide,
  priceType,
  takeProfitOrderFormResetField,
  stopLossOrderFormResetField,
}: Params) {
  // Reset amounts on margin mode changes
  useEffect(
    () => {
      // Reset amount fields and keep the rest
      form.setValue('percentageAmount', 0);
      form.resetField('assetAmount');
      form.resetField('quoteAmount');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [marginMode.leverage, marginMode.mode],
  );

  // Uncheck the TP/SL checkbox when it's disabled.
  useEffect(() => {
    if (isTpSlCheckboxDisabled) {
      setIsTpSlCheckboxChecked(false);
    }
  }, [setIsTpSlCheckboxChecked, isTpSlCheckboxDisabled]);

  // Stop orders are disabled for isolated, so switch the price type to market if needed
  useEffect(
    () => {
      if (marginMode.mode === 'isolated' && priceType === 'stop') {
        form.setValue('priceType', 'market');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [marginMode.mode, priceType],
  );

  // Reset the TPSL inputs on side change otherwise they may become invalid
  // when switching sides without any error indication in the form.
  useEffect(() => {
    takeProfitOrderFormResetField('triggerPrice');
    takeProfitOrderFormResetField('gainOrLossPercentage');
    stopLossOrderFormResetField('triggerPrice');
    stopLossOrderFormResetField('gainOrLossPercentage');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderSide]);
}
