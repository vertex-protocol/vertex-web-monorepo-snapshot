import { TradingCompetitionTierPage } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/TradingCompetitionTierPage';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tier: string }>;
}

export default function BlitzTradingCompetitionTierPage() {
  return <TradingCompetitionTierPage />;
}

export async function generateMetadata(
  {
    // params,
  }: Props,
): Promise<Metadata | undefined> {
  // if (clientEnv.base.brandName !== 'blitz') {
  notFound();
  // }

  // const { tier } = await params;

  // return {
  //   title: {
  //     absolute: `${startCase(tier)} | Blitz Trading Competition`,
  //   },
  // };
}
