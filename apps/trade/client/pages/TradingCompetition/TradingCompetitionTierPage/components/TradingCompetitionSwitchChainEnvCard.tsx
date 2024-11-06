'use client';

import { Card, PrimaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { startCase } from 'lodash';

export function TradingCompetitionSwitchChainEnvCard() {
  const {
    config: { chainEnv: requiredChainEnv },
  } = useTradingCompetitionContext();

  const userStateErrorProps = useButtonUserStateErrorProps({
    requiredChainEnv,
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectChainEnv,
  });

  if (!userStateErrorProps) {
    return null;
  }

  return (
    <Card className="border-accent flex flex-col items-center gap-y-4 p-8 lg:py-16">
      <p className="text-text-primary text-center lg:text-lg">
        This competition is only available on {startCase(requiredChainEnv)}.
      </p>
      <PrimaryButton {...userStateErrorProps} />
    </Card>
  );
}
