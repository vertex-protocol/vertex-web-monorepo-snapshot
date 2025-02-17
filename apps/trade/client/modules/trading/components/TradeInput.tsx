import { WithRef } from '@vertex-protocol/web-common';
import {
  CompactInput,
  CompactInputProps,
  Input,
} from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export interface TradeInputProps
  extends WithRef<
    Omit<CompactInputProps, 'startElement' | 'endElement'>,
    HTMLInputElement
  > {
  label: string;
  endElement?: ReactNode;
  definitionId?: DefinitionTooltipID;
  error: ReactNode;
}

export function TradeInput({
  endElement,
  label,
  definitionId,
  id,
  error,
  ...rest
}: TradeInputProps) {
  return (
    <CompactInput
      type="number"
      min={0}
      id={id}
      name={id}
      errorTooltipContent={error}
      startElement={
        <DefinitionTooltip
          definitionId={definitionId}
          // Ensure it doesn't render over the input.
          tooltipOptions={{ placement: 'bottom' }}
          asChild
        >
          <Input.Label className="text-xs" htmlFor={id}>
            {label}
          </Input.Label>
        </DefinitionTooltip>
      }
      textAreaClassName="text-right text-xs"
      inputContainerClassName="h-9"
      endElement={endElement}
      {...rest}
    />
  );
}
