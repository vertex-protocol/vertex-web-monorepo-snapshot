'use client';

import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import {
  ScrollShadowsContainer,
  SecondaryButton,
  UnderlinedTabs,
} from '@vertex-protocol/web-ui';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { HistoryTabsDropdown } from 'client/pages/Portfolio/subpages/History/components/HistoryTabsDropdown';
import { usePortfolioHistoryTabs } from 'client/pages/Portfolio/subpages/History/hooks/usePortfolioHistoryTabs';

export function PortfolioHistoryPage() {
  const { show } = useDialog();
  const {
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    setSelectedTabId,
    toggleOptionalTabId,
    enabledOptionalTabIds,
  } = usePortfolioHistoryTabs();
  const isDesktop = useIsDesktop();
  const { trackEvent } = useAnalyticsContext();

  return (
    <PortfolioPageContentWrapper>
      <PortfolioHeader>History</PortfolioHeader>
      <TabsRoot
        className="flex flex-col gap-y-3"
        value={selectedTabId}
        onValueChange={(value) => {
          trackEvent({
            type: 'history_tabs_clicked',
            data: {
              historyTab: value,
            },
          });
          setSelectedUntypedTabId(value);
        }}
      >
        <TabsList asChild>
          <ScrollShadowsContainer orientation="horizontal">
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
              {/*Padding enforces a minimum gap between the tabs and the end buttons*/}
              <div className="ml-auto flex gap-x-1 pl-2">
                <SecondaryButton
                  size="xs"
                  onClick={() => show({ type: 'export_history', params: {} })}
                >
                  Export
                </SecondaryButton>
                <HistoryTabsDropdown
                  enabledOptionalTabIds={enabledOptionalTabIds}
                  toggleOptionalTabId={toggleOptionalTabId}
                  setSelectedTabId={setSelectedTabId}
                />
              </div>
            </UnderlinedTabs.Container>
          </ScrollShadowsContainer>
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
