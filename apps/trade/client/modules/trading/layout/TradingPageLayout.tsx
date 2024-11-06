import { useSizeClass } from 'client/hooks/ui/breakpoints';
import { DesktopTradingLayout } from 'client/modules/trading/layout/DesktopTradingLayout';
import { MobileTradingLayout } from 'client/modules/trading/layout/MobileTradingLayout';
import { TabletTradingLayout } from 'client/modules/trading/layout/TabletTradingLayout';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';

export function TradingPageLayout(props: TradingLayoutProps) {
  const { value } = useSizeClass();

  switch (value) {
    case 'mobile':
      return <MobileTradingLayout {...props} />;
    case 'tablet':
      return <TabletTradingLayout {...props} />;
    default:
      return <DesktopTradingLayout {...props} />;
  }
}
