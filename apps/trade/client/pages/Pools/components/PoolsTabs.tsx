import {
  Content as TabsContent,
  Root as TabsRoot,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { usePoolsTabs } from '../hooks/usePoolsTabs';

export function PoolsTabs() {
  const { tabs, selectedTabId, setSelectedUntypedTabId } = usePoolsTabs();

  return (
    <TabsRoot
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
      className="flex flex-col gap-y-6"
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
