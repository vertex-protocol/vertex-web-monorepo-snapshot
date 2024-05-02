import { BigDecimal } from '@vertex-protocol/client';
import {
  InputValidatorFn,
  joinClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { CompactInput } from 'client/components/Input/CompactInput';
import { UseFormReturn } from 'react-hook-form';
import {
  TpSlPlaceOrderErrorType,
  TpSlPlaceOrderFormValues,
} from '../../hooks/useTpSlPlaceOrderForm/types';
import { useTpSlPlaceOrderTriggerPriceErrorTooltipContent } from '../../hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderTriggerPriceErrorTooltipContent';
import { TriggerCriteriaPriceType } from '../../types';

interface Props extends WithClassnames {
  form: UseFormReturn<TpSlPlaceOrderFormValues>;
  isTakeProfit: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  setTriggerCriteriaPriceType: (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => void;
  validateTriggerPrice: InputValidatorFn<string, TpSlPlaceOrderErrorType>;
  setPnlFrac: (pnlFrac: number) => void;
  pnlFrac: number | undefined;
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
  setTriggerCriteriaPriceType,
  pnlFrac,
  setPnlFrac,
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

  const pnlLabel = `${isTakeProfit ? '+' : '-'} PnL`;

  return (
    <div className="flex flex-col gap-y-2">
      <div className={joinClassNames('flex gap-x-1.5', className)}>
        <CompactInput
          className="flex-1"
          inputContainerClassName={joinClassNames(
            'flex-1',
            'focus:border-accent',
            'border-stroke rounded border',
            'placeholder:text-disabled text-text-primary text-sm',
            'px-3 py-2',
            triggerPriceErrorTooltipContent && 'border-negative text-negative',
          )}
          type="number"
          placeholder="0.00"
          min={0}
          error={triggerPriceErrorTooltipContent}
          step={priceIncrement?.toString()}
          {...form.register('triggerPrice', {
            validate: validateTriggerPrice,
          })}
          onFocus={() => {
            form.setValue('priceSource', 'absolute');
          }}
        />
        <PriceTypeSwitch
          triggerCriteriaPriceType={triggerCriteriaPriceType}
          setTriggerCriteriaPriceType={setTriggerCriteriaPriceType}
        />
      </div>
      <div className="flex items-center gap-x-3">
        <div className="whitespace-nowrap text-xs">{pnlLabel}</div>
        <FractionAmountButtons
          onFractionSelected={setPnlFrac}
          selectedFraction={pnlFrac}
        />
      </div>
    </div>
  );
}

function PriceTypeSwitch({
  triggerCriteriaPriceType,
  setTriggerCriteriaPriceType,
}: {
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  setTriggerCriteriaPriceType: (
    triggerCriteriaPriceType: TriggerCriteriaPriceType,
  ) => void;
}) {
  return (
    <SegmentedControl.Container className="w-32 items-stretch">
      <SegmentedControl.Button
        className="flex-1"
        size="sm"
        active={triggerCriteriaPriceType === 'oracle_price'}
        onClick={() => setTriggerCriteriaPriceType('oracle_price')}
      >
        Oracle
      </SegmentedControl.Button>
      <SegmentedControl.Button
        className="flex-1"
        size="sm"
        active={triggerCriteriaPriceType === 'last_price'}
        onClick={() => setTriggerCriteriaPriceType('last_price')}
      >
        Last
      </SegmentedControl.Button>
    </SegmentedControl.Container>
  );
}
