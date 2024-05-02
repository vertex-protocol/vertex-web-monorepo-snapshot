import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { LargeScreenTradingLayout } from './LargeScreenTradingLayout';

export function DesktopTradingLayout({
  productId,
  desktopTradingTabs: tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
  AccountHealth,
  PriceChart,
}: TradingLayoutProps) {
  return (
    <LargeScreenTradingLayout
      showMarketOrderSideBar
      heroComponent={<PriceChart productId={productId} className="h-full" />}
      productId={productId}
      tradingTabs={tradingTabs}
      MarketSwitcher={MarketSwitcher}
      AccountHealth={AccountHealth}
      InfoCards={InfoCards}
      OrderPlacement={OrderPlacement}
    />
  );
}
