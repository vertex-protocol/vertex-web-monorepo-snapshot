import { LargeScreenTradingLayout } from 'client/modules/trading/layout/LargeScreenTradingLayout';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';

export function DesktopTradingLayout({
  productId,
  desktopTradingTabs: tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
  ChartComponent,
}: TradingLayoutProps) {
  return (
    <LargeScreenTradingLayout
      showMarketOrderSideBar
      heroComponent={
        <ChartComponent productId={productId} className="h-full" />
      }
      productId={productId}
      tradingTabs={tradingTabs}
      MarketSwitcher={MarketSwitcher}
      InfoCards={InfoCards}
      OrderPlacement={OrderPlacement}
    />
  );
}
