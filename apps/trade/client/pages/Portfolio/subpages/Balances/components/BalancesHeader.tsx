'use client';

import { LinkButton } from '@vertex-protocol/web-ui';
import { usePushHistoryPage } from 'client/hooks/ui/navigation/usePushHistoryPage';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
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
  const { trackEvent } = useAnalyticsContext();

  return (
    <div className="flex items-center gap-x-4">
      <LinkButton
        colorVariant="primary"
        className="text-sm"
        onClick={() => {
          trackEvent({
            type: 'balances_history_link_clicked',
            data: {
              linkType: 'deposit',
            },
          });
          pushHistoryPage('deposits');
        }}
      >
        Deposit History
      </LinkButton>
      <LinkButton
        colorVariant="primary"
        className="text-sm"
        onClick={() => {
          trackEvent({
            type: 'balances_history_link_clicked',
            data: {
              linkType: 'withdrawals',
            },
          });
          pushHistoryPage('withdrawals');
        }}
      >
        Withdraw History
      </LinkButton>
    </div>
  );
}
