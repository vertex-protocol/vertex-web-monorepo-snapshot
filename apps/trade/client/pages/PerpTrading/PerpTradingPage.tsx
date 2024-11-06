'use client';

import { TradingChartTabs } from 'client/modules/trading/chart/TradingChartTabs';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { useTradingPageHead } from 'client/modules/trading/hooks/useTradingPageHead';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { PerpMarketInfoCards } from 'client/pages/PerpTrading/components/PerpMarketInfoCards';
import { PerpOrderPlacementSection } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import {
  PerpOrderFormContextProvider,
  usePerpOrderFormContext,
} from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { usePerpTradingTableTabs } from 'client/pages/PerpTrading/hooks/usePerpTradingTableTabs';
import { useCallback } from 'react';

/**
 * Contains all of the content + logic for the perp trading page.
 * This needs to be extracted as we need access to `PerpOrderFormContext`
 */
function PerpTradingPageContent() {
  const { currentMarket } = usePerpOrderFormContext();
  const { desktopTradingTabs, mobileTradingTabs } = usePerpTradingTableTabs(
    currentMarket?.productId,
  );

  useTradingWebsocketSubscriptions(currentMarket?.productId);
  useTradingPageHead({ productId: currentMarket?.productId });

  const PerpTradingMarketSwitcher = useCallback(
    ({ triggerClassName }: MarketSwitcherProps) => (
      <TradingMarketSwitcher
        productId={currentMarket?.productId}
        defaultMarketCategory="perp"
        triggerClassName={triggerClassName}
      />
    ),
    [currentMarket?.productId],
  );

  return (
    <TradingPageLayout
      productId={currentMarket?.productId}
      desktopTradingTabs={desktopTradingTabs}
      mobileTradingTabs={mobileTradingTabs}
      MarketSwitcher={PerpTradingMarketSwitcher}
      InfoCards={PerpMarketInfoCards}
      OrderPlacement={PerpOrderPlacementSection}
      ChartComponent={TradingChartTabs}
    />
  );
}

export function PerpTradingPage() {
  return (
    <PerpOrderFormContextProvider>
      <PerpTradingPageContent />
    </PerpOrderFormContextProvider>
  );
}
