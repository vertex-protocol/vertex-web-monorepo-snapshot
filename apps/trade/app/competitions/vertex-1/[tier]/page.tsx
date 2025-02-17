import { TradingCompetitionTierPage } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/TradingCompetitionTierPage';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tier: string }>;
}

export default function VrtxTradingCompetitionTierPage() {
  return <TradingCompetitionTierPage />;
}

export async function generateMetadata({}: Props): Promise<
  Metadata | undefined
> {
  // if (clientEnv.base.brandName !== 'vertex') {
  notFound();
  // }

  // const { tier } = await params;

  // return {
  //   title: {
  //     absolute: `${startCase(tier)} | Trading Competition Round 1`,
  //   },
  // };
}
