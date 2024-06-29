import {
  CompactInput,
  CompactInputProps,
  Input,
} from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import React, { ReactNode } from 'react';

export interface TradeInputProps
  extends Omit<CompactInputProps, 'startElement' | 'endElement'> {
  label: string;
  symbol?: string;
  definitionId?: DefinitionTooltipID;
  error: ReactNode;
}

export const TradeInput = React.forwardRef<HTMLInputElement, TradeInputProps>(
  function TradeInput(
    { symbol, label, definitionId, id, error, ...rest }: TradeInputProps,
    ref,
  ) {
    return (
      <CompactInput
        type="number"
        min={0}
        id={id}
        name={id}
        ref={ref}
        errorTooltipContent={error}
        startElement={
          <DefinitionTooltip definitionId={definitionId}>
            <Input.Label className="text-xs" htmlFor={id}>
              {label}
            </Input.Label>
          </DefinitionTooltip>
        }
        textAreaClassName="text-right"
        endElement={symbol}
        {...rest}
      />
    );
  },
);
