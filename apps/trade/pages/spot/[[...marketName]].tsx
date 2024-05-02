import {
  ComingSoonSpotTradingPage,
  SpotTradingPage,
} from 'client/pages/SpotTrading/SpotTradingPage';
import { clientEnv } from 'common/environment/clientEnv';
import type { NextPage } from 'next';

const Spot: NextPage = () => {
  return clientEnv.base.brandName === 'vertex' ? (
    <SpotTradingPage />
  ) : (
    <ComingSoonSpotTradingPage />
  );
};

export default Spot;
