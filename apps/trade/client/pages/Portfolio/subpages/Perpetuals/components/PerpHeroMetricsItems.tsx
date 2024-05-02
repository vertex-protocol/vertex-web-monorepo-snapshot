import { WithClassnames } from '@vertex-protocol/web-common';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { useMemo } from 'react';

export function PerpHeroMetricsItems({ className }: WithClassnames) {
  const { data: overview } = useDerivedSubaccountOverview();

  const perpMetricItems: LineItemMetricProps[] = useMemo(
    () => [
      {
        tooltip: {
          id: 'perpOpenPositionsPnl',
        },
        label: 'PnL',
        value: overview?.perp.totalUnrealizedPnlUsd,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        tooltip: {
          id: 'perpOpenPositionsNotional',
        },
        label: 'Total Notional',
        value: overview?.perp.totalNotionalValueUsd,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        tooltip: {
          id: 'perpOpenPositionsMarginUsed',
        },
        label: 'Margin Used',
        value: overview?.perp.totalMarginUsedUsd,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
    ],
    [
      overview?.perp.totalUnrealizedPnlUsd,
      overview?.perp.totalNotionalValueUsd,
      overview?.perp.totalMarginUsedUsd,
    ],
  );

  return (
    <PortfolioHeroMetricsPane.Items
      header="Open Positions"
      className={className}
      childContainerClassNames="flex flex-col gap-y-0.5"
    >
      {perpMetricItems.map(({ tooltip, label, value, renderValue }, index) => (
        <PortfolioHeroMetricsPane.LineItem
          key={index}
          label={label}
          value={value}
          tooltip={tooltip}
          renderValue={renderValue}
        />
      ))}
    </PortfolioHeroMetricsPane.Items>
  );
}
