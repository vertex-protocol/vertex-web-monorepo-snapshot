import { NumberFormatValue } from '@vertex-protocol/react-client';
import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';
import { ValueWithLabelProps } from './ValueWithLabel/types';
import { ValueWithLabel } from './ValueWithLabel/ValueWithLabel';

interface Params extends Omit<ValueWithLabelProps, 'tooltip'> {
  label: ReactNode;
  value: NumberFormatValue | undefined;
  labelClassName?: string;
  valueClassName?: string;
  defaultValue?: string | number;
  numberFormatSpecifier: string;
  definitionTooltipId?: DefinitionTooltipID;
}

function SummaryContainer({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'border-stroke flex flex-col gap-y-1.5 border-l-2 pl-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

function SummaryItem({ definitionTooltipId, ...rest }: Params) {
  return (
    <ValueWithLabel.Horizontal
      fitWidth
      sizeVariant="xs"
      tooltip={definitionTooltipId ? { id: definitionTooltipId } : undefined}
      {...rest}
    />
  );
}

export const Summary = {
  Container: SummaryContainer,
  Item: SummaryItem,
};
