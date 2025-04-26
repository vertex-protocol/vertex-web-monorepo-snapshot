import {
  formatNumber,
  NumberFormatSpecifier,
  NumberFormatValue,
} from '@vertex-protocol/react-client';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export interface InputSummaryItemProps extends WithClassnames {
  label: string;
  definitionTooltipId?: DefinitionTooltipID;
  formatSpecifier: NumberFormatSpecifier | string;
  currentValue?: NumberFormatValue;
  valueClassName?: string;
  // Callback when clicking on value, commonly used to set max amount.
  onValueClick?: () => void;
  valueEndElement?: ReactNode;
}

export function InputSummaryItem({
  label,
  currentValue,
  definitionTooltipId,
  valueClassName,
  formatSpecifier,
  onValueClick,
  valueEndElement,
  className,
}: InputSummaryItemProps) {
  const isValueClickable = !!currentValue && !!onValueClick;
  const valueContent = (
    <span
      className={
        isValueClickable
          ? 'hover:text-text-primary cursor-pointer transition-colors'
          : ''
      }
      onClick={onValueClick}
    >
      {formatNumber(currentValue, { formatSpecifier })}
    </span>
  );

  return (
    <ValueWithLabel.Horizontal
      fitWidth
      sizeVariant="xs"
      className={className}
      valueContent={valueContent}
      valueEndElement={valueEndElement}
      valueClassName={mergeClassNames('text-text-secondary', valueClassName)}
      label={label}
      tooltip={definitionTooltipId ? { id: definitionTooltipId } : undefined}
    />
  );
}
