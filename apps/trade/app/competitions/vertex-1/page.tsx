import { TradingCompetitionLandingPage } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/TradingCompetitionLandingPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function VrtxTradingCompetitionLandingPage() {
  return <TradingCompetitionLandingPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  // if (clientEnv.base.brandName !== 'vertex') {
  notFound();
  // }
  // return {
  //   title: 'Trading Competition Round 1',
  // };
}
