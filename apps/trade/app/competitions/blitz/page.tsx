import { TradingCompetitionLandingPage } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/TradingCompetitionLandingPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * REMINDER: When hiding / unhiding this page, make sure to also update
 * `BlitzTradingCompetitionOpportunityCard` appropriately.
 */
export default function BlitzTradingCompetitionLandingPage() {
  return <TradingCompetitionLandingPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  // if (clientEnv.base.brandName !== 'blitz') {
  notFound();
  // }

  // return {
  //   title: 'Blitz Trading Competition',
  // };
}
