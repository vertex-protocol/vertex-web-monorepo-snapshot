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
          fundsAvailableBoundedUsd={overview?.fundsAvailableBoundedUsd}
          isolatedTotalNetMarginUsd={overview?.perp.iso.totalNetMarginUsd}
          isolatedUnrealizedPnlUsd={overview?.perp.iso.totalUnrealizedPnlUsd}
          liquidationRiskFractionBounded={
            overview?.liquidationRiskFractionBounded
          }
        />
      </div>
      <OverviewInfoCardButtons
        averageDepositAPRFraction={overview?.spot.averageDepositAPRFraction}
        averageBorrowAPRFraction={overview?.spot.averageBorrowAPRFraction}
        totalDepositsValueUsd={overview?.spot.totalDepositsValueUsd}
        totalBorrowsValueUsd={overview?.spot.totalBorrowsValueUsd}
        totalEstimatedPerpPnlUsd={overview?.perp.totalUnrealizedPnlUsd}
        totalEstimatedPerpPnlFrac={overview?.perp.totalUnrealizedPnlFrac}
      />
      <OverviewTabs />
    </PortfolioPageContentWrapper>
  );
}
