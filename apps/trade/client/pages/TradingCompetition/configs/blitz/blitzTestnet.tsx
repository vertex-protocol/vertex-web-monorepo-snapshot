import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/blitz/common';
import {
  TIER_1_TIER_DATA,
  TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/blitz/consts';

export const blitzTestnetConfig: TradingCompetitionConfig = {
  ...commonConfig,
  chainEnv: 'blastTestnet',
  contestIds: [9, 10],
  tierDataByContestId: {
    9: TIER_1_TIER_DATA,
    10: TIER_2_TIER_DATA,
  },
};
