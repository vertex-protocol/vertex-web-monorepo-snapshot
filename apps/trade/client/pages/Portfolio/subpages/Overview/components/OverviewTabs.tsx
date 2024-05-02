import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames } from '@vertex-protocol/web-common';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CounterPill } from '@vertex-protocol/web-ui';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useOverviewTabs } from '../hooks/useOverviewTabs';

export function OverviewTabs({
  className,
}: WithClassnames<{ productId?: number }>) {
  const { selectedTabId, tabs, setSelectedUntypedTabId } = useOverviewTabs();

  return (
    <TabsRoot
      className={joinClassNames('flex w-full flex-col gap-y-3', className)}
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
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
