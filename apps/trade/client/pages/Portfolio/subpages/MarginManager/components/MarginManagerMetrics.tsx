'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { useMemo } from 'react';

export function MarginManagerMetrics() {
  const { data: overview } = useSubaccountOverview();

  const metricsItems = useMemo(
    () =>
      [
        {
          label: 'Margin Usage',
          value: overview?.marginUsageFractionBounded,
          numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        },
        {
          label: 'Liquidation Risk',
          valueContent: (
            <div className="flex items-center gap-x-2 lg:gap-x-2.5">
              {formatNumber(overview?.liquidationRiskFractionBounded, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
              <LiquidationRiskBar
                liquidationRiskFraction={
                  overview?.liquidationRiskFractionBounded
                }
                className="h-2 w-14 lg:h-3.5 lg:w-28"
              />
            </div>
          ),
        },
        {
          label: 'Available Margin',
          value: overview?.fundsAvailableBoundedUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
        {
          label: 'Funds Until Liquidation',
          value: overview?.fundsUntilLiquidationBoundedUsd,
          numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      ] satisfies ValueWithLabelProps[],
    [
      overview?.marginUsageFractionBounded,
      overview?.liquidationRiskFractionBounded,
      overview?.fundsAvailableBoundedUsd,
      overview?.fundsUntilLiquidationBoundedUsd,
    ],
  );

  return (
    <div className="grid grid-cols-2 gap-6 lg:flex lg:flex-wrap lg:gap-x-8">
      {metricsItems.map((props, index) => (
        <ValueWithLabel.Vertical sizeVariant="lg" key={index} {...props} />
      ))}
    </div>
  );
}
