import { PortfolioHeader } from '../../components/PortfolioHeader';
import { PortfolioPageContentWrapper } from '../../components/PortfolioPageContentWrapper';
import { PerpHeroSection } from './components/PerpHeroSection';
import { PerpPositionsTabs } from './components/PerpPositionsTabs';

export function PortfolioPerpetualsPage() {
  return (
    <PortfolioPageContentWrapper>
      <PortfolioHeader>Perp Positions</PortfolioHeader>
      <PerpHeroSection />
      <PerpPositionsTabs />
    </PortfolioPageContentWrapper>
  );
}
