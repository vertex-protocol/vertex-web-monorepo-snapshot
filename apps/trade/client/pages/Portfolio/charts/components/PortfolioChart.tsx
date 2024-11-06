import { TabsContent, Root as TabsRoot } from '@radix-ui/react-tabs';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { PortfolioChartTopBar } from 'client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTopBar';
import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';
import {
  ChartTimespan,
  PortfolioChartTab,
} from 'client/pages/Portfolio/charts/types';

interface Props<TTabId extends string> extends WithClassnames {
  chartData?: PortfolioChartDataItem[];
  tabs: TabIdentifiableList<PortfolioChartTab<TTabId>>;
  timespan: ChartTimespan;
  selectedTabId: TTabId;
  setSelectedUntypedTabId: (id: string) => void;
  setTimespan: (timespan: ChartTimespan) => void;
  isPrivate: boolean;
}

export function PortfolioChart<TTabID extends string>({
  chartData,
  selectedTabId,
  setSelectedUntypedTabId,
  setTimespan,
  tabs,
  timespan,
  className,
  isPrivate,
}: Props<TTabID>) {
  return (
    <TabsRoot
      asChild
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
    >
      <Card
        className={joinClassNames(
          'flex flex-col',
          // Small screen styles
          'gap-y-2 p-3',
          // Large screen styles
          'lg:h-full lg:gap-y-3 lg:px-2.5 lg:py-4',
          className,
        )}
      >
        <PortfolioChartTopBar
          selectedTabId={selectedTabId}
          tabs={tabs}
          timespan={timespan}
          setTimespan={setTimespan}
          // Horizontal padding to match the padding on the left side of the chart on large screens
          className="sm:px-1.5"
        />
        {/*Chart*/}
        {/*Setting height to prevent collapse on mobile, height needs to be specified here for chart responsive container to work*/}
        {/*On large screens, height is derived from the parent container, so no need to specify height here*/}
        <div className="flex h-[300px] min-h-[300px] w-full flex-1 lg:h-auto">
          <BrandLoadingWrapper
            iconSizeVariant="sm"
            isLoading={!chartData}
            indicatorContainerClassName="flex-1"
            grayscale
          >
            {!!chartData &&
              tabs.map(({ id, ChartComponent }) => {
                return (
                  <TabsContent key={id} value={id} className="h-full w-full">
                    <ChartComponent data={chartData} isPrivate={isPrivate} />
                  </TabsContent>
                );
              })}
          </BrandLoadingWrapper>
        </div>
      </Card>
    </TabsRoot>
  );
}
