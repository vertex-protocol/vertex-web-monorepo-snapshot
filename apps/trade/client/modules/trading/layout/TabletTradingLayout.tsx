import { MarketDataTabs } from 'client/modules/trading/components/MarketDataTabs';
import { LargeScreenTradingLayout } from 'client/modules/trading/layout/LargeScreenTradingLayout';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';

export function TabletTradingLayout({
  productId,
  desktopTradingTabs: tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
}: TradingLayoutProps) {
  return (
    <LargeScreenTradingLayout
      heroComponent={
        <MarketDataTabs
          className="h-full"
          productId={productId}
          withChartTabs
        />
      }
      productId={productId}
      tradingTabs={tradingTabs}
      MarketSwitcher={MarketSwitcher}
      InfoCards={InfoCards}
      OrderPlacement={OrderPlacement}
    />
  );
}
