import { joinClassNames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS, Icons } from '@vertex-protocol/web-ui';
import { UserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

interface Props {
  size: 'sm' | 'md' | 'lg';
  userRiskWarningState: UserRiskWarningState | undefined;
}

interface IconParams {
  iconColorClassName: string;
  bgClassName: string;
  definitionId: DefinitionTooltipID;
}

export function RiskWarningIcon({ size, userRiskWarningState }: Props) {
  if (!userRiskWarningState) return null;

  const sizeClassName = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size];

  const { iconColorClassName, bgClassName, definitionId }: IconParams = (() => {
    switch (userRiskWarningState) {
      case 'extreme_liquidation_risk':
        return {
          iconColorClassName: 'text-negative',
          definitionId: 'extremeLiquidationRisk',
          bgClassName: 'bg-negative-muted',
        };
      case 'no_funds_available':
        return {
          iconColorClassName: 'text-accent',
          definitionId: 'noFundsAvailable',
          bgClassName: COMMON_TRANSPARENCY_COLORS.bgAccent,
        };
    }
  })();

  return (
    <DefinitionTooltip
      contentWrapperClassName={joinClassNames(
        'overflow-hidden shrink-0 rounded-full flex items-center justify-center p-0.5',
        sizeClassName,
        bgClassName,
      )}
      definitionId={definitionId}
    >
      <Icons.ExclamationMark
        className={joinClassNames('h-full w-full', iconColorClassName)}
      />
    </DefinitionTooltip>
  );
}
