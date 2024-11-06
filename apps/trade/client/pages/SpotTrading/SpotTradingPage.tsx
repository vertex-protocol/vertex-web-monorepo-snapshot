'use client';

import { TradingChartTabs } from 'client/modules/trading/chart/TradingChartTabs';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { useTradingPageHead } from 'client/modules/trading/hooks/useTradingPageHead';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { SpotMarketInfoCards } from 'client/pages/SpotTrading/components/SpotMarketInfoCards';
import { SpotOrderPlacementSection } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/SpotOrderPlacementSection';
import { SpotOrderFormContextProvider, useSpotOrderFormContext, } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { useSpotTradingTableTabs } from 'client/pages/SpotTrading/hooks/useSpotTradingTableTabs';
import { useCallback } from 'react';

/**
 * Contains all of the content + logic for the spot trading page.
 * This needs to be extracted as we need access to `SpotOrderFormContext`
 */
function SpotTradingPageContent() {
  const { currentMarket } = useSpotOrderFormContext();
  const { desktopTradingTabs, mobileTradingTabs } = useSpotTradingTableTabs(
    currentMarket?.productId,
  );

  useTradingWebsocketSubscriptions(currentMarket?.productId);
  useTradingPageHead({ productId: currentMarket?.productId });

  const SpotTradingMarketSwitcher = useCallback(
    ({ triggerClassName }: MarketSwitcherProps) => (
      <TradingMarketSwitcher
        productId={currentMarket?.productId}
        defaultMarketCategory="spot"
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
      MarketSwitcher={SpotTradingMarketSwitcher}
      InfoCards={SpotMarketInfoCards}
      OrderPlacement={SpotOrderPlacementSection}
      ChartComponent={TradingChartTabs}
    />
  );
}

export function SpotTradingPage() {
  return (
    <SpotOrderFormContextProvider>
      <SpotTradingPageContent />
    </SpotOrderFormContextProvider>
  );
}
