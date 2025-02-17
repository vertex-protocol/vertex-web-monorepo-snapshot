import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { ProductEngineType } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  ScrollShadowsContainer,
  SegmentedControl,
} from '@vertex-protocol/web-ui';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { DepthChart } from 'client/modules/trading/chart/depth/DepthChart';
import { FundingChart } from 'client/modules/trading/chart/funding/FundingChart';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { LatestMarketTrades } from 'client/modules/trading/marketOrders/latestMarketTrades/LatestMarketTrades';
import { Orderbook } from 'client/modules/trading/marketOrders/orderbook/Orderbook';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  productId?: number;
  withChartTabs?: boolean;
}

export function MarketDataTabs({ className, productId, withChartTabs }: Props) {
  const { data: market } = useMarket({ productId });

  const isPerpProduct = market?.type === ProductEngineType.PERP;

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

    return withChartTabs
      ? [
          {
            id: 'chart',
            content: (
              <TradingViewChart productId={productId} className="h-full" />
            ),
          },
          ...defaultTabs,
          {
            id: 'depth',
            content: <DepthChart productId={productId} className="h-full" />,
          },
          ...(isPerpProduct
            ? [
                {
                  id: 'funding',
                  content: (
                    <FundingChart productId={productId} className="h-full" />
                  ),
                },
              ]
            : []),
        ]
      : defaultTabs;
  }, [productId, withChartTabs, isPerpProduct]);

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(marketDataTabs);

  return (
    <TabsRoot
      className={joinClassNames('flex flex-col', className)}
      onValueChange={setSelectedUntypedTabId}
      value={selectedTabId}
    >
      <TabsList className="px-3 py-2">
        <ScrollShadowsContainer asChild orientation="horizontal">
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
        </ScrollShadowsContainer>
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
