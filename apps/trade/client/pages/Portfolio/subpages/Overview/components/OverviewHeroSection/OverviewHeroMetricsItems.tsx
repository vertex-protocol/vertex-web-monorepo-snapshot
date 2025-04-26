import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { CounterPill, TextButton } from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { OverviewLiquidationRiskBar } from 'client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewLiquidationRiskBar';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import Link from 'next/link';
import { useMemo } from 'react';

interface Props {
  isolatedTotalNetMarginUsd: BigDecimal | undefined;
  liquidationRiskFraction: BigDecimal | undefined;
  fundsAvailableBoundedUsd: BigDecimal | undefined;
  isolatedUnrealizedPnlUsd: BigDecimal | undefined;
}

export function OverviewHeroMetricsItems({
  liquidationRiskFraction,
  isolatedTotalNetMarginUsd,
  fundsAvailableBoundedUsd,
  isolatedUnrealizedPnlUsd,
}: Props) {
  const { numIsoPerpPositions } = useSubaccountCountIndicators();

  const crossHeaderContent = (
    <>
      Cross Account
      <TextButton
        className="text-xs"
        colorVariant="accent"
        as={Link}
        href={ROUTES.portfolio.marginManager}
      >
        View Details
      </TextButton>
    </>
  );

  const isolatedHeaderContent = (
    <>
      <span>Isolated Positions</span>
      {!!numIsoPerpPositions && (
        <CounterPill>{numIsoPerpPositions}</CounterPill>
      )}
    </>
  );

  const crossAccountItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'marginUsage',
          },
          label: 'Funds Available',
          value: fundsAvailableBoundedUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          label: 'Liquidation Risk',
          valueContent: (
            <OverviewLiquidationRiskBar
              liquidationRiskFraction={liquidationRiskFraction}
            />
          ),
        },
      ] satisfies ValueWithLabelProps[],
    [liquidationRiskFraction, fundsAvailableBoundedUsd],
  );

  const isolatedItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'overviewIsoUnrealizedPnl',
          },
          label: 'Unrealized PnL',
          value: isolatedUnrealizedPnlUsd,
          valueClassName: getSignDependentColorClassName(
            isolatedUnrealizedPnlUsd,
          ),
          numberFormatSpecifier:
            PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'overviewIsoMargin',
          },
          label: 'Margin',
          value: isolatedTotalNetMarginUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [isolatedTotalNetMarginUsd, isolatedUnrealizedPnlUsd],
  );

  return (
    <PortfolioHeroMetricsPane.ItemsGroupContainer>
      <PortfolioHeroMetricsPane.ItemsGroup
        header={crossHeaderContent}
        headerClassName="items-end justify-between"
      >
        {crossAccountItems.map((props, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={`health_info_${index}`}
            {...props}
          />
        ))}
      </PortfolioHeroMetricsPane.ItemsGroup>
      <PortfolioHeroMetricsPane.ItemsGroup
        header={isolatedHeaderContent}
        headerClassName="justify-between"
      >
        {isolatedItems.map((props, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={`risk_info_${index}`}
            {...props}
          />
        ))}
      </PortfolioHeroMetricsPane.ItemsGroup>
    </PortfolioHeroMetricsPane.ItemsGroupContainer>
  );
}
