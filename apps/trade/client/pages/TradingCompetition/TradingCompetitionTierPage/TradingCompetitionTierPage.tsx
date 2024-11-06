'use client';

import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { TradingCompetitionLeaderboardHeader } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionLeaderboardHeader';
import { TradingCompetitionSwitchChainEnvCard } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionSwitchChainEnvCard';
import { TradingCompetitionTable } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTable';
import { TradingCompetitionTierInfoCards } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionTierInfoCards';
import { TradingCompetitionTierPageHeader } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierPageHeader';

export function TradingCompetitionTierPage() {
  const { isInvalidChain } = useTradingCompetitionContext();

  if (isInvalidChain) {
    return (
      <>
        <TradingCompetitionTierPageHeader />
        <TradingCompetitionSwitchChainEnvCard />
      </>
    );
  }

  return (
    <>
      <TradingCompetitionTierPageHeader />
      <TradingCompetitionTierInfoCards />
      <TradingCompetitionSwitchChainEnvCard />
      <TradingCompetitionLeaderboardHeader />
      <TradingCompetitionTable />
    </>
  );
}
