import {
  Content as TabsContent,
  Root as TabsRoot,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useStatsPageTabs } from '../hooks/useStatsPageTabs';

export function StatsPageTabs() {
  const { tabs, selectedTabId, setSelectedUntypedTabId } = useStatsPageTabs();

  return (
    <TabsRoot value={selectedTabId} onValueChange={setSelectedUntypedTabId}>
      <TabsList asChild>
        <UnderlinedTabs.Container>
          {tabs.map(({ id }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button size="lg" active={selectedTabId === id}>
                  {id}
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
