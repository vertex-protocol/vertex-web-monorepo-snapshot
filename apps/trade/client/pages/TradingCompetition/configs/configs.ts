import { blitzConfig } from 'client/pages/TradingCompetition/configs/blitz/blitz';
import { mantleConfig } from 'client/pages/TradingCompetition/configs/mantle/mantle';
import { TradingCompetitionConfig } from 'client/pages/TradingCompetition/configs/types';

export const TRADING_COMPETITION_CONFIGS_BY_KEY = {
  mantle: mantleConfig,
  blitz: blitzConfig,
} satisfies Record<string, TradingCompetitionConfig>;

export type TradingCompetitionConfigKey =
  keyof typeof TRADING_COMPETITION_CONFIGS_BY_KEY;
