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
import {
  RealizedPnlEventsTab,
  realizedPnlEventsTableFilters,
} from 'client/modules/trading/components/RealizedPnlEventsTab';
import { TradingTab } from 'client/modules/trading/layout/types';
import { PerpOrderPlacementSection } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import {
  PerpPositionsTab,
  positionsTableFilters,
} from 'client/pages/PerpTrading/components/PerpPositionsTab';
import { SpotBalancesTab } from 'client/pages/SpotTrading/components/SpotBalancesTab';
import { useMemo } from 'react';

export function usePerpTradingTableTabs(productId: number | undefined) {
  const mobileTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'trade',
        label: 'Trade',
        content: (
          <MobileTradingTabTrade
            OrderPlacementSection={PerpOrderPlacementSection}
          />
        ),
      },
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: <PerpPositionsTab productId={productId} />,
      },
      {
        id: 'balances',
        label: 'Balances',
        content: <SpotBalancesTab productId={undefined} />,
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
        content: <RealizedPnlEventsTab productId={productId} />,
      },
    ];
  }, [productId]);

  const desktopTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: <PerpPositionsTab productId={productId} isDesktop />,
        filters: positionsTableFilters,
      },
      {
        id: 'balances',
        label: 'Balances',
        content: <SpotBalancesTab productId={undefined} isDesktop />,
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
        content: <RealizedPnlEventsTab productId={productId} isDesktop />,
        filters: realizedPnlEventsTableFilters,
      },
    ];
  }, [productId]);

  return {
    desktopTradingTabs,
    mobileTradingTabs,
  };
}
