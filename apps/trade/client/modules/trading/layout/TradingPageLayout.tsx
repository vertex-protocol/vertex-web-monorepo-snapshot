import { useSizeClass } from 'client/hooks/ui/breakpoints';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { DesktopTradingLayout } from './DesktopTradingLayout';
import { MobileTradingLayout } from './MobileTradingLayout';
import { TabletTradingLayout } from './TabletTradingLayout';

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
