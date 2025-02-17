import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/blitz/common';
import {
  TIER_1_TIER_DATA,
  TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/blitz/consts';

export const blitzConfig: TradingCompetitionConfig = {
  ...commonConfig,
  chainEnv: 'blast',
  contestIds: [13, 14],
  tierDataByContestId: {
    13: TIER_1_TIER_DATA,
    14: TIER_2_TIER_DATA,
  },
};
