import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDetailsPromptEntrypoint } from 'client/modules/trading/components/MarketDetailsPromptEntrypoint';
import { LargeScreenTradingTableTabs } from 'client/modules/trading/components/TradingTableTabs/LargeScreenTradingTableTabs';
import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { MarketWatchlist } from 'client/modules/trading/marketWatchlist/MarketWatchlist';
import { MarketDataTabs } from 'client/modules/trading/components/MarketDataTabs';
import { ReactNode } from 'react';

interface Props {
  productId?: number;
  showMarketOrderSideBar?: boolean;
  heroComponent: ReactNode;
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
    <div className="flex flex-col gap-y-2.5 p-3 pt-1.5">
      {/*Top bar*/}
      <div className="h-trading-top-bar flex gap-x-2.5">
        <Card className="w-trade-sidebar">
          <MarketSwitcher
            triggerClassName={joinClassNames(
              'w-full h-full',
              CARD_ROUNDED_CLASSNAMES,
            )}
          />
        </Card>
        <Card
          // `overflow-hidden` to allow scrolling when screen size shrinks instead of overflowing the page.
          className="flex-1 overflow-hidden"
        >
          <InfoCards className="no-scrollbar h-full w-full overflow-x-auto" />
        </Card>
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
        <Card className="w-trade-sidebar">
          <OrderPlacement className="no-scrollbar h-full overflow-y-auto" />
        </Card>

        {/* Orderbook */}
        {showMarketOrderSideBar && (
          <Card className="w-market-orders">
            <MarketDataTabs className="h-full" productId={productId} />
          </Card>
        )}

        {/*Chart area*/}
        <Card
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="flex-1 overflow-hidden"
        >
          {heroComponent}
        </Card>

        {/* Market watchlist */}
        <Card>
          <MarketWatchlist
            flexDirectionByConsolePosition={flexDirectionByConsolePosition}
            productId={productId}
            className="h-full"
          />
        </Card>
      </div>
      {/* Bottom section account health, and tables */}
      <div
        className={joinClassNames(
          'flex flex-1 gap-x-2.5',
          flexDirectionByConsolePosition,
        )}
      >
        <Card className="w-trade-sidebar flex flex-col gap-y-8 p-4">
          <AccountHealth />
          <MarketDetailsPromptEntrypoint productId={productId} />
        </Card>
        <Card
          // `overflow-hidden` prevents the component from extending itself off-screen on certain tables
          className="flex-1 overflow-hidden"
        >
          <LargeScreenTradingTableTabs tradingTabs={tradingTabs} />
        </Card>
      </div>
    </div>
  );
}
