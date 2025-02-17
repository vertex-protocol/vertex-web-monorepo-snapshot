import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDataTabs } from 'client/modules/trading/components/MarketDataTabs';
import { MobileTradingTabs } from 'client/modules/trading/components/MobileTradingTabs';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';

export function MobileTradingLayout({
  mobileTradingTabs: tradingTabs,
  productId,
  MarketSwitcher,
  InfoCards,
}: TradingLayoutProps) {
  return (
    <div className="pb-mobile-bottom-sheet flex flex-col gap-y-2 px-2 pt-1">
      <Card className="grid grid-rows-2">
        <MarketSwitcher
          triggerClassName={joinClassNames(
            CARD_ROUNDED_CLASSNAMES,
            'w-full rounded-b-none',
          )}
        />
        <InfoCards className="border-stroke border-t" />
      </Card>
      <div className="isolate flex flex-col gap-y-3">
        <Card
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="overflow-hidden"
        >
          <MarketDataTabs
            productId={productId}
            withChartTabs
            // 379px here accounts roughly for the size of the orderbook. There unfortunately isn't a great way to handle this.
            className="h-[379px]"
          />
        </Card>
        <MobileTradingTabs tradingTabs={tradingTabs} />
      </div>
    </div>
  );
}
