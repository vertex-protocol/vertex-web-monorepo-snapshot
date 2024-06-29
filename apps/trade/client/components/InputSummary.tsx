import {
  formatNumber,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { TextButton } from '@vertex-protocol/web-ui';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ValueWithLabel } from './ValueWithLabel/ValueWithLabel';

export interface InputSummaryItemProps extends WithClassnames {
  label: string;
  definitionTooltipId?: DefinitionTooltipID;
  formatSpecifier: NumberFormatSpecifier | string;
  currentValue?: BigDecimal;
  // Callback when clicking on value, commonly used to set max amount.
  onValueClick?: () => void;
}

function Item({
  label,
  currentValue,
  definitionTooltipId,
  formatSpecifier,
  onValueClick,
  className,
}: InputSummaryItemProps) {
  const currentValueContent = formatNumber(currentValue, {
    formatSpecifier: formatSpecifier,
  });

  return (
    <ValueWithLabel.Horizontal
      fitWidth
      sizeVariant="xs"
      className={className}
      valueContent={
        <TextButton onClick={onValueClick}>{currentValueContent}</TextButton>
      }
      label={label}
      tooltip={definitionTooltipId ? { id: definitionTooltipId } : undefined}
    />
  );
}

function Container({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'text-text-tertiary flex flex-col',
        'gap-y-2 py-1.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const InputSummary = {
  Container,
  Item,
};
