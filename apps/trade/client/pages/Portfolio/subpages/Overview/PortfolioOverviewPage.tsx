import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { PortfolioPageContentWrapper } from '../../components/PortfolioPageContentWrapper';
import { OverviewHeroSection } from './components/OverviewHeroSection/OverviewHeroSection';
import { OverviewInfoCardButtons } from './components/OverviewInfoCardButtons/OverviewInfoCardButtons';
import { OverviewTabs } from './components/OverviewTabs';
import { OverviewWelcomeHeader } from './components/OverviewWelcomeHeader/OverviewWelcomeHeader';

export function PortfolioOverviewPage() {
  const { data: overview } = useDerivedSubaccountOverview();

  return (
    <PortfolioPageContentWrapper>
      <div className="flex flex-col gap-y-3.5">
        <OverviewWelcomeHeader />
        <OverviewHeroSection
          accountLeverage={overview?.accountLeverage}
          portfolioValueUsd={overview?.portfolioValueUsd}
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
