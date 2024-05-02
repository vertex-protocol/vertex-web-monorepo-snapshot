import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames } from '@vertex-protocol/web-common';
import { joinClassNames } from '@vertex-protocol/web-common';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useBalancesTabs } from '../hooks/useBalancesTabs';

export function BalancesTabs({ className }: WithClassnames) {
  const { selectedTabId, tabs, setSelectedUntypedTabId } = useBalancesTabs();

  return (
    <TabsRoot
      className={joinClassNames('flex w-full flex-col gap-y-3', className)}
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
