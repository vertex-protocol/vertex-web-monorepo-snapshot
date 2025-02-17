import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { blitzConfig } from 'client/pages/TradingCompetition/configs/blitz/blitz';
import { blitzTestnetConfig } from 'client/pages/TradingCompetition/configs/blitz/blitzTestnet';
import { vertexRound1Config } from 'client/pages/TradingCompetition/configs/vrtx/vertex';
import { vertexTestnetRound1Config } from 'client/pages/TradingCompetition/configs/vrtx/vertexTestnet';

export const TRADING_COMPETITION_CONFIGS_BY_KEY = {
  blitz: blitzConfig,
  blitzTestnet: blitzTestnetConfig,
  vertexRound1: vertexRound1Config,
  vertexTestnetRound1: vertexTestnetRound1Config,
} satisfies Record<string, TradingCompetitionConfig>;

export type TradingCompetitionConfigKey =
  keyof typeof TRADING_COMPETITION_CONFIGS_BY_KEY;
