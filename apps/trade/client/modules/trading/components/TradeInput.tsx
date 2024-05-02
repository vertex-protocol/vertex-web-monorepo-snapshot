import React, { ReactNode } from 'react';
import { BaseInput } from 'client/components/Input/BaseInput';
import {
  CompactInput,
  CompactInputProps,
} from 'client/components/Input/CompactInput';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

export interface TradeInputProps
  extends Omit<CompactInputProps, 'startElement' | 'endElement'> {
  label: string;
  symbol?: string;
  definitionId?: DefinitionTooltipID;
  error: ReactNode;
}

export const TradeInput = React.forwardRef<HTMLInputElement, TradeInputProps>(
  function TradeInput(
    { symbol, label, definitionId, id, error, ...inputProps }: TradeInputProps,
    ref,
  ) {
    return (
      <CompactInput
        {...inputProps}
        type="number"
        min={0}
        id={id}
        ref={ref}
        startElement={
          <BaseInput.Label
            label={label}
            definitionId={definitionId}
            htmlFor={id}
          />
        }
        error={error}
        inputClassName="text-right"
        endElement={
          <span className="px-0.5 text-xs empty:hidden">{symbol}</span>
        }
      />
    );
  },
);
