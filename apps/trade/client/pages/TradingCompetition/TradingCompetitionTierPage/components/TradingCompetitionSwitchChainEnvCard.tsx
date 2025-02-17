'use client';

import { getChainEnvName } from '@vertex-protocol/react-client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { Card, PrimaryButton } from '@vertex-protocol/web-ui';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionSwitchChainEnvCard() {
  const { setPrimaryChainEnv } = useEVMContext();
  const {
    config: { chainEnv: requiredChainEnv },
  } = useTradingCompetitionContext();

  const requiredChainEnvDisplayName = getChainEnvName(requiredChainEnv);

  return (
    <Card className="border-accent flex flex-col items-center gap-y-4 p-8 lg:py-16">
      <p className="text-text-primary text-center lg:text-lg">
        This competition is only available on {requiredChainEnvDisplayName}.
      </p>
      <PrimaryButton onClick={() => setPrimaryChainEnv(requiredChainEnv)}>
        Switch to {requiredChainEnvDisplayName}
      </PrimaryButton>
    </Card>
  );
}
