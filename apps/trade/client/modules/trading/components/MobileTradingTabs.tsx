import { TabsContent, TabsList, Root as TabsRoot } from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Card, Divider, ScrollShadowsContainer } from '@vertex-protocol/web-ui';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { TradingTableTabsTrigger } from 'client/modules/trading/components/TradingTableTabs/TradingTableTabsTrigger';
import { TradingTab } from 'client/modules/trading/layout/types';
import { Fragment } from 'react';

export function MobileTradingTabs({
  tradingTabs,
  className,
}: WithClassnames<{ tradingTabs: TradingTab[] }>) {
  const { selectedTabId, setSelectedTabId, tabs } = useTabs(tradingTabs);
  const countIndicators = useSubaccountCountIndicators();

  return (
    <TabsRoot
      // Using `flex-col` to stretch the tab list and tab content.
      className={joinClassNames('flex flex-col gap-y-2', className)}
      value={selectedTabId}
      onValueChange={setSelectedTabId}
    >
      <TabsList asChild>
        <Card>
          <ScrollShadowsContainer
            orientation="horizontal"
            className="flex items-center justify-between gap-x-2 py-1"
          >
            {tradingTabs.map(({ countIndicatorKey, id, label }) => {
              const associatedCount = countIndicatorKey
                ? countIndicators[countIndicatorKey]
                : undefined;
              return (
                <Fragment key={id}>
                  <TradingTableTabsTrigger
                    className="w-full px-4 text-xs"
                    id={id}
                    active={selectedTabId === id}
                    associatedCount={associatedCount}
                  >
                    {label}
                  </TradingTableTabsTrigger>
                  <Divider vertical className="h-4 last:hidden" />
                </Fragment>
              );
            })}
          </ScrollShadowsContainer>
        </Card>
      </TabsList>
      {tabs.map(({ id, content }) => (
        <TabsContent
          key={id}
          value={id}
          // Min height to reduce the amount of scroll jump when switching between
          // tabs with a different number of cards.
          // Only apply `flex` when active to avoid overriding `display: none` applied
          // to non-active tab content containers.
          className="min-h-40 flex-col gap-y-2 data-[state=active]:flex"
        >
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
