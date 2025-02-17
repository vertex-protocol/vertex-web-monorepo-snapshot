import { Card } from '@vertex-protocol/web-ui';
import { TradingTabFilterSelect } from 'client/modules/trading/components/TradingTableTabs/TradingTabFilterSelect';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { ReactNode } from 'react';

interface Props {
  filters: TradingTabFilters | undefined;
  actionButton?: ReactNode;
}

export function MobileTradingTabActions({ filters, actionButton }: Props) {
  if (!filters && !actionButton) {
    return null;
  }

  return (
    <Card
      // Fixed height to prevent layout shift when switching between tabs
      // with / without an action button.
      className="flex h-10 items-center justify-between px-3"
    >
      {filters && <TradingTabFilterSelect filters={filters} />}
      {/* This `div` simply keeps the action button pushed all the way to */}
      {/* the end of the container even when there is no filter select. */}
      <div />
      {actionButton}
    </Card>
  );
}
