'use client';

import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import {
  UseTradingCompetitionData,
  useTradingCompetitionData,
} from 'client/modules/tradingCompetition/hooks/useTradingCompetitionData';
import { TradingCompetitionConfig } from 'client/modules/tradingCompetition/types';
import {
  TRADING_COMPETITION_CONFIGS_BY_KEY,
  TradingCompetitionConfigKey,
} from 'client/pages/TradingCompetition/configs/configs';
import { usePathname } from 'next/navigation';
import { createContext, use, useMemo } from 'react';

interface TradingCompetitionContextData extends UseTradingCompetitionData {
  config: TradingCompetitionConfig;
  isInvalidChain: boolean;
}

const TradingCompetitionContext = createContext<TradingCompetitionContextData>(
  {} as TradingCompetitionContextData,
);

export const useTradingCompetitionContext = () =>
  use(TradingCompetitionContext);

export function TradingCompetitionContextProvider({
  children,
  configKey,
}: WithChildren<{ configKey: TradingCompetitionConfigKey }>) {
  const config = TRADING_COMPETITION_CONFIGS_BY_KEY[configKey];
  const pathname = usePathname();

  const tierContestId = useMemo(() => {
    const [tierDataContestId] =
      Object.entries(config.tierDataByContestId).find(
        ([, tierData]) => tierData.href === pathname,
      ) ?? [];

    return tierDataContestId ? Number(tierDataContestId) : undefined;
  }, [config.tierDataByContestId, pathname]);

  const tradingCompetitionData = useTradingCompetitionData({
    config,
    tierContestId,
  });
  const { primaryChainEnv } = useEVMContext();

  const data = useMemo(() => {
    return {
      config,
      isInvalidChain: primaryChainEnv !== config.chainEnv,
      ...tradingCompetitionData,
    };
  }, [config, tradingCompetitionData, primaryChainEnv]);

  return (
    <TradingCompetitionContext value={data}>
      {children}
    </TradingCompetitionContext>
  );
}
