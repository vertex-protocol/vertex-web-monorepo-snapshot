import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { PerpHeroSection } from 'client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroSection';
import { PerpPositionsTabs } from 'client/pages/Portfolio/subpages/Perpetuals/components/PerpPositionsTabs';

export function PortfolioPerpPositionsPage() {
  return (
    <PortfolioPageContentWrapper>
      <PortfolioHeader>Perp Positions</PortfolioHeader>
      <PerpHeroSection />
      <PerpPositionsTabs />
    </PortfolioPageContentWrapper>
  );
}
