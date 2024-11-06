'use client';

import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { CounterPill, UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { usePerpPositionsTabs } from 'client/pages/Portfolio/subpages/Perpetuals/hooks/usePerpPositionsTabs';

export function PerpPositionsTabs({ className }: WithClassnames) {
  const { selectedTabId, tabs, setSelectedUntypedTabId } =
    usePerpPositionsTabs();
  const { trackEvent } = useAnalyticsContext();

  return (
    <TabsRoot
      className={joinClassNames('flex w-full flex-col gap-y-3', className)}
      value={selectedTabId}
      onValueChange={(value) => {
        setSelectedUntypedTabId(value);
        trackEvent({
          type: 'positions_tabs_clicked',
          data: {
            positionsTab: value,
          },
        });
      }}
    >
      <TabsList asChild>
        <UnderlinedTabs.Container>
          {tabs.map(({ id, label, associatedCount }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button
                  size="lg"
                  active={selectedTabId === id}
                  endIcon={
                    !!associatedCount && (
                      <CounterPill>{associatedCount.toFixed()}</CounterPill>
                    )
                  }
                >
                  {label}
                </UnderlinedTabs.Button>
              </TabsTrigger>
            );
          })}
        </UnderlinedTabs.Container>
      </TabsList>
      {/* Tables */}
      {/* Setting a min height on container to prevent scroll-jumping when switching between tabs */}
      <div className="min-h-[375px]">
        {tabs.map(({ id, content }) => (
          <TabsContent key={id} value={id}>
            {content}
          </TabsContent>
        ))}
      </div>
    </TabsRoot>
  );
}
