import React from 'react';
import { AccountHealthPanel } from 'client/modules/trading/components/AccountHealthPanel';
import { WithClassnames } from '@vertex-protocol/web-common';
import { useSpotOrderFormContext } from '../context/SpotOrderFormContext';

export function SpotAccountHealth({ className }: WithClassnames) {
  const { tradingAccountMetrics } = useSpotOrderFormContext();
  const { currentState, estimatedState } = tradingAccountMetrics;

  return (
    <AccountHealthPanel
      className={className}
      currentState={currentState}
      estimatedState={estimatedState}
    />
  );
}
