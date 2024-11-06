import { VertexReferralsPage } from 'client/pages/VertexReferrals/VertexReferralsPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function Referrals() {
  return <VertexReferralsPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (clientEnv.base.brandName !== 'vertex') {
    notFound();
  }

  return {
    title: 'Referrals',
  };
}
