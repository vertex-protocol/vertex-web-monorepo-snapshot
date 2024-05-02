import {
  HistoricalTradesTab,
  historicalTradesTableFilters,
} from 'client/modules/trading/components/HistoricalTradesTab';
import { TradingTab } from 'client/modules/trading/layout/types';
import { useSelectedPerpMarket } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarket';
import { SpotBalancesTab } from 'client/pages/SpotTrading/components/SpotBalancesTab';
import { useMemo } from 'react';
import { ProductEngineType } from '@vertex-protocol/client';
import {
  RealizedPnlEventsTab,
  realizedPnlEventsTableFilters,
} from 'client/modules/trading/components/RealizedPnlEventsTab';
import { PerpOrderPlacementSection } from '../components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import {
  PerpPositionsTab,
  positionsTableFilters,
} from '../components/PerpPositionsTab';
import {
  OpenEngineOrdersTab,
  openEngineOrdersTableFilters,
} from 'client/modules/trading/components/OpenEngineOrdersTab';
import {
  OpenTriggerOrdersTab,
  openTriggerOrdersTableFilters,
} from 'client/modules/trading/components/OpenTriggerOrdersTab';
import { MobileTradeTab } from 'client/modules/trading/components/MobileTradeTab';

const SHOW_ALL_FILTER = undefined;

const PERP_ONLY_FILTER = {
  marketType: ProductEngineType.PERP,
};

export function usePerpTradingTableTabs() {
  const { currentMarket } = useSelectedPerpMarket();
  const currentPerpProductId = currentMarket?.productId;

  const mobileTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'trade',
        label: 'Trade',
        content: (
          <MobileTradeTab
            productId={currentPerpProductId}
            OrderPlacementSection={PerpOrderPlacementSection}
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
            productId={currentPerpProductId}
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
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={currentPerpProductId}
            isDesktop={false}
          />
        ),
      },
      {
        id: 'trigger_orders',
        label: 'Trigger Orders',
        countIndicatorKey: 'numOpenTriggerOrders',
        content: (
          <OpenTriggerOrdersTab
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            productId={currentPerpProductId}
            isDesktop={false}
          />
        ),
      },
      {
        id: 'history',
        label: 'History',
        content: (
          <HistoricalTradesTab
            enableUserFiltering={false}
            defaultFilter={SHOW_ALL_FILTER}
            isDesktop={false}
            productId={currentPerpProductId}
          />
        ),
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            enableUserFiltering={false}
            defaultFilter={PERP_ONLY_FILTER}
            productId={currentPerpProductId}
            isDesktop={false}
          />
        ),
      },
    ];
  }, [currentPerpProductId]);

  const desktopTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            enableUserFiltering
            productId={currentPerpProductId}
            defaultFilter={SHOW_ALL_FILTER}
          />
        ),
        filters: positionsTableFilters,
      },
      {
        id: 'balances',
        label: 'Balances',
        content: (
          <SpotBalancesTab
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
            enableUserFiltering
            productId={currentPerpProductId}
            defaultFilter={SHOW_ALL_FILTER}
            isDesktop
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
            enableUserFiltering
            productId={currentPerpProductId}
            defaultFilter={SHOW_ALL_FILTER}
            isDesktop
          />
        ),
        filters: openTriggerOrdersTableFilters,
      },
      {
        id: 'history',
        label: 'History',
        content: (
          <HistoricalTradesTab
            enableUserFiltering
            isDesktop
            productId={currentPerpProductId}
            defaultFilter={SHOW_ALL_FILTER}
          />
        ),
        filters: historicalTradesTableFilters,
      },
      {
        id: 'realized_pnl',
        label: 'Realized PnL',
        content: (
          <RealizedPnlEventsTab
            enableUserFiltering
            isDesktop
            productId={currentPerpProductId}
            defaultFilter={PERP_ONLY_FILTER}
          />
        ),
        filters: realizedPnlEventsTableFilters,
      },
    ];
  }, [currentPerpProductId]);

  return {
    desktopTradingTabs,
    mobileTradingTabs,
  };
}
