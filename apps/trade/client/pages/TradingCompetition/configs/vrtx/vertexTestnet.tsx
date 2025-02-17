import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/vrtx/common';
import {
  ROUND_1_TIER_1_TIER_DATA,
  ROUND_1_TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/vrtx/consts';

export const vertexTestnetRound1Config: TradingCompetitionConfig = {
  ...commonConfig,
  chainEnv: 'arbitrumTestnet',
  contestIds: [18, 19],
  tierDataByContestId: {
    18: ROUND_1_TIER_1_TIER_DATA,
    19: ROUND_1_TIER_2_TIER_DATA,
  },
  rounds: {
    current: 1,
    total: 4,
  },
};
