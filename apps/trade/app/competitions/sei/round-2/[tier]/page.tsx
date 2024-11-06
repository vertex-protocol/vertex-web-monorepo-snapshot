import { TradingCompetitionTierPage } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/TradingCompetitionTierPage';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    tier: string;
  };
}

export default function SeiTradingCompetitionTierPage() {
  return <TradingCompetitionTierPage />;
}

export async function generateMetadata(
  {
    // params: { tier },
  }: Props,
): Promise<Metadata | undefined> {
  // if (clientEnv.base.brandName !== 'vertex') {
  notFound();
  // }

  // return {
  //   title: {
  //     absolute: `${startCase(tier)} | Sei Trading Competition Round 2`,
  //   },
  // };
}
