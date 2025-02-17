'use client';

import { LinkButton } from '@vertex-protocol/web-ui';
import { usePushHistoryPage } from 'client/hooks/ui/navigation/usePushHistoryPage';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';

export function BalancesHeader() {
  return (
    <div className="flex flex-col gap-y-3 sm:flex-row sm:items-end sm:justify-between">
      <PortfolioHeader>Balances</PortfolioHeader>
      <HistoryPageActionButtons />
    </div>
  );
}

function HistoryPageActionButtons() {
  const pushHistoryPage = usePushHistoryPage();

  return (
    <div className="flex items-center gap-x-4">
      <LinkButton
        colorVariant="primary"
        className="text-sm"
        onClick={() => {
          pushHistoryPage('deposits');
        }}
      >
        Deposit History
      </LinkButton>
      <LinkButton
        colorVariant="primary"
        className="text-sm"
        onClick={() => {
          pushHistoryPage('withdrawals');
        }}
      >
        Withdraw History
      </LinkButton>
    </div>
  );
}
