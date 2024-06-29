import { ProductEngineType } from '@vertex-protocol/contracts';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { TradingPageHead } from 'client/modules/trading/components/TradingPageHead';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { PerpMarketInfoCards } from 'client/pages/PerpTrading/components/PerpMarketInfoCards';
import { PerpOrderPlacementSection } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import {
  PerpOrderFormContextProvider,
  usePerpOrderFormContext,
} from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { useCallback } from 'react';
import { PerpAccountHealth } from './components/PerpAccountHealth';

import { usePerpTradingTableTabs } from './hooks/usePerpTradingTableTabs';

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

  const PerpTradingMarketSwitcher = useCallback(
    ({ triggerClassName }: MarketSwitcherProps) => (
      <TradingMarketSwitcher
        productId={currentMarket?.productId}
        defaultMarketType={ProductEngineType.PERP}
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
        MarketSwitcher={PerpTradingMarketSwitcher}
        InfoCards={PerpMarketInfoCards}
        OrderPlacement={PerpOrderPlacementSection}
        AccountHealth={PerpAccountHealth}
        PriceChart={TradingViewChart}
      />
    </>
  );
}

export function PerpTradingPage() {
  return (
    <AppPage.Root hideHighlights>
      <PerpOrderFormContextProvider>
        <PerpTradingPageContent />
      </PerpOrderFormContextProvider>
    </AppPage.Root>
  );
}
