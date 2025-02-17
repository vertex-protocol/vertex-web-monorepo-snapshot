import { SONIC_CHAIN_ENVS } from '@vertex-protocol/react-client';
import { RedirectOnInvalidChainEnvListener } from 'client/modules/envSpecificContent/RedirectOnInvalidChainEnvListener';
import { SonicPointsPage } from 'client/pages/SonicPoints/SonicPointsPage';
import { clientEnv } from 'common/environment/clientEnv';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default function SonicPoints() {
  return (
    <>
      <RedirectOnInvalidChainEnvListener validChainEnvs={SONIC_CHAIN_ENVS} />
      <SonicPointsPage />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  if (clientEnv.base.brandName !== 'vertex') {
    notFound();
  }

  return {
    title: 'Sonic Gems',
  };
}
