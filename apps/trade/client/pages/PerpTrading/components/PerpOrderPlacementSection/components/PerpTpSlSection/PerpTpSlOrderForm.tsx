import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { TradeInput } from 'client/modules/trading/components/TradeInput';
import { TpSlTriggerCriteriaPriceTypeSelect } from 'client/modules/trading/tpsl/components/TpSlTriggerCriteriaPriceTypeSelect';
import { UseTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { useTpSlPlaceOrderTriggerPriceErrorTooltipContent } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderTriggerPriceErrorTooltipContent';

interface Props {
  perpTpSlOrderForm: UseTpSlPlaceOrderForm;
}

export function PerpTpSlOrderForm({ perpTpSlOrderForm }: Props) {
  const {
    form,
    formError,
    isTakeProfit,
    referencePrice,
    triggerCriteriaPriceType,
    validateTriggerPrice,
    priceIncrement,
    priceFormatSpecifier,
    estimatedPnlUsd,
  } = perpTpSlOrderForm;

  const triggerPriceErrorTooltipContent =
    useTpSlPlaceOrderTriggerPriceErrorTooltipContent({
      formError,
      isTakeProfit,
      referencePrice,
      triggerCriteriaPriceType,
      priceFormatSpecifier,
    });

  const valueColor = (() => {
    if (!estimatedPnlUsd) {
      return 'text-text-primary';
    }

    return estimatedPnlUsd.isPositive() ? 'text-positive' : 'text-negative';
  })();

  return (
    <div className="flex flex-col gap-y-1">
      <div className="text-text-tertiary flex items-center justify-between text-xs">
        <DefinitionTooltip definitionId={isTakeProfit ? 'perpTp' : 'perpSl'}>
          {isTakeProfit ? 'Take Profit' : 'Stop Loss'}
        </DefinitionTooltip>
        <TpSlTriggerCriteriaPriceTypeSelect form={form} />
      </div>
      <div className="grid grid-cols-2 gap-x-1.5">
        <TradeInput
          {...form.register('triggerPrice', { validate: validateTriggerPrice })}
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
          symbol="%"
          type="number"
          min={0}
          error={triggerPriceErrorTooltipContent}
          onFocus={() => form.setValue('priceSource', 'percentage')}
        />
      </div>
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label={isTakeProfit ? 'Est. Profit:' : 'Est. Loss:'}
        value={estimatedPnlUsd?.abs()}
        valueClassName={valueColor}
        defaultValue={0}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        fitWidth
      />
    </div>
  );
}
