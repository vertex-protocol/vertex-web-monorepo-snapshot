import { PortfolioFaucetPage } from 'client/pages/Portfolio/subpages/Faucet/PortfolioFaucetPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function FaucetPage() {
  return <PortfolioFaucetPage />;
}

export async function generateMetadata(): Promise<Metadata> {
  if (!clientEnv.base.enableExperimentalFeatures) {
    notFound();
  }

  return {
    title: 'Faucet',
  };
}
