import { useRedirectOnInvalidChain } from 'client/modules/app/hooks/useRedirectOnInvalidChain';
import { MANTLE_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { TradingCompetitionPage } from 'client/pages/TradingCompetition/TradingCompetitionPage';
import { clientEnv } from 'common/environment/clientEnv';
import type { NextPage } from 'next';

export async function getStaticProps() {
  const { brandName } = clientEnv.base;

  if (brandName !== 'vertex') {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

const MantleTradingCompetition: NextPage = () => {
  useRedirectOnInvalidChain(MANTLE_CHAIN_IDS);

  return <TradingCompetitionPage configKey="mantle" />;
};

export default MantleTradingCompetition;
