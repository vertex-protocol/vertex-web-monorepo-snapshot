import { VertexTokenPage } from 'client/pages/VertexToken/VertexTokenPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function Vrtx() {
  return <VertexTokenPage />;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (clientEnv.base.brandName !== 'vertex') {
    notFound();
  }

  return {
    title: 'VRTX Token',
  };
}
