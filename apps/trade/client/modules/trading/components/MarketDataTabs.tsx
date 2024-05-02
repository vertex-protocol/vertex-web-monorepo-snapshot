import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { useMemo } from 'react';
import { TradingViewChart } from '../chart/TradingViewChart';
import { LatestMarketTrades } from '../marketOrders/latestMarketTrades/LatestMarketTrades';
import { Orderbook } from '../marketOrders/orderbook/Orderbook';

interface Props extends WithClassnames {
  productId?: number;
  isTablet: boolean;
}

export function MarketDataTabs({ className, productId, isTablet }: Props) {
  const marketDataTabs = useMemo(
    () =>
      [
        {
          id: 'chart',
          content: (
            <TradingViewChart productId={productId} className="h-full" />
          ),
        },
        {
          id: 'book',
          content: (
            <Orderbook
              className="h-full"
              productId={productId}
              dualSidedDepth={isTablet ? 10 : 5}
              oneSidedDepth={50}
            />
          ),
        },
        {
          id: 'trades',
          content: (
            <LatestMarketTrades productId={productId} className="h-full" />
          ),
        },
      ] as const,
    [isTablet, productId],
  );
  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(marketDataTabs);

  return (
    <TabsRoot
      className={joinClassNames('flex flex-col', className)}
      onValueChange={setSelectedUntypedTabId}
      value={selectedTabId}
    >
      <TabsList asChild>
        <UnderlinedTabs.Container className="flex w-full items-end gap-x-2 px-3.5">
          {tabs.map(({ id }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button
                  size="lg"
                  active={selectedTabId === id}
                  className="capitalize"
                >
                  {id}
                </UnderlinedTabs.Button>
              </TabsTrigger>
            );
          })}
        </UnderlinedTabs.Container>
      </TabsList>
      {tabs.map(({ id, content }) => (
        // "overflow-hidden" allows the scrolling of content to be handled internally
        <TabsContent key={id} value={id} className="flex-1 overflow-hidden">
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
