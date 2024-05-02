import { ProductEngineType } from '@vertex-protocol/contracts';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AppPage } from 'client/modules/app/AppPage';
import { ROUTES } from 'client/modules/app/consts/routes';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { TradingMarketSwitcher } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher';
import { TradingPageHead } from 'client/modules/trading/components/TradingPageHead';
import { useTradingPageRouteSync } from 'client/modules/trading/hooks/useTradingPageRouteSync';
import { TradingPageLayout } from 'client/modules/trading/layout/TradingPageLayout';
import { MarketSwitcherProps } from 'client/modules/trading/layout/types';
import { useTradingWebsocketSubscriptions } from 'client/modules/trading/websockets/useTradingWebsocketSubscriptions';
import { SpotMarketInfoCards } from 'client/pages/SpotTrading/components/SpotMarketInfoCards';
import { SpotOrderPlacementSection } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/SpotOrderPlacementSection';
import { SpotOrderFormContextProvider } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { useSelectedSpotMarket } from 'client/pages/SpotTrading/hooks/useSelectedSpotMarket';
import Link from 'next/link';
import { useCallback } from 'react';
import { SpotAccountHealth } from './components/SpotAccountHealth';
import { useSpotTradingTableTabs } from './hooks/useSpotTradingTableTabs';

export function SpotTradingPage() {
  const { data: allMarkets } = useAllMarketsStaticData();
  const { currentMarket, setCurrentMarket } = useSelectedSpotMarket();
  const { desktopTradingTabs, mobileTradingTabs } = useSpotTradingTableTabs();

  useTradingWebsocketSubscriptions(currentMarket?.productId);

  useTradingPageRouteSync({
    currentMarket,
    setCurrentMarket,
    relevantMarketsByProductId: allMarkets?.spot,
  });

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
    <AppPage.Root hideHighlights>
      <TradingPageHead
        productId={currentMarket?.productId}
        marketName={currentMarket?.metadata.marketName}
      />
      <SpotOrderFormContextProvider>
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
      </SpotOrderFormContextProvider>
    </AppPage.Root>
  );
}

export function ComingSoonSpotTradingPage() {
  return (
    <AppPage.Root contentWrapperClassName="flex justify-center items-center">
      <div className="flex flex-col gap-y-4">
        <span className="text-text-primary text-xl sm:text-4xl">
          Spot Trading Coming Soon
        </span>
        <PrimaryButton size="lg" as={Link} href={ROUTES.perpTrading}>
          Trade Perps
        </PrimaryButton>
      </div>
    </AppPage.Root>
  );
}
