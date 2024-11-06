import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/blitz/common';
import {
  TIER_1_TIER_DATA,
  TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/blitz/consts';

export const blitzConfig: TradingCompetitionConfig = {
  ...commonConfig,
  chainEnv: 'blast',
  contestIds: [7, 8],
  tierDataByContestId: {
    7: TIER_1_TIER_DATA,
    8: TIER_2_TIER_DATA,
  },
};
