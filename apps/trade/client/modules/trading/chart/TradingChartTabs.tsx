import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { ProductEngineType } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { DepthChart } from 'client/modules/trading/chart/depth/DepthChart';
import { FundingChart } from 'client/modules/trading/chart/funding/FundingChart';
import { TradingViewChart } from 'client/modules/trading/chart/TradingViewChart';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function TradingChartTabs({ className, productId }: Props) {
  const { data: market } = useMarket({ productId });

  const isPerpMarket = market?.type === ProductEngineType.PERP;
  const chartTabs = useMemo(
    () => [
      { id: 'price', name: 'Price', content: TradingViewChart },
      { id: 'depth', name: 'Depth', content: DepthChart },
      ...(isPerpMarket
        ? [{ id: 'funding', name: 'Funding', content: FundingChart }]
        : []),
    ],
    [isPerpMarket],
  );

  const { selectedTabId, tabs, setSelectedTabId } = useTabs(chartTabs);

  return (
    <TabsRoot
      onValueChange={setSelectedTabId}
      value={selectedTabId}
      className={joinClassNames('flex flex-col gap-y-2 p-2', className)}
    >
      <TabsList asChild>
        <SegmentedControl.Container className="self-start">
          {tabs.map(({ id, name }) => (
            <TabsTrigger asChild key={id} value={id}>
              <SegmentedControl.Button
                size="xs"
                active={selectedTabId === id}
                className="w-20"
              >
                {name}
              </SegmentedControl.Button>
            </TabsTrigger>
          ))}
        </SegmentedControl.Container>
      </TabsList>
      {tabs.map(({ id, content: Content }) => (
        // Avoiding the use of `asChild` here so we don't need to forwardRef in `Content` components
        <TabsContent value={id} key={id} className="flex-1">
          <Content productId={productId} className="h-full" />
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
