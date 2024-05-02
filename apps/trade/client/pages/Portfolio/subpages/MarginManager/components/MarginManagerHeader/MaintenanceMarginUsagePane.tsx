import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { MarginManagerHeaderInfo } from './MarginManagerHeaderInfo';

interface Props {
  fundsUntilLiquidation: BigDecimal | undefined;
  liquidationRiskFraction: BigDecimal | undefined;
}

export function MaintenanceMarginUsagePane({
  className,
  fundsUntilLiquidation,
  liquidationRiskFraction,
}: WithClassnames<Props>) {
  return (
    <MarginManagerHeaderInfo.Card className={className}>
      <MarginManagerHeaderInfo.Title title="Maintenance Margin" />
      <div className="divide-overlay-divider/10 grid grid-cols-2 divide-x">
        <MarginManagerHeaderInfo.Metric
          label="Funds Until Liq."
          content={formatNumber(fundsUntilLiquidation, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        />
        <MarginManagerHeaderInfo.Metric
          label="Liquidation Risk"
          content={
            <div className="flex items-center gap-x-2 lg:gap-x-2.5">
              {formatNumber(liquidationRiskFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
              <LiquidationRiskBar
                liquidationRiskFraction={liquidationRiskFraction}
                className="h-2 w-14 lg:h-3.5 lg:w-28"
              />
            </div>
          }
        />
      </div>
      <MaintenanceMarginUsageWarning />
    </MarginManagerHeaderInfo.Card>
  );
}

function MaintenanceMarginUsageWarning() {
  const riskWarningState = useUserRiskWarningState();

  // Show only if connected and account is at extreme_liquidation_risk.
  if (riskWarningState !== 'extreme_liquidation_risk') {
    return null;
  }

  return (
    <div className="flex items-center gap-x-4 px-4 text-xs lg:px-6">
      <RiskWarningIcon
        size="lg"
        userRiskWarningState="extreme_liquidation_risk"
      />
      Your liquidation risk is above 90%. If your account reaches 100% it will
      start to be liquidated.
    </div>
  );
}