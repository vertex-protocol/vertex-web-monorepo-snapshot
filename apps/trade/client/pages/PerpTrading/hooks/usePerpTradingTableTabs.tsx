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
import {
  RealizedPnlEventsTab,
  realizedPnlEventsTableFilters,
} from 'client/modules/trading/components/RealizedPnlEventsTab';
import { TradingTab } from 'client/modules/trading/layout/types';
import { SpotBalancesTab } from 'client/pages/SpotTrading/components/SpotBalancesTab';
import { useMemo } from 'react';
import { PerpOrderPlacementSection } from '../components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import {
  PerpPositionsTab,
  positionsTableFilters,
} from '../components/PerpPositionsTab';

const SHOW_ALL_FILTER = undefined;

const PERP_ONLY_FILTER = {
  marketType: ProductEngineType.PERP,
};

export function usePerpTradingTableTabs(productId: number | undefined) {
  const mobileTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'trade',
        label: 'Trade',
        content: (
          <MobileTradeTab
            productId={productId}
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
            productId={productId}
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
            productId={productId}
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
            productId={productId}
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
            productId={productId}
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
            productId={productId}
            isDesktop={false}
          />
        ),
      },
    ];
  }, [productId]);

  const desktopTradingTabs = useMemo((): TradingTab[] => {
    return [
      {
        id: 'positions',
        label: 'Positions',
        countIndicatorKey: 'numPerpPositions',
        content: (
          <PerpPositionsTab
            enableUserFiltering
            productId={productId}
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
            productId={productId}
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
            productId={productId}
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
            productId={productId}
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
            productId={productId}
            defaultFilter={PERP_ONLY_FILTER}
          />
        ),
        filters: realizedPnlEventsTableFilters,
      },
    ];
  }, [productId]);

  return {
    desktopTradingTabs,
    mobileTradingTabs,
  };
}
