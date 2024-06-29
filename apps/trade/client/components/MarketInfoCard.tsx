import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';
import { Config } from 'react-popper-tooltip';

interface MarketInfoCardProps {
  value: ReactNode;
  label?: string;
  labelPostfix?: string;
  valueClassName?: string;
  definitionTooltipId?: DefinitionTooltipID;
}

export function MarketInfoCard({
  label,
  labelPostfix,
  value,
  definitionTooltipId,
  valueClassName,
  className,
}: WithClassnames<MarketInfoCardProps>) {
  const tooltipOptions: Partial<Config> = {
    placement: 'bottom',
  };

  return (
    <div
      className={joinClassNames(
        'flex min-w-max flex-col justify-center',
        className,
      )}
    >
      {label && (
        <DefinitionTooltip
          tooltipOptions={tooltipOptions}
          // Cards have a limited amount of vertical space, so use a lower offset for underline here
          contentWrapperClassName="underline-offset-2 text-3xs text-text-tertiary min-w-max leading-3"
          definitionId={definitionTooltipId}
        >
          {label}
          {labelPostfix && (
            // Purposefully use a space here instead of `gap`, otherwise the tooltip underline will not go underneath the gap
            <span> {labelPostfix}</span>
          )}
        </DefinitionTooltip>
      )}
      <div
        className={joinClassNames(
          'text-text-primary min-w-max text-xs leading-4 tracking-wide',
          !value && 'animate-pulse',
          valueClassName,
        )}
      >
        {/* Wrapping `value` with a tooltip if `label` doesn't exist and `tooltipId` is defined */}
        <DefinitionTooltip
          definitionId={!label ? definitionTooltipId : undefined}
          tooltipOptions={tooltipOptions}
        >
          {value}
        </DefinitionTooltip>
      </div>
    </div>
  );
}
