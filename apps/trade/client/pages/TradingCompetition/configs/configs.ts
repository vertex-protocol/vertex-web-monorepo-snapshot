import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import { blitzConfig } from 'client/pages/TradingCompetition/configs/blitz/blitz';
import { blitzTestnetConfig } from 'client/pages/TradingCompetition/configs/blitz/blitzTestnet';
import { seiConfigByRound } from 'client/pages/TradingCompetition/configs/sei/sei';
import { seiTestnetConfigByRound } from 'client/pages/TradingCompetition/configs/sei/seiTestnet';

export const TRADING_COMPETITION_CONFIGS_BY_KEY = {
  blitz: blitzConfig,
  blitzTestnet: blitzTestnetConfig,
  seiRound1: seiConfigByRound.round1,
  seiTestnetRound1: seiTestnetConfigByRound.round1,
  seiRound2: seiConfigByRound.round2,
  seiTestnetRound2: seiTestnetConfigByRound.round2,
  seiRound3: seiConfigByRound.round3,
  seiTestnetRound3: seiTestnetConfigByRound.round3,
} satisfies Record<string, TradingCompetitionConfig>;

export type TradingCompetitionConfigKey =
  keyof typeof TRADING_COMPETITION_CONFIGS_BY_KEY;
