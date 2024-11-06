import { Root as TabsRoot, TabsContent, TabsList } from '@radix-ui/react-tabs';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS, Divider } from '@vertex-protocol/web-ui';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { TradingTabFilterSelect } from 'client/modules/trading/components/TradingTableTabs/TradingTabFilterSelect';
import { TradingTableTabsTrigger } from 'client/modules/trading/components/TradingTableTabs/TradingTableTabsTrigger';
import { TradingTab } from 'client/modules/trading/layout/types';
import { Fragment } from 'react';

export function LargeScreenTradingTableTabs({
  tradingTabs,
  className,
}: WithClassnames<{ tradingTabs: TradingTab[] }>) {
  const { selectedTab, selectedTabId, setSelectedTabId, tabs } =
    useTabs(tradingTabs);
  const countIndicators = useSubaccountCountIndicators();

  return (
    <TabsRoot
      className={joinClassNames(
        'divide-y',
        COMMON_TRANSPARENCY_COLORS.divide,
        className,
      )}
      value={selectedTabId}
      onValueChange={setSelectedTabId}
    >
      <TabsList
        className={joinClassNames(
          'no-scrollbar flex overflow-x-auto',
          'items-center justify-between gap-x-8 py-1.5 pr-4',
        )}
      >
        <div className="flex items-center">
          {tabs.map(({ id, label, countIndicatorKey }) => {
            const associatedCount = countIndicatorKey
              ? countIndicators[countIndicatorKey]
              : undefined;

            return (
              <Fragment key={id}>
                <TradingTableTabsTrigger
                  id={id}
                  className="text-xs"
                  active={selectedTabId === id}
                  associatedCount={associatedCount}
                >
                  {label}
                </TradingTableTabsTrigger>
                <Divider vertical className="h-4 last:hidden" />
              </Fragment>
            );
          })}
        </div>
        {selectedTab.filters && (
          <TradingTabFilterSelect filters={selectedTab.filters} />
        )}
      </TabsList>
      {tabs.map(({ id, content }) => (
        <TabsContent
          key={id}
          value={id}
          // Use a min-height here to prevent layout shift when switching tabs
          className="min-h-[400px]"
        >
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
