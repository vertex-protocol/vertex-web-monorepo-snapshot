import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { UserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

interface Props {
  size: 'sm' | 'md' | 'lg';
  userRiskWarningState: UserRiskWarningState | undefined;
}

interface IconParams {
  icon: ReactNode;
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

  const { icon, bgClassName, definitionId }: IconParams = (() => {
    switch (userRiskWarningState) {
      case 'extreme_liquidation_risk':
        return {
          icon: <Icons.BsExclamation size={20} className="text-negative" />,
          definitionId: 'extremeLiquidationRisk',
          bgClassName: 'bg-negative-muted',
        };
      case 'no_funds_available':
        return {
          icon: <Icons.TbCurrencyDollarOff size={12} className="text-accent" />,
          definitionId: 'noFundsAvailable',
          bgClassName: 'bg-overlay-accent/20',
        };
    }
  })();

  return (
    <DefinitionTooltip
      contentWrapperClassName={joinClassNames(
        'overflow-hidden shrink-0 rounded-full flex items-center justify-center',
        sizeClassName,
        bgClassName,
      )}
      definitionId={definitionId}
    >
      {icon}
    </DefinitionTooltip>
  );
}
