import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { CounterPill } from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useMemo } from 'react';

export function PerpHeroMetricsItems() {
  const { data: overview } = useSubaccountOverview();
  const { numCrossPerpPositions, numIsoPerpPositions } =
    useSubaccountCountIndicators();

  const crossHeaderContent = (
    <>
      <span>Cross Positions</span>
      {!!numCrossPerpPositions && (
        <CounterPill>{numCrossPerpPositions}</CounterPill>
      )}
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

  const crossPositionItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'perpCrossOpenPositionsPnl',
          },
          label: 'Unrealized PnL',
          value: overview?.perp.cross.totalUnrealizedPnlUsd,
          valueClassName: getSignDependentColorClassName(
            overview?.perp.cross.totalUnrealizedPnlUsd,
          ),
          numberFormatSpecifier:
            PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'perpCrossOpenPositionsMargin',
          },
          label: 'Margin Used',
          value: overview?.perp.cross.totalMarginUsedUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [
      overview?.perp.cross.totalUnrealizedPnlUsd,
      overview?.perp.cross.totalMarginUsedUsd,
    ],
  );

  const isolatedPositionItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'perpIsoOpenPositionsPnl',
          },
          label: 'Unrealized PnL',
          value: overview?.perp.iso.totalUnrealizedPnlUsd,
          valueClassName: getSignDependentColorClassName(
            overview?.perp.iso.totalUnrealizedPnlUsd,
          ),
          numberFormatSpecifier:
            PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'perpIsoOpenPositionsMargin',
          },
          label: 'Margin',
          value: overview?.perp.iso.totalNetMarginUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [
      overview?.perp.iso.totalUnrealizedPnlUsd,
      overview?.perp.iso.totalNetMarginUsd,
    ],
  );

  return (
    <PortfolioHeroMetricsPane.ItemsGroupContainer>
      <PortfolioHeroMetricsPane.ItemsGroup
        header={crossHeaderContent}
        headerClassName="justify-between"
      >
        {crossPositionItems.map(
          (
            { tooltip, label, value, valueClassName, numberFormatSpecifier },
            index,
          ) => (
            <PortfolioHeroMetricsPane.ValueWithLabel
              key={index}
              label={label}
              value={value}
              valueClassName={valueClassName}
              tooltip={tooltip}
              numberFormatSpecifier={numberFormatSpecifier}
            />
          ),
        )}
      </PortfolioHeroMetricsPane.ItemsGroup>
      <PortfolioHeroMetricsPane.ItemsGroup
        header={isolatedHeaderContent}
        headerClassName="justify-between"
      >
        {isolatedPositionItems.map(
          (
            { tooltip, label, value, valueClassName, numberFormatSpecifier },
            index,
          ) => (
            <PortfolioHeroMetricsPane.ValueWithLabel
              key={index}
              label={label}
              value={value}
              valueClassName={valueClassName}
              tooltip={tooltip}
              numberFormatSpecifier={numberFormatSpecifier}
            />
          ),
        )}
      </PortfolioHeroMetricsPane.ItemsGroup>
    </PortfolioHeroMetricsPane.ItemsGroupContainer>
  );
}
