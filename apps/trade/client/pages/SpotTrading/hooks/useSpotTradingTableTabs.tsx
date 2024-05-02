import { ProductEngineType } from '@vertex-protocol/client';
import {
  HistoricalTradesTab,
  historicalTradesTableFilters,
} from 'client/modules/trading/components/HistoricalTradesTab';
import { MobileTradeTab } from 'client/modules/trading/components/MobileTradeTab';
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
import { useSelectedSpotMarket } from 'client/pages/SpotTrading/hooks/useSelectedSpotMarket';
import { useMemo } from 'react';

const SHOW_ALL_FILTER = undefined;

const PERP_ONLY_FILTER = {
  marketType: ProductEngineType.PERP,
};

export function useSpotTradingTableTabs() {
  const { currentMarket } = useSelectedSpotMarket();
  const currentSpotProductId = currentMarket?.productId;

  const mobileTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'trade',
        label: 'Trade',
        content: (
          <MobileTradeTab
            productId={currentSpotProductId}
            OrderPlacementSection={SpotOrderPlacementSection}
          />
        ),
      },
      {
        id: 'balances',
        label: 'Balances',
        content: (
          <SpotBalancesTab
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={currentSpotProductId}
          />
        ),
      },
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            // productId is undefined because perp positions are not relevant to spot markets. We show all perp positions instead.
            productId={undefined}
          />
        ),
      },
      {
        id: 'engine_orders',
        label: 'Limit Orders',
        countIndicatorKey: 'numOpenEngineOrders',
        content: (
          <OpenEngineOrdersTab
            isDesktop={false}
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={currentSpotProductId}
          />
        ),
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        countIndicatorKey: 'numOpenTriggerOrders',
        content: (
          <OpenTriggerOrdersTab
            isDesktop={false}
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={currentSpotProductId}
          />
        ),
      },
      {
        id: 'history',
        label: 'History',
        content: (
          <HistoricalTradesTab
            isDesktop={false}
            defaultFilter={SHOW_ALL_FILTER}
            enableUserFiltering={false}
            productId={currentSpotProductId}
          />
        ),
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            isDesktop={false}
            enableUserFiltering={false}
            defaultFilter={PERP_ONLY_FILTER}
            productId={undefined}
          />
        ),
      },
    ];
  }, [currentSpotProductId]);

  const desktopTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'balances',
        label: 'Balances',
        content: (
          <SpotBalancesTab
            defaultFilter={SHOW_ALL_FILTER}
            enableUserFiltering
            productId={currentSpotProductId}
          />
        ),
        filters: balancesTableFilters,
      },
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={undefined}
          />
        ),
      },
      {
        id: 'engine_orders',
        label: 'Limit Orders',
        countIndicatorKey: 'numOpenEngineOrders',
        content: (
          <OpenEngineOrdersTab
            defaultFilter={SHOW_ALL_FILTER}
            isDesktop
            enableUserFiltering
            productId={currentSpotProductId}
          />
        ),
        filters: openEngineOrdersTableFilters,
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        countIndicatorKey: 'numOpenTriggerOrders',
        content: (
          <OpenTriggerOrdersTab
            defaultFilter={SHOW_ALL_FILTER}
            isDesktop
            enableUserFiltering
            productId={currentSpotProductId}
          />
        ),
        filters: openTriggerOrdersTableFilters,
      },
      {
        id: 'history',
        label: 'History',
        content: (
          <HistoricalTradesTab
            defaultFilter={SHOW_ALL_FILTER}
            enableUserFiltering
            isDesktop
            productId={currentSpotProductId}
          />
        ),
        filters: historicalTradesTableFilters,
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            enableUserFiltering={false}
            defaultFilter={PERP_ONLY_FILTER}
            // productId is set to undefined because realized pnl events are not relevant to spot markets. We show all perp pnl events instead.
            productId={undefined}
            isDesktop
          />
        ),
      },
    ];
  }, [currentSpotProductId]);

  return {
    desktopTradingTabs,
    mobileTradingTabs,
  };
}
