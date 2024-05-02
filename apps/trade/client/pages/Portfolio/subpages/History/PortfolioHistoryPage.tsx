import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { HistoryTabsPopover } from './components/HistoryTabsPopover';
import { usePortfolioHistoryTabs } from './hooks/usePortfolioHistoryTabs';

export function PortfolioHistoryPage() {
  const {
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    setSelectedTabId,
    toggleOptionalTabId,
    enabledOptionalTabIds,
  } = usePortfolioHistoryTabs();
  const isDesktop = useIsDesktop();

  return (
    <PortfolioPageContentWrapper>
      <PortfolioHeader>History</PortfolioHeader>
      <TabsRoot
        className="flex flex-col gap-y-3"
        value={selectedTabId}
        onValueChange={setSelectedUntypedTabId}
      >
        {/* Using TabsList as scrollable container */}
        <TabsList className="no-scrollbar overflow-x-auto">
          <UnderlinedTabs.Container className="items-center">
            {tabs.map(({ id, label }) => (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button
                  size={isDesktop ? 'lg' : 'sm'}
                  active={id === selectedTabId}
                >
                  {label}
                </UnderlinedTabs.Button>
              </TabsTrigger>
            ))}
            {/*Enforce a minimum gap between the tabs and the popover trigger*/}
            <div className="w-2 flex-1" />
            <HistoryTabsPopover
              enabledOptionalTabIds={enabledOptionalTabIds}
              toggleOptionalTabId={toggleOptionalTabId}
              setSelectedTabId={setSelectedTabId}
            />
          </UnderlinedTabs.Container>
        </TabsList>
        {tabs.map(({ id, content }) => (
          <TabsContent key={id} value={id}>
            {content}
          </TabsContent>
        ))}
      </TabsRoot>
    </PortfolioPageContentWrapper>
  );
}
