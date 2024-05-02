import * as Collapsible from '@radix-ui/react-collapsible';
import { Button, Checkbox } from '@vertex-protocol/web-ui';
import { CheckboxLabelWithTooltip } from 'client/components/CheckboxLabelWithTooltip';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { BaseInput } from 'client/components/Input/BaseInput';
import { CompactInput } from 'client/components/Input/CompactInput';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useState } from 'react';
import { useOrderFormTimeInForceInDaysErrorTooltipContent } from '../../hooks/useOrderFormTimeInForceInDaysErrorTooltipContent';
import {
  OrderFormError,
  OrderFormValidators,
  PlaceOrderPriceType,
} from '../../types';
import { TimeInForceTypeSelect } from './TimeInForceTypeSelect';
import { useAdvancedOrderSettings } from './hooks/useAdvancedOrderSettings';

interface Props {
  validators: OrderFormValidators;
  formError: OrderFormError | undefined;
  priceType: PlaceOrderPriceType;
}

export function AdvancedOrderSettings({
  validators,
  formError,
  priceType,
}: Props) {
  const [open, setOpen] = useState(false);

  const timeInForceInDaysErrorTooltipContent =
    useOrderFormTimeInForceInDaysErrorTooltipContent({ formError });

  const {
    showTimeInForceSelect,
    timeInForceType,
    setTimeInForceType,
    timeInForceRegister,
    postOnlyChecked,
    onPostOnlyCheckedChange,
    onReduceOnlyCheckedChange,
    reduceOnlyChecked,
    showGoodUntilInput,
    showPostOnly,
    showReduceOnly,
  } = useAdvancedOrderSettings({
    validators,
    priceType,
  });

  const collapsibleContent = (
    <div className="flex flex-col gap-y-2.5">
      {showTimeInForceSelect && (
        <div className="flex items-center gap-x-2">
          <DefinitionTooltip definitionId="tradingTimeInForce">
            Time in force
          </DefinitionTooltip>
          <TimeInForceTypeSelect
            timeInForceType={timeInForceType}
            setTimeInForceType={setTimeInForceType}
          />
        </div>
      )}
      {showGoodUntilInput && (
        <CompactInput
          className="max-w-40"
          type="number"
          min={1}
          max={365}
          id={timeInForceRegister.name}
          startElement={
            <BaseInput.Label label="Time" htmlFor={timeInForceRegister.name} />
          }
          inputClassName="text-right"
          endElement={<span className="px-0.5 text-xs">Days</span>}
          error={timeInForceInDaysErrorTooltipContent}
          {...timeInForceRegister}
        />
      )}
      {showPostOnly && (
        <Checkbox.Row>
          <Checkbox.Check
            id="post-only-order"
            checked={postOnlyChecked}
            onCheckedChange={onPostOnlyCheckedChange}
          />

          <CheckboxLabelWithTooltip
            definitionId="tradingPostOnly"
            id="post-only-order"
          >
            Post Only
          </CheckboxLabelWithTooltip>
        </Checkbox.Row>
      )}
      {showReduceOnly && (
        <Checkbox.Row>
          <Checkbox.Check
            id="reduce-only-order"
            checked={reduceOnlyChecked}
            onCheckedChange={onReduceOnlyCheckedChange}
          />
          <CheckboxLabelWithTooltip
            definitionId="tradingReduceOnly"
            id="reduce-only-order"
          >
            Reduce Only
          </CheckboxLabelWithTooltip>
        </Checkbox.Row>
      )}
    </div>
  );

  return (
    <Collapsible.Root
      className="flex flex-col items-start gap-y-3"
      open={open}
      onOpenChange={setOpen}
    >
      <Collapsible.Trigger asChild>
        <Button
          className="text-text-primary gap-x-1.5 text-xs"
          endIcon={<UpDownChevronIcon open={open} size={14} />}
        >
          Advanced
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content className="text-xs">
        {collapsibleContent}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
