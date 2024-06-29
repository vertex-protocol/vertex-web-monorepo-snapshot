import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { LinkButton } from 'client/components/LinkButton';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
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

  const healthInfoItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'marginUsage',
          },
          label: 'Margin Usage',
          value: marginUsageFraction,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          tooltip: {
            id: 'fundsAvailable',
          },
          label: 'Funds Available',
          value: fundsAvailable,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'accountLeverage',
          },
          label: 'Account Leverage',
          valueContent: `${formatNumber(accountLeverage, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
          })}x`,
        },
      ] satisfies ValueWithLabelProps[],
    [fundsAvailable, marginUsageFraction, accountLeverage],
  );

  const riskInfoItems = useMemo(
    () =>
      [
        {
          label: 'Liquidation Risk',
          valueContent: (
            <OverviewLiquidationRiskBar
              liquidationRiskFraction={liquidationRiskFraction}
            />
          ),
        },
        {
          tooltip: {
            id: 'overviewFundsUntilLiquidation',
          },
          label: 'Funds until Liq.',
          value: fundsUntilLiquidation,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
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
        colorVariant="accent"
        className="text-xs no-underline"
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
        {healthInfoItems.map((props, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={`health_info_${index}`}
            {...props}
          />
        ))}
      </div>
      <Divider />
      <div className={lineItemContainerClassNames}>
        {riskInfoItems.map((props, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={`risk_info_${index}`}
            {...props}
          />
        ))}
      </div>
    </PortfolioHeroMetricsPane.Items>
  );
}
