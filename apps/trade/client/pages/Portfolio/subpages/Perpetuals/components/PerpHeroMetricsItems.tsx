import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { useMemo } from 'react';

export function PerpHeroMetricsItems({ className }: WithClassnames) {
  const { data: overview } = useSubaccountOverview();

  const perpMetricItems = useMemo(
    () =>
      [
        {
          tooltip: {
            id: 'perpOpenPositionsPnl',
          },
          label: 'PnL',
          value: overview?.perp.totalUnrealizedPnlUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'perpOpenPositionsNotional',
          },
          label: 'Total Notional',
          value: overview?.perp.totalNotionalValueUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          tooltip: {
            id: 'perpOpenPositionsMarginUsed',
          },
          label: 'Margin Used',
          value: overview?.perp.cross.totalMarginUsedUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [
      overview?.perp.totalUnrealizedPnlUsd,
      overview?.perp.totalNotionalValueUsd,
      overview?.perp.cross.totalMarginUsedUsd,
    ],
  );

  return (
    <PortfolioHeroMetricsPane.Items
      header="Open Positions"
      className={className}
      childContainerClassNames="flex flex-col gap-y-0.5"
    >
      {perpMetricItems.map(
        ({ tooltip, label, value, numberFormatSpecifier }, index) => (
          <PortfolioHeroMetricsPane.ValueWithLabel
            key={index}
            label={label}
            value={value}
            tooltip={tooltip}
            numberFormatSpecifier={numberFormatSpecifier}
          />
        ),
      )}
    </PortfolioHeroMetricsPane.Items>
  );
}
