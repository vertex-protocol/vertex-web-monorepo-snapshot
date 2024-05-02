import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { LinkButton } from 'client/components/LinkButton';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import Link from 'next/link';
import { useMemo } from 'react';
import { OverviewLiquidationRiskBar } from './OverviewLiquidationRiskBar';

interface Props extends WithClassnames {
  fundsAvailable: BigDecimal | undefined;
  liquidationRiskFraction: BigDecimal | undefined;
  fundsUntilLiquidation: BigDecimal | undefined;
  marginUsageFraction: BigDecimal | undefined;
  accountLeverage: BigDecimal | undefined;
}

export function OverviewHeroMetricsItems({
  fundsAvailable,
  liquidationRiskFraction,
  fundsUntilLiquidation,
  marginUsageFraction,
  accountLeverage,
  className,
}: Props) {
  const userRiskWarningState = useUserRiskWarningState();

  const lineItemContainerClassNames = 'flex flex-col gap-y-0.5';

  const healthInfoItems: LineItemMetricProps[] = useMemo(
    () => [
      {
        tooltip: {
          id: 'marginUsage',
        },
        label: 'Margin Usage',
        value: marginUsageFraction,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        tooltip: {
          id: 'fundsAvailable',
        },
        label: 'Funds Available',
        value: fundsAvailable,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        tooltip: {
          id: 'accountLeverage',
        },
        label: 'Account Leverage',
        value: accountLeverage,
        renderValue: (val) =>
          `${formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
          })}x`,
      },
    ],
    [fundsAvailable, marginUsageFraction, accountLeverage],
  );

  const riskInfoItems: LineItemMetricProps[] = useMemo(
    () => [
      {
        label: 'Liquidation Risk',
        value: liquidationRiskFraction,
        renderValue: (val) => (
          <OverviewLiquidationRiskBar liquidationRiskFraction={val} />
        ),
      },
      {
        tooltip: {
          id: 'overviewFundsUntilLiquidation',
        },
        label: 'Funds until Liq.',
        value: fundsUntilLiquidation,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
    ],
    [liquidationRiskFraction, fundsUntilLiquidation],
  );

  const headerContent = (
    <div className="flex items-end justify-between">
      <div className="flex items-center gap-x-2">
        Details
        <RiskWarningIcon
          userRiskWarningState={userRiskWarningState}
          size="md"
        />
      </div>
      <LinkButton
        as={Link}
        href={ROUTES.portfolio.marginManager}
        color="accent"
        className="text-xs font-normal no-underline"
      >
        View More
      </LinkButton>
    </div>
  );

  return (
    <PortfolioHeroMetricsPane.Items
      header={headerContent}
      className={className}
      childContainerClassNames="flex flex-col gap-y-2"
    >
      <div className={lineItemContainerClassNames}>
        {healthInfoItems.map(
          ({ tooltip, label, value, renderValue }, index) => (
            <PortfolioHeroMetricsPane.LineItem
              key={`health_info_${index}`}
              label={label}
              value={value}
              tooltip={tooltip}
              renderValue={renderValue}
            />
          ),
        )}
      </div>
      <Divider />
      <div className={lineItemContainerClassNames}>
        {riskInfoItems.map(({ tooltip, label, value, renderValue }, index) => (
          <PortfolioHeroMetricsPane.LineItem
            key={`risk_info_${index}`}
            label={label}
            value={value}
            tooltip={tooltip}
            renderValue={renderValue}
          />
        ))}
      </div>
    </PortfolioHeroMetricsPane.Items>
  );
}
