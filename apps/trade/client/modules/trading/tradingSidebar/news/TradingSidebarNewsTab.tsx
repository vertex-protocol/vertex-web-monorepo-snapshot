import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { NewsTabItems } from 'client/modules/trading/tradingSidebar/news/NewsTabItems';
import { useTradingSidebarNewsTab } from 'client/modules/trading/tradingSidebar/news/useTradingSidebarNewsTab';
import { MARKET_NEWS_PROVIDER } from 'common/environment/integrations/marketNewsProvider';
import Image from 'next/image';

export function TradingSidebarNewsTab({ className }: WithClassnames) {
  const { isLoading, items } = useTradingSidebarNewsTab();

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2.5',
        // Overflow hidden here to allow the content to scroll.
        'overflow-hidden',
        'text-xs',
        className,
      )}
    >
      <div className="flex items-center justify-between px-2.5 pb-1.5">
        <span className="text-text-primary">Newsfeed</span>
        {MARKET_NEWS_PROVIDER.logo && (
          <Image
            src={MARKET_NEWS_PROVIDER.logo}
            alt={MARKET_NEWS_PROVIDER.name}
            className="w-11"
          />
        )}
      </div>

      <NewsTabItems items={items} isLoading={isLoading} />
    </div>
  );
}
