import { TradingLayoutProps } from 'client/modules/trading/layout/types';

import { MarketDataTabs } from '../components/MarketDataTabs';
import { LargeScreenTradingLayout } from './LargeScreenTradingLayout';

export function TabletTradingLayout({
  productId,
  desktopTradingTabs: tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
  AccountHealth,
}: TradingLayoutProps) {
  return (
    <LargeScreenTradingLayout
      heroComponent={
        <MarketDataTabs className="h-full" productId={productId} withChartTab />
      }
      AccountHealth={AccountHealth}
      productId={productId}
      tradingTabs={tradingTabs}
      MarketSwitcher={MarketSwitcher}
      InfoCards={InfoCards}
      OrderPlacement={OrderPlacement}
    />
  );
}
