import { Button, CompactInput, Icons } from '@vertex-protocol/web-ui';
import { UseOrderSlippageFormForType } from 'client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType';
import { useOrderSlippageValueErrorTooltipContent } from 'client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageValueErrorTooltipContent';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

interface Props {
  formForType: UseOrderSlippageFormForType;
}

export function SlippageFormForType({ formForType }: Props) {
  const {
    formError,
    form,
    isLowSlippage,
    slippageType,
    validateSlippageInput,
    save,
    resetToDefault,
  } = formForType;

  const label = {
    market: 'Market Order',
    stopMarket: 'Stop Market',
    takeProfit: 'Take Profit',
    stopLoss: 'Stop Loss',
  }[slippageType];

  const valueErrorTooltipContent = useOrderSlippageValueErrorTooltipContent({
    formError,
  });

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center justify-between gap-x-0.5">
        {/*Label*/}
        <span className="text-text-secondary flex w-1/2 items-center gap-x-1">
          {label}
          {isLowSlippage && (
            <DefinitionTooltip
              definitionId="settingsLowSlippageWarning"
              decoration="none"
            >
              <Icons.ExclamationMark
                className="text-accent bg-overlay-accent rounded-full"
                size={14}
              />
            </DefinitionTooltip>
          )}
        </span>
        <div className="flex w-24 items-center">
          {/*Input*/}
          <CompactInput
            {...form.register('value', {
              valueAsNumber: true,
              validate: validateSlippageInput,
              onBlur: save,
            })}
            type="number"
            inputMode="decimal"
            errorTooltipContent={valueErrorTooltipContent}
            endElement="%"
            textAreaClassName="text-left text-xs"
          />
          {/*Reset*/}
          <Button
            endIcon={<Icons.ArrowClockwise size={20} />}
            className="text-disabled hover:text-text-primary flex h-full pl-1"
            onClick={resetToDefault}
          />
        </div>
      </div>
    </div>
  );
}
