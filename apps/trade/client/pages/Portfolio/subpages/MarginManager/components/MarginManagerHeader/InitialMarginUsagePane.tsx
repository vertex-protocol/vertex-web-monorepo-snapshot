import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '@vertex-protocol/web-ui';
import { UserRiskWarningIcon } from 'client/components/Icons/UserRiskWarningIcon';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { MarginManagerHeaderInfo } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MarginManagerHeaderInfo';

interface Props {
  marginUsageFraction: BigDecimal | undefined;
  fundsAvailable: BigDecimal | undefined;
}

export function InitialMarginUsagePane({
  className,
  marginUsageFraction,
  fundsAvailable,
}: WithClassnames<Props>) {
  return (
    <MarginManagerHeaderInfo.Card className={className}>
      <MarginManagerHeaderInfo.Title title="Initial Margin" />
      <div
        className={joinClassNames(
          'grid grid-cols-2 divide-x',
          COMMON_TRANSPARENCY_COLORS.divide,
        )}
      >
        <MarginManagerHeaderInfo.Metric
          label="Margin Usage"
          content={formatNumber(marginUsageFraction, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
          })}
        />
        <MarginManagerHeaderInfo.Metric
          label="Funds Available"
          content={formatNumber(fundsAvailable, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        />
      </div>
      <InitialMarginUsageWarning />
    </MarginManagerHeaderInfo.Card>
  );
}

function InitialMarginUsageWarning() {
  const riskWarningState = useUserRiskWarningState();

  // We show the warning only in case when no_funds_available or extreme_liquidation_risk
  if (!riskWarningState) {
    return null;
  }

  return (
    <div className="flex items-center justify-start gap-x-4 px-4 text-xs lg:px-6">
      <UserRiskWarningIcon
        size="lg"
        userRiskWarningState="no_funds_available"
      />
      You&apos;ve run out of initial margin / funds available. You cannot
      initiate new positions or withdraw collateral. Deposit more collateral or
      close existing positions to trade.
    </div>
  );
}
