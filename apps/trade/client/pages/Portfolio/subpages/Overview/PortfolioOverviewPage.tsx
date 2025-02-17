'use client';

import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { OverviewHeroSection } from 'client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroSection';
import { OverviewInfoCardButtons } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButtons';
import { OverviewTabs } from 'client/pages/Portfolio/subpages/Overview/components/OverviewTabs';
import { OverviewWelcomeHeader } from 'client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/OverviewWelcomeHeader';

export function PortfolioOverviewPage() {
  const { data: overview } = useSubaccountOverview();

  return (
    <PortfolioPageContentWrapper>
      <div className="flex flex-col gap-y-3.5">
        <OverviewWelcomeHeader />
        <OverviewHeroSection
          portfolioValueUsd={overview?.portfolioValueUsd}
          accountLeverage={overview?.accountLeverage}
          liquidationRiskFractionBounded={
            overview?.liquidationRiskFractionBounded
          }
          marginUsageFractionBounded={overview?.marginUsageFractionBounded}
          fundsAvailableBounded={overview?.fundsAvailableBounded}
          fundsUntilLiquidationBounded={overview?.fundsUntilLiquidationBounded}
        />
      </div>
      <OverviewInfoCardButtons
        averageSpotAPRFraction={overview?.spot.averageAPRFraction}
        lpAverageYieldFraction={overview?.lp.averageYieldFraction}
        lpTotalValueUsd={overview?.lp.totalValueUsd}
        netBalance={overview?.spot.netBalance}
        totalEstimatedPerpPnlUsd={overview?.perp.totalUnrealizedPnlUsd}
        totalEstimatedPerpPnlFrac={overview?.perp.totalUnrealizedPnlFrac}
      />
      <OverviewTabs />
    </PortfolioPageContentWrapper>
  );
}
