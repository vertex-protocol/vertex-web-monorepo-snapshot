import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { VLP_TOKEN_INFO } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Divider, TabTextButton } from '@vertex-protocol/web-ui';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { VlpOverviewChartComingSoon } from 'client/pages/Vlp/components/VlpOverviewCard/components/VlpOverviewChartComingSoon';
import { VlpOverviewTimespanSelect } from 'client/pages/Vlp/components/VlpOverviewCard/components/VlpOverviewTimespanSelect';
import { VlpOverviewAboutTabContent } from 'client/pages/Vlp/components/VlpOverviewCard/VlpOverviewAboutTabContent';
import { VlpOverviewCardTimespan } from 'client/pages/Vlp/components/VlpOverviewCard/vlpOverviewCardTimespan';
import { VlpOverviewPerformanceTabContent } from 'client/pages/Vlp/components/VlpOverviewCard/VlpOverviewPerformanceTabContent';
import { Fragment, useMemo, useState } from 'react';

export function VlpOverviewCard({ className }: WithClassnames) {
  const [timespan, setTimespan] = useState<VlpOverviewCardTimespan>('24h');

  const { setSelectedUntypedTabId, selectedTabId, tabs } = useTabs(
    useMemo(
      () => [
        {
          id: 'about',
          label: `About ${VLP_TOKEN_INFO.symbol}`,
          content: <VlpOverviewAboutTabContent />,
        },
        {
          id: 'performance',
          label: 'Vault Performance',
          content: (
            <VlpOverviewPerformanceTabContent selectedTimespan={timespan} />
          ),
        },
      ],
      [timespan],
    ),
  );

  return (
    <TabsRoot
      asChild
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
    >
      <Card className={className}>
        {/*Top bar*/}
        <div
          className={joinClassNames(
            'flex items-center justify-between px-4 py-2 text-xs',
            'border-overlay-divider border-b',
          )}
        >
          <TabsList className="flex items-center gap-x-3">
            {tabs.map(({ id, label }) => {
              const active = selectedTabId === id;

              return (
                <Fragment key={id}>
                  <TabsTrigger asChild value={id} key={id}>
                    <TabTextButton id={id} className="text-xs" active={active}>
                      {label}
                    </TabTextButton>
                  </TabsTrigger>
                  <Divider vertical className="last:hidden" />
                </Fragment>
              );
            })}
          </TabsList>
          <VlpOverviewTimespanSelect
            selectedTimespan={timespan}
            setSelectedTimespan={setTimespan}
          />
        </div>
        <div className="flex flex-col gap-x-4 p-4 sm:grid sm:grid-cols-5">
          <div className="sm:col-span-2">
            {/*Tab content*/}
            {tabs.map(({ id, content }) => {
              return (
                <TabsContent key={id} value={id} asChild>
                  {content}
                </TabsContent>
              );
            })}
          </div>
          <VlpOverviewChartComingSoon className="sm:col-span-3" />
        </div>
      </Card>
    </TabsRoot>
  );
}
