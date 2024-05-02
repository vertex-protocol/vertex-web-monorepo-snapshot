import { CheckedState } from '@radix-ui/react-checkbox';
import {
  BaseOrderFormValues,
  OrderFormValidators,
  PlaceOrderPriceType,
  TimeInForceType,
} from 'client/modules/trading/types';
import { useFormContext } from 'react-hook-form';

interface Params {
  validators: OrderFormValidators;
  priceType: PlaceOrderPriceType;
}

export function useAdvancedOrderSettings({ priceType, validators }: Params) {
  const form = useFormContext<BaseOrderFormValues>();
  const isMarketOrder = priceType === 'market';
  const isLimitOrder = priceType === 'limit';
  const timeInForceType = form.watch('timeInForceType');
  const postOnlyChecked = form.watch('postOnly');
  const reduceOnlyChecked = form.watch('reduceOnly');

  const showTimeInForceSelect = isLimitOrder;
  const showGoodUntilInput = timeInForceType === 'good_until' && isLimitOrder;
  const showPostOnly = timeInForceType === 'good_until' && isLimitOrder;
  const showReduceOnly =
    timeInForceType === 'fok' || timeInForceType === 'ioc' || isMarketOrder;

  const setTimeInForceType = (value: TimeInForceType) =>
    form.setValue('timeInForceType', value);

  const onPostOnlyCheckedChange = (state: CheckedState) => {
    form.setValue('postOnly', !!state);
  };

  const onReduceOnlyCheckedChange = (state: CheckedState) => {
    form.setValue('reduceOnly', !!state);
  };

  const timeInForceRegister = form.register('timeInForceInDays', {
    validate: validators.timeInForceInDays,
  });

  return {
    timeInForceType,
    setTimeInForceType,
    postOnlyChecked,
    onPostOnlyCheckedChange,
    reduceOnlyChecked,
    onReduceOnlyCheckedChange,
    timeInForceRegister,
    showTimeInForceSelect,
    showGoodUntilInput,
    showPostOnly,
    showReduceOnly,
  };
}
