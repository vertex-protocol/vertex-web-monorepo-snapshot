'use client';

import {
  Content as TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useMarketsTableTabs } from 'client/pages/Markets/components/MarketTableTabs/useMarketsTableTabs';

export function MarketsTableTabs() {
  const { tabs, selectedTabId, setSelectedUntypedTabId } =
    useMarketsTableTabs();

  return (
    <TabsRoot
      className="flex w-full flex-col gap-y-6"
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
    >
      <TabsList asChild>
        <UnderlinedTabs.Container>
          {tabs.map(({ id, label }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button size="lg" active={selectedTabId === id}>
                  {label}
                </UnderlinedTabs.Button>
              </TabsTrigger>
            );
          })}
        </UnderlinedTabs.Container>
      </TabsList>
      {tabs.map(({ id, content }) => (
        <TabsContent value={id} key={id}>
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
