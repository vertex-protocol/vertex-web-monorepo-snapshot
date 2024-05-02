import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { MarketDetailsPromptEntrypoint } from 'client/modules/trading/components/MarketDetailsPromptEntrypoint';
import { TradingLayoutProps } from 'client/modules/trading/layout/types';
import { MarketDataTabs } from '../components/MarketDataTabs';
import { TradingMarketSwitcherOverlay } from '../components/TradingMarketSwitcher/TradingMarketSwitcherOverlay';
import { MobileTradingTableTabs } from '../components/TradingTableTabs/MobileTradingTableTabs';
import { TradingCard } from './TradingCard';

export function MobileTradingLayout({
  mobileTradingTabs: tradingTabs,
  productId,
  MarketSwitcher,
  InfoCards,
  AccountHealth,
}: TradingLayoutProps) {
  return (
    <div className="pb-mobile-bottom-sheet flex flex-col gap-y-2">
      <TradingMarketSwitcherOverlay />
      {/*This needs to be a separate div from rest of the elements such that the market switcher is shown on top of the overlay*/}
      <div className="z-20 px-2 pb-1 pt-3">
        <TradingCard className="grid grid-rows-2">
          <MarketSwitcher
            triggerClassName={joinClassNames(
              CARD_ROUNDED_CLASSNAMES,
              'w-full rounded-b-none',
            )}
          />
          <InfoCards className="no-scrollbar border-stroke overflow-x-auto border-t" />
        </TradingCard>
      </div>
      <div className="isolate flex flex-col gap-y-3 px-2">
        <TradingCard
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="overflow-hidden"
        >
          <MarketDataTabs
            productId={productId}
            isTablet={false}
            // 379px here accounts roughly for the size of the orderbook. There unfortunately isn't a great way to handle this.
            className="h-[379px]"
          />
        </TradingCard>
        <TradingCard
          // 'overflow-hidden' to prevent the unrounded corners from escaping the card
          className="overflow-hidden"
        >
          <MobileTradingTableTabs tradingTabs={tradingTabs} />
        </TradingCard>
        <TradingCard className="flex flex-col gap-y-4 p-4">
          <AccountHealth />
          <MarketDetailsPromptEntrypoint productId={productId} />
        </TradingCard>
      </div>
    </div>
  );
}
