import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDetailsPromptEntrypoint } from 'client/modules/trading/components/MarketDetailsPromptEntrypoint';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { MarketDataTabs } from '../components/MarketDataTabs';
import { MobileTradingTableTabs } from '../components/TradingTableTabs/MobileTradingTableTabs';

export function MobileTradingLayout({
  mobileTradingTabs: tradingTabs,
  productId,
  MarketSwitcher,
  InfoCards,
  AccountHealth,
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
        <InfoCards className="no-scrollbar border-stroke overflow-x-auto border-t" />
      </Card>
      <div className="isolate flex flex-col gap-y-3">
        <Card
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="overflow-hidden"
        >
          <MarketDataTabs
            productId={productId}
            withChartTab
            // 379px here accounts roughly for the size of the orderbook. There unfortunately isn't a great way to handle this.
            className="h-[379px]"
          />
        </Card>
        <Card
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="overflow-hidden"
        >
          <MobileTradingTableTabs tradingTabs={tradingTabs} />
        </Card>
        <Card className="flex flex-col gap-y-4 p-4">
          <AccountHealth />
          <MarketDetailsPromptEntrypoint productId={productId} />
        </Card>
      </div>
    </div>
  );
}
