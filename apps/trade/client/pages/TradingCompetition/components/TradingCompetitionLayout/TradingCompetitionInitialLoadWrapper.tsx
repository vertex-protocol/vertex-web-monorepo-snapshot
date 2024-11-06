'use client';

import { WithChildren } from '@vertex-protocol/web-common';
import { SpinnerContainer } from 'client/components/SpinnerContainer';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionInitialLoadWrapper({
  children,
}: WithChildren) {
  const { isLoadingContestData } = useTradingCompetitionContext();

  // We have a fair amount of components that depend on this data, so instead
  // of creating loading states for them individually, we just show one here.
  if (isLoadingContestData) {
    return <SpinnerContainer />;
  }

  return children;
}
