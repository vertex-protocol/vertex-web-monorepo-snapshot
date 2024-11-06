import { RedeemElectionTokensPage } from 'client/pages/RedeemElectionTokens/RedeemElectionTokensPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function RedeemElectionTokens() {
  return <RedeemElectionTokensPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (
    clientEnv.base.brandName !== 'vertex' ||
    !clientEnv.base.enableExperimentalFeatures
  ) {
    notFound();
  }

  return {
    title: 'Redeem Election Tokens',
  };
}
