import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { commonConfig } from 'client/pages/TradingCompetition/configs/sei/common';
import {
  TIER_1_TIER_DATA,
  TIER_2_TIER_DATA,
} from 'client/pages/TradingCompetition/configs/sei/consts';
import { SEI_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/sei/routes';

export const seiTestnetConfigByRound: Record<string, TradingCompetitionConfig> =
  {
    round1: {
      ...commonConfig,
      chainEnv: 'seiTestnet',
      contestIds: [5, 6],
      tierDataByContestId: {
        5: {
          ...TIER_1_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round1tier1,
        },
        6: {
          ...TIER_2_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round1tier2,
        },
      },
    },
    round2: {
      ...commonConfig,
      chainEnv: 'seiTestnet',
      contestIds: [7, 8],
      tierDataByContestId: {
        7: {
          ...TIER_1_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round2tier1,
        },
        8: {
          ...TIER_2_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round2tier2,
        },
      },
    },
    round3: {
      ...commonConfig,
      chainEnv: 'seiTestnet',
      contestIds: [9, 10],
      tierDataByContestId: {
        9: {
          ...TIER_1_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round3tier1,
        },
        10: {
          ...TIER_2_TIER_DATA,
          href: SEI_TRADING_COMPETITION_ROUTES.round3tier2,
        },
      },
    },
  };
