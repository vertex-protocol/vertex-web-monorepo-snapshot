import { VlpPage } from 'client/pages/Vlp/VlpPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function Vlp() {
  return <VlpPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (
    clientEnv.base.brandName !== 'vertex' ||
    !clientEnv.base.enableExperimentalFeatures
  ) {
    notFound();
  }

  return {
    title: 'Vertex Liquidity Provider',
  };
}
