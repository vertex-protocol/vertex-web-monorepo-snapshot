import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { RedirectOnInvalidChainEnvListener } from 'client/modules/envSpecificContent/RedirectOnInvalidChainEnvListener';
import { VaultsPage } from 'client/pages/Vaults/VaultsPage';
import { Metadata } from 'next';

export default function Vaults() {
  return (
    <>
      <RedirectOnInvalidChainEnvListener
        validChainIds={[
          ...ARB_CHAIN_IDS,
          ...BLAST_CHAIN_IDS,
          ...MANTLE_CHAIN_IDS,
        ]}
      />
      <VaultsPage />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Vaults',
};
