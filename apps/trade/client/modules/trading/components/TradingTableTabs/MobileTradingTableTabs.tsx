import { TabsContent, TabsList, Root as TabsRoot } from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { TradingTableTabsTrigger } from 'client/modules/trading/components/TradingTableTabs/TradingTableTabsTrigger';
import { TradingTab } from 'client/modules/trading/layout/types';
import { Fragment } from 'react';

export function MobileTradingTableTabs({
  tradingTabs,
  className,
}: WithClassnames<{ tradingTabs: TradingTab[] }>) {
  const { selectedTabId, setSelectedTabId, tabs } = useTabs(tradingTabs);
  const countIndicators = useSubaccountCountIndicators();

  return (
    <TabsRoot
      className={joinClassNames('flex flex-col', className)}
      value={selectedTabId}
      onValueChange={setSelectedTabId}
    >
      <TabsList
        className={joinClassNames(
          'no-scrollbar flex items-center justify-between gap-x-2',
          'border-stroke overflow-x-auto border-b px-4 py-1',
        )}
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
                isSelected={selectedTabId === id}
                associatedCount={associatedCount}
              >
                {label}
              </TradingTableTabsTrigger>
              <Divider vertical className="h-4 last:hidden" />
            </Fragment>
          );
        })}
      </TabsList>
      {tabs.map(({ id, content }) => (
        <TabsContent
          key={id}
          value={id}
          // Minimum height set to approximate height of the order placement section tab to prevent jarring when switching tabs
          className="min-h-[450px]"
        >
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
