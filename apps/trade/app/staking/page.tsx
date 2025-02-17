import { VrtxStakingPage } from 'client/pages/Staking/VrtxStakingPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function VrtxStaking() {
  return <VrtxStakingPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (clientEnv.base.brandName !== 'vertex') {
    notFound();
  }

  return {
    title: 'VRTX Staking',
  };
}
