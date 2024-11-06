'use client';

import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionJoinHeader() {
  const {
    config: { requiredProductBalanceMetadata },
  } = useTradingCompetitionContext();

  const meetRequirementsCopy = requiredProductBalanceMetadata
    ? `Meet the min. ${requiredProductBalanceMetadata.symbol} balance to join.`
    : 'Meet the min. account value to join.';

  return (
    <div className="">
      <h2 className="text-text-primary whitespace-nowrap text-lg lg:text-xl">
        How to Participate
      </h2>
      <p className="text-text-tertiary text-sm">
        {meetRequirementsCopy}{' '}
        <span className="text-text-primary">Trade any market to win.</span>
      </p>
    </div>
  );
}
