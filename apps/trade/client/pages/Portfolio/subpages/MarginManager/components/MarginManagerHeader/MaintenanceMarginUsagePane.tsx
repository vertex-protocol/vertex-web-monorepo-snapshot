import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '@vertex-protocol/web-ui';
import { UserRiskWarningIcon } from 'client/components/Icons/UserRiskWarningIcon';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { MarginManagerHeaderInfo } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MarginManagerHeaderInfo';

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
      <div
        className={joinClassNames(
          'grid grid-cols-2 divide-x',
          COMMON_TRANSPARENCY_COLORS.divide,
        )}
      >
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
      <UserRiskWarningIcon
        size="lg"
        userRiskWarningState="extreme_liquidation_risk"
      />
      Your liquidation risk is above 90%. If your account reaches 100% it will
      start to be liquidated.
    </div>
  );
}
