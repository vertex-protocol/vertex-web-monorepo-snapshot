import { BigDecimal } from '@vertex-protocol/client';
import {
  InputValidatorFn,
  joinClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { TradeInput } from 'client/modules/trading/components/TradeInput';
import {
  TpSlPlaceOrderErrorType,
  TpSlPlaceOrderFormValues,
} from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { useTpSlPlaceOrderTriggerPriceErrorTooltipContent } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderTriggerPriceErrorTooltipContent';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { UseFormReturn } from 'react-hook-form';

interface Props extends WithClassnames {
  form: UseFormReturn<TpSlPlaceOrderFormValues>;
  isTakeProfit: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  validateTriggerPrice: InputValidatorFn<string, TpSlPlaceOrderErrorType>;
  priceIncrement: BigDecimal | undefined;
  formError: TpSlPlaceOrderErrorType | undefined;
  referencePrice: BigDecimal | undefined;
  priceFormatSpecifier: string;
}

export function TpSlPlaceOrderInputs({
  className,
  form,
  isTakeProfit,
  validateTriggerPrice,
  triggerCriteriaPriceType,
  priceIncrement,
  formError,
  referencePrice,
  priceFormatSpecifier,
}: Props) {
  const triggerPriceErrorTooltipContent =
    useTpSlPlaceOrderTriggerPriceErrorTooltipContent({
      formError,
      isTakeProfit,
      referencePrice,
      triggerCriteriaPriceType,
      priceFormatSpecifier,
    });

  return (
    <div className={joinClassNames('grid grid-cols-2 gap-x-1.5', className)}>
      <TradeInput
        {...form.register('triggerPrice', {
          validate: validateTriggerPrice,
        })}
        label="Price"
        type="number"
        min={0}
        step={priceIncrement?.toString()}
        error={triggerPriceErrorTooltipContent}
        onFocus={() => form.setValue('priceSource', 'absolute')}
      />
      <TradeInput
        {...form.register('gainOrLossPercentage')}
        label={isTakeProfit ? 'Gain' : 'Loss'}
        endElement="%"
        type="number"
        min={0}
        error={triggerPriceErrorTooltipContent}
        onFocus={() => form.setValue('priceSource', 'percentage')}
      />
    </div>
  );
}
