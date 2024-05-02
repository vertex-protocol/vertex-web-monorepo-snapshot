import React from 'react';
import { AccountHealthPanel } from 'client/modules/trading/components/AccountHealthPanel';
import { WithClassnames } from '@vertex-protocol/web-common';
import { usePerpOrderFormContext } from '../context/PerpOrderFormContext';

export function PerpAccountHealth({ className }: WithClassnames) {
  const { tradingAccountMetrics } = usePerpOrderFormContext();
  const { currentState, estimatedState } = tradingAccountMetrics;

  return (
    <AccountHealthPanel
      className={className}
      currentState={currentState}
      estimatedState={estimatedState}
    />
  );
}
