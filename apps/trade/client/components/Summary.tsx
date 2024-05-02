import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

interface Params {
  label: React.ReactNode;
  value: React.ReactNode;
  labelClassName?: string;
  valueClassName?: string;
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

function SummaryItem({
  label,
  value,
  definitionTooltipId,
  valueClassName,
  labelClassName,
}: Params) {
  return (
    <span className="text-text-tertiary flex gap-x-1.5 text-xs">
      <DefinitionTooltip
        definitionId={definitionTooltipId}
        contentWrapperClassName={labelClassName}
      >
        {label}
      </DefinitionTooltip>
      <span className={mergeClassNames('text-text-primary', valueClassName)}>
        {value}
      </span>
    </span>
  );
}

export const Summary = {
  Container: SummaryContainer,
  Item: SummaryItem,
};
