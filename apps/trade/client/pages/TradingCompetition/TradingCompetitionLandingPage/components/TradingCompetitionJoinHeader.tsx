'use client';

import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionJoinHeader() {
  const {
    config: { eligibilityRequirement },
  } = useTradingCompetitionContext();
  const { eligibilityType, productMetadata } = eligibilityRequirement;

  const meetRequirementsCopy = {
    account_value: 'Meet the min. account value to join.',
    product_balance: `Meet the min. ${productMetadata?.symbol} balance to join.`,
    staked_vrtx: `Meet the min. ${productMetadata?.symbol} staked to join.`,
  }[eligibilityType];

  return (
    <div>
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
