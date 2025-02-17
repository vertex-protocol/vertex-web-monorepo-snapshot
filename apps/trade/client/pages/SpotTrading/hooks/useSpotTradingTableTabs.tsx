import {
  HistoricalTradesTab,
  historicalTradesTableFilters,
} from 'client/modules/trading/components/HistoricalTradesTab';
import { MobileTradingTabTrade } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabTrade';
import {
  OpenEngineOrdersTab,
  openEngineOrdersTableFilters,
} from 'client/modules/trading/components/OpenEngineOrdersTab';
import {
  OpenTriggerOrdersTab,
  openTriggerOrdersTableFilters,
} from 'client/modules/trading/components/OpenTriggerOrdersTab';
import { RealizedPnlEventsTab } from 'client/modules/trading/components/RealizedPnlEventsTab';
import { TradingTab } from 'client/modules/trading/layout/types';
import { PerpPositionsTab } from 'client/pages/PerpTrading/components/PerpPositionsTab';
import {
  balancesTableFilters,
  SpotBalancesTab,
} from 'client/pages/SpotTrading/components/SpotBalancesTab';
import { SpotOrderPlacementSection } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/SpotOrderPlacementSection';
import { useMemo } from 'react';

export function useSpotTradingTableTabs(productId: number | undefined) {
  const mobileTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'trade',
        label: 'Trade',
        content: (
          <MobileTradingTabTrade
            OrderPlacementSection={SpotOrderPlacementSection}
          />
        ),
      },
      {
        id: 'balances',
        label: 'Balances',
        content: <SpotBalancesTab productId={productId} />,
      },
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            // productId is undefined because perp positions are not relevant to spot markets. We show all perp positions instead.
            productId={undefined}
          />
        ),
      },
      {
        id: 'engine_orders',
        label: 'Limit Orders',
        countIndicatorKey: 'numOpenEngineOrders',
        content: <OpenEngineOrdersTab productId={productId} />,
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        countIndicatorKey: 'numOpenTriggerOrders',
        content: <OpenTriggerOrdersTab productId={productId} />,
      },
      {
        id: 'history',
        label: 'History',
        content: <HistoricalTradesTab productId={productId} />,
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            // productId is set to undefined because realized pnl events are not relevant to spot markets. We show all perp pnl events instead.
            productId={undefined}
          />
        ),
      },
    ];
  }, [productId]);

  const desktopTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'balances',
        label: 'Balances',
        content: <SpotBalancesTab productId={productId} isDesktop />,
        filters: balancesTableFilters,
      },
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            // productId is undefined because perp positions are not relevant to spot markets. We show all perp positions instead.
            productId={undefined}
            isDesktop
          />
        ),
      },
      {
        id: 'engine_orders',
        label: 'Limit Orders',
        countIndicatorKey: 'numOpenEngineOrders',
        content: <OpenEngineOrdersTab productId={productId} isDesktop />,
        filters: openEngineOrdersTableFilters,
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        countIndicatorKey: 'numOpenTriggerOrders',
        content: <OpenTriggerOrdersTab productId={productId} isDesktop />,
        filters: openTriggerOrdersTableFilters,
      },
      {
        id: 'history',
        label: 'History',
        content: <HistoricalTradesTab productId={productId} isDesktop />,
        filters: historicalTradesTableFilters,
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            // productId is set to undefined because realized pnl events are not relevant to spot markets. We show all perp pnl events instead.
            productId={undefined}
            isDesktop
          />
        ),
      },
    ];
  }, [productId]);

  return {
    desktopTradingTabs,
    mobileTradingTabs,
  };
}
