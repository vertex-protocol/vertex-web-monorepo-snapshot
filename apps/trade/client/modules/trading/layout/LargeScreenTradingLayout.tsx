import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDetailsPromptEntrypoint } from 'client/modules/trading/components/MarketDetailsPromptEntrypoint';
import { LargeScreenTradingTableTabs } from 'client/modules/trading/components/TradingTableTabs/LargeScreenTradingTableTabs';
import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { TradingMarketSwitcherOverlay } from '../components/TradingMarketSwitcher/TradingMarketSwitcherOverlay';
import { DesktopMarketActivity } from '../marketOrders/DesktopMarketActivity';
import { TradingCard } from './TradingCard';

interface Props {
  productId?: number;
  showMarketOrderSideBar?: boolean;
  heroComponent: React.ReactNode;
  tradingTabs: TradingLayoutProps['desktopTradingTabs'];
  MarketSwitcher: TradingLayoutProps['MarketSwitcher'];
  InfoCards: TradingLayoutProps['InfoCards'];
  OrderPlacement: TradingLayoutProps['OrderPlacement'];
  AccountHealth: TradingLayoutProps['AccountHealth'];
}

export function LargeScreenTradingLayout({
  productId,
  showMarketOrderSideBar,
  heroComponent,
  tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
  AccountHealth,
}: Props) {
  const { consolePosition } = useTradingConsolePosition();

  const flexDirectionByConsolePosition =
    consolePosition === 'left' ? 'flex-row' : 'flex-row-reverse';

  return (
    <div className="flex flex-col gap-y-2.5 p-3">
      {/*Top bar*/}
      <div className="h-trading-top-bar flex gap-x-2.5">
        <TradingMarketSwitcherOverlay />
        <TradingCard
          // `z-10` applied so the switcher isn't covered by the overlay when open
          className="w-trade-sidebar z-10"
        >
          <MarketSwitcher
            triggerClassName={joinClassNames(
              'w-full h-full',
              CARD_ROUNDED_CLASSNAMES,
            )}
          />
        </TradingCard>
        <TradingCard
          // `overflow-hidden` to allow scrolling when screen size shrinks instead of overflowing the page.
          className="flex-1 overflow-hidden"
        >
          <InfoCards className="no-scrollbar h-full w-full overflow-x-auto" />
        </TradingCard>
      </div>
      {/* Order placement and charts area */}
      {/* This is where main layout height is set. */}
      <div
        className={joinClassNames(
          // "isolate" needed here so this section doesn't stack on top of `TradingMarketSwitcher` & `TradingMarketSwitcherOverlay`
          'isolate flex h-[max(610px,70vh)] gap-x-2.5',
          flexDirectionByConsolePosition,
        )}
      >
        {/* Order placement */}
        <TradingCard className="w-trade-sidebar">
          <OrderPlacement className="no-scrollbar h-full overflow-y-auto" />
        </TradingCard>

        {/* Orderbook */}
        {showMarketOrderSideBar && (
          <TradingCard className="w-market-orders">
            <DesktopMarketActivity productId={productId} />
          </TradingCard>
        )}

        {/*Chart area*/}
        <TradingCard
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="flex-1 overflow-hidden"
        >
          {heroComponent}
        </TradingCard>
      </div>
      {/* Bottom section account health, and tables */}
      <div
        className={joinClassNames(
          'flex flex-1 gap-x-2.5',
          flexDirectionByConsolePosition,
        )}
      >
        <TradingCard className="w-trade-sidebar flex flex-col gap-y-8 p-4">
          <AccountHealth />
          <MarketDetailsPromptEntrypoint productId={productId} />
        </TradingCard>
        <TradingCard
          // `overflow-hidden` prevents the component from extending itself off-screen on certain tables
          className="flex-1 overflow-hidden"
        >
          <LargeScreenTradingTableTabs tradingTabs={tradingTabs} />
        </TradingCard>
      </div>
    </div>
  );
}
