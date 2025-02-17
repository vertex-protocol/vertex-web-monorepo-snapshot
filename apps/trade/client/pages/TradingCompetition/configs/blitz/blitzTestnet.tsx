import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/blitz/common';
import {
  TIER_1_TIER_DATA,
  TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/blitz/consts';

export const blitzTestnetConfig: TradingCompetitionConfig = {
  ...commonConfig,
  chainEnv: 'blastTestnet',
  contestIds: [17, 18],
  tierDataByContestId: {
    17: TIER_1_TIER_DATA,
    18: TIER_2_TIER_DATA,
  },
};
