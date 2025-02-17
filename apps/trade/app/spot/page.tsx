import { NO_SPOT_CHAIN_ENVS } from 'client/modules/envSpecificContent/consts/noSpotChainEnvs';
import { RedirectOnInvalidChainEnvListener } from 'client/modules/envSpecificContent/RedirectOnInvalidChainEnvListener';
import { SpotTradingPage } from 'client/pages/SpotTrading/SpotTradingPage';
import { Metadata } from 'next';

export default function Spot() {
  return (
    <>
      <RedirectOnInvalidChainEnvListener
        invalidChainEnvs={NO_SPOT_CHAIN_ENVS}
      />
      <SpotTradingPage />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Spot',
};
