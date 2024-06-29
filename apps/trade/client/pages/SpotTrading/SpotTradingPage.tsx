import { ProductEngineType } from '@vertex-protocol/contracts';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { TradingPageHead } from 'client/modules/trading/components/TradingPageHead';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { SpotMarketInfoCards } from 'client/pages/SpotTrading/components/SpotMarketInfoCards';
import { SpotOrderPlacementSection } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/SpotOrderPlacementSection';
import {
  SpotOrderFormContextProvider,
  useSpotOrderFormContext,
} from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { useCallback } from 'react';
import { SpotAccountHealth } from './components/SpotAccountHealth';
import { useSpotTradingTableTabs } from './hooks/useSpotTradingTableTabs';

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

  const SpotTradingMarketSwitcher = useCallback(
    ({ triggerClassName }: MarketSwitcherProps) => (
      <TradingMarketSwitcher
        productId={currentMarket?.productId}
        defaultMarketType={ProductEngineType.SPOT}
        triggerClassName={triggerClassName}
      />
    ),
    [currentMarket?.productId],
  );

  return (
    <>
      <TradingPageHead productId={currentMarket?.productId} />
      <TradingPageLayout
        productId={currentMarket?.productId}
        desktopTradingTabs={desktopTradingTabs}
        mobileTradingTabs={mobileTradingTabs}
        MarketSwitcher={SpotTradingMarketSwitcher}
        InfoCards={SpotMarketInfoCards}
        OrderPlacement={SpotOrderPlacementSection}
        PriceChart={TradingViewChart}
        AccountHealth={SpotAccountHealth}
      />
    </>
  );
}

export function SpotTradingPage() {
  return (
    <AppPage.Root hideHighlights>
      <SpotOrderFormContextProvider>
        <SpotTradingPageContent />
      </SpotOrderFormContextProvider>
    </AppPage.Root>
  );
}
