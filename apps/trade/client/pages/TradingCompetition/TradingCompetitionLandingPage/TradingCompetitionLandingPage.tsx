import { TradingCompetitionPageHeader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionPageHeader';
import { TradingCompetitionJoinHeader } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionJoinHeader';
import { TradingCompetitionLandingInfoCards } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionLandingInfoCards/TradingCompetitionLandingInfoCards';
import { TradingCompetitionPrizeHero } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionPrizeHero';
import { TradingCompetitionSubaccountsBanner } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionSubaccountsBanner/TradingCompetitionSubaccountsBanner';

export function TradingCompetitionLandingPage() {
  return (
    <>
      <TradingCompetitionPageHeader title="Trading Competition" />
      <TradingCompetitionPrizeHero />
      <TradingCompetitionJoinHeader />
      <TradingCompetitionLandingInfoCards />
      <TradingCompetitionSubaccountsBanner />
    </>
  );
}
