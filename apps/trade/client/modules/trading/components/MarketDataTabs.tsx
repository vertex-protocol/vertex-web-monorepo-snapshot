import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { useMemo } from 'react';
import { TradingViewChart } from '../chart/TradingViewChart';
import { LatestMarketTrades } from '../marketOrders/latestMarketTrades/LatestMarketTrades';
import { Orderbook } from '../marketOrders/orderbook/Orderbook';

interface Props extends WithClassnames {
  productId?: number;
  withChartTab?: boolean;
}

export function MarketDataTabs({ className, productId, withChartTab }: Props) {
  const marketDataTabs = useMemo(() => {
    const defaultTabs = [
      {
        id: 'book',
        content: <Orderbook className="h-full" productId={productId} />,
      },
      {
        id: 'trades',
        content: (
          <LatestMarketTrades productId={productId} className="h-full" />
        ),
      },
    ];

    return withChartTab
      ? [
          {
            id: 'chart',
            content: (
              <TradingViewChart productId={productId} className="h-full" />
            ),
          },
          ...defaultTabs,
        ]
      : defaultTabs;
  }, [productId, withChartTab]);

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(marketDataTabs);

  return (
    <TabsRoot
      className={joinClassNames('flex flex-col', className)}
      onValueChange={setSelectedUntypedTabId}
      value={selectedTabId}
    >
      <TabsList className="px-3 py-2">
        <SegmentedControl.Container className="flex items-center justify-between">
          {tabs.map(({ id }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <SegmentedControl.Button
                  size="xs"
                  active={selectedTabId === id}
                  className="flex-1 capitalize"
                >
                  {id}
                </SegmentedControl.Button>
              </TabsTrigger>
            );
          })}
        </SegmentedControl.Container>
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
