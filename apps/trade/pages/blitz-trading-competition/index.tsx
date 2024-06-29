import { TradingCompetitionPage } from 'client/pages/TradingCompetition/TradingCompetitionPage';
import { clientEnv } from 'common/environment/clientEnv';
import type { NextPage } from 'next';

export async function getStaticProps() {
  const isBlitzBrand = clientEnv.base.brandName === 'blitz';

  if (!isBlitzBrand) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

const BlitzTradingCompetition: NextPage = () => {
  return <TradingCompetitionPage configKey="blitz" />;
};

export default BlitzTradingCompetition;
