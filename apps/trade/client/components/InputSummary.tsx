import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { NumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

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
    <div
      className={joinClassNames(
        'text-text-tertiary flex items-center gap-x-1 text-xs',
        className,
      )}
    >
      <DefinitionTooltip definitionId={definitionTooltipId}>
        {label}
      </DefinitionTooltip>
      <div
        className={joinClassNames(
          'text-text-secondary',
          onValueClick && 'hover:text-text-primary cursor-pointer',
        )}
        onClick={onValueClick}
      >
        {currentValueContent}
      </div>
    </div>
  );
}

function Container({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
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
