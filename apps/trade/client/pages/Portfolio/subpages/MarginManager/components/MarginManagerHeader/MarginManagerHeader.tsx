'use client';

import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { InitialMarginUsagePane } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/InitialMarginUsagePane';
import { MaintenanceMarginUsagePane } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MaintenanceMarginUsagePane';

export function MarginManagerHeader() {
  const { data: derivedOverview } = useDerivedSubaccountOverview();

  return (
    <div className="flex flex-col gap-y-4 lg:gap-y-6">
      <PortfolioHeader>Margin Manager</PortfolioHeader>
      <div className="grid grid-cols-1 flex-col gap-4 lg:grid-cols-2 lg:gap-7">
        <InitialMarginUsagePane
          marginUsageFraction={derivedOverview?.marginUsageFractionBounded}
          fundsAvailable={derivedOverview?.fundsAvailableBounded}
        />
        <MaintenanceMarginUsagePane
          fundsUntilLiquidation={derivedOverview?.fundsUntilLiquidationBounded}
          liquidationRiskFraction={
            derivedOverview?.liquidationRiskFractionBounded
          }
        />
      </div>
    </div>
  );
}
