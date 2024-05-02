import { ProductEngineType } from '@vertex-protocol/contracts';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { TradingPageHead } from 'client/modules/trading/components/TradingPageHead';
import { useTradingPageRouteSync } from 'client/modules/trading/hooks/useTradingPageRouteSync';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { PerpMarketInfoCards } from 'client/pages/PerpTrading/components/PerpMarketInfoCards';
import { PerpOrderPlacementSection } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/PerpOrderPlacementSection';
import { PerpOrderFormContextProvider } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { useSelectedPerpMarket } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarket';
import { useCallback } from 'react';
import { PerpAccountHealth } from './components/PerpAccountHealth';

import { usePerpTradingTableTabs } from './hooks/usePerpTradingTableTabs';

export function PerpTradingPage() {
  const { data: allMarkets } = useAllMarketsStaticData();
  const { currentMarket, setCurrentMarket } = useSelectedPerpMarket();
  const { desktopTradingTabs, mobileTradingTabs } = usePerpTradingTableTabs();

  useTradingWebsocketSubscriptions(currentMarket?.productId);

  useTradingPageRouteSync({
    currentMarket,
    setCurrentMarket,
    relevantMarketsByProductId: allMarkets?.perp,
  });

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
    <AppPage.Root hideHighlights>
      <TradingPageHead
        productId={currentMarket?.productId}
        marketName={currentMarket?.metadata.marketName}
      />
      <PerpOrderFormContextProvider>
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
      </PerpOrderFormContextProvider>
    </AppPage.Root>
  );
}
