import {
  formatNumber,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

export interface InputSummaryItemProps extends WithClassnames {
  label: string;
  definitionTooltipId?: DefinitionTooltipID;
  formatSpecifier: NumberFormatSpecifier | string;
  currentValue?: BigDecimal;
  valueClassName?: string;
  // Callback when clicking on value, commonly used to set max amount.
  onValueClick?: () => void;
}

export function InputSummaryItem({
  label,
  currentValue,
  definitionTooltipId,
  valueClassName,
  formatSpecifier,
  onValueClick,
  className,
}: InputSummaryItemProps) {
  const isValueClickable = !!currentValue && !!onValueClick;
  const valueContent = (
    <span
      className={mergeClassNames(
        'text-text-secondary',
        isValueClickable
          ? 'hover:text-text-primary cursor-pointer transition-colors'
          : '',
        valueClassName,
      )}
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
      label={label}
      tooltip={definitionTooltipId ? { id: definitionTooltipId } : undefined}
    />
  );
}
