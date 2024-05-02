import { Button, Icons } from '@vertex-protocol/web-ui';
import { CompactInput } from 'client/components/Input/CompactInput';
import { UseOrderSlippageFormForType } from 'client/modules/controlCenter/components/AppSettings/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useOrderSlippageValueErrorTooltipContent } from './useOrderSlippageForm/useOrderSlippageValueErrorTooltipContent';

interface Props {
  formForType: UseOrderSlippageFormForType;
}

export function SlippageFormForType({ formForType }: Props) {
  const showLowSlippageWarning = formForType.isLowSlippage;

  const label = {
    market: 'Market Order',
    stopMarket: 'Stop Market',
    takeProfit: 'Take Profit',
    stopLoss: 'Stop Loss',
  }[formForType.slippageType];

  const valueErrorTooltipContent = useOrderSlippageValueErrorTooltipContent({
    formError: formForType.formError,
  });

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between gap-x-0.5">
        {/*Label*/}
        <span className="text-text-secondary flex w-1/2 items-center gap-x-1">
          {label}
          {showLowSlippageWarning && (
            <DefinitionTooltip
              definitionId="settingsLowSlippageWarning"
              decoration="none"
            >
              <Icons.BsExclamation
                className="bg-overlay-accent/20 text-accent rounded-full"
                size={14}
              />
            </DefinitionTooltip>
          )}
        </span>
        <div className="flex w-24 items-center">
          {/*Input*/}
          <CompactInput
            type="number"
            inputMode="decimal"
            error={valueErrorTooltipContent}
            endElement="%"
            inputContainerClassName="bg-surface-2"
            inputClassName="text-left text-xs"
            {...formForType.form.register('value', {
              valueAsNumber: true,
              validate: formForType.validateSlippageInput,
              onBlur: formForType.save,
            })}
          />
          {/*Reset*/}
          <Button
            endIcon={<Icons.MdOutlineRefresh size={20} />}
            className="text-disabled hover:text-text-primary flex h-full pl-1"
            onClick={formForType.resetToDefault}
          />
        </div>
      </div>
    </div>
  );
}
