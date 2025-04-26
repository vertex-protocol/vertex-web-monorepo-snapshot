import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDataTabs } from 'client/modules/trading/components/MarketDataTabs';
import { LargeScreenTradingTableTabs } from 'client/modules/trading/components/TradingTableTabs/LargeScreenTradingTableTabs';
import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { TradingSidebar } from 'client/modules/trading/tradingSidebar/TradingSidebar';
import { ReactNode } from 'react';

interface Props {
  productId: number | undefined;
  showMarketOrderSideBar?: boolean;
  heroComponent: ReactNode;
  tradingTabs: TradingLayoutProps['desktopTradingTabs'];
  MarketSwitcher: TradingLayoutProps['MarketSwitcher'];
  InfoCards: TradingLayoutProps['InfoCards'];
  OrderPlacement: TradingLayoutProps['OrderPlacement'];
}

export function LargeScreenTradingLayout({
  productId,
  showMarketOrderSideBar,
  heroComponent,
  tradingTabs,
  MarketSwitcher,
  InfoCards,
  OrderPlacement,
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
          <InfoCards className="h-full w-full" />
        </Card>
      </div>
      {/* Order placement, charts and table area */}
      <div
        className={joinClassNames(
          'flex gap-x-2.5',
          flexDirectionByConsolePosition,
        )}
      >
        {/* Order placement */}
        <Card className="w-trade-sidebar">
          {/* Set min-h to be equal to the (orderbook, chart, watchlist) sections. */}
          <OrderPlacement className="min-h-[max(580px,65vh)]" />
        </Card>
        <div className="flex flex-1 flex-col gap-y-2.5 overflow-hidden">
          <div
            className={joinClassNames(
              'flex gap-x-2.5',
              // Use height that is at least 580px or 65vh. Which ever is larger is used to prevent the elements from being too small on large screens and fit smaller screens.
              'h-[max(580px,65vh)]',
              flexDirectionByConsolePosition,
            )}
          >
            {/* Orderbook/Latest Trades */}
            {showMarketOrderSideBar && (
              // Overflow hidden to prevent unrounded corners (ex. OrderbookPriceBox) from escaping the card
              <Card className="w-market-orders overflow-hidden">
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
            <Card className="max-w-trade-sidebar">
              <TradingSidebar
                flexDirectionByConsolePosition={flexDirectionByConsolePosition}
                className="h-full"
              />
            </Card>
          </div>
          {/* Table */}
          <Card
            // `overflow-hidden` prevents the component from extending itself off-screen on certain tables
            className="flex-1 overflow-hidden"
          >
            <LargeScreenTradingTableTabs tradingTabs={tradingTabs} />
          </Card>
        </div>
      </div>
    </div>
  );
}
