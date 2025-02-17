import {
  ARB_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  MANTLE_CHAIN_ENVS,
} from '@vertex-protocol/react-client';
import { RedirectOnInvalidChainEnvListener } from 'client/modules/envSpecificContent/RedirectOnInvalidChainEnvListener';
import { VaultsPage } from 'client/pages/Vaults/VaultsPage';
import { Metadata } from 'next';

export default function Vaults() {
  return (
    <>
      <RedirectOnInvalidChainEnvListener
        validChainEnvs={[
          ...ARB_CHAIN_ENVS,
          ...BLAST_CHAIN_ENVS,
          ...MANTLE_CHAIN_ENVS,
        ]}
      />
      <VaultsPage />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Vaults',
};
