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
import { usePortfolioOpenOrderTabs } from './hooks/usePortfolioOpenOrderTabs';
import { CounterPill } from '@vertex-protocol/web-ui';

export const PortfolioOpenOrdersPage = () => {
  const { openOrderTabs, selectedTabId, setSelectedTabId } =
    usePortfolioOpenOrderTabs();

  const isDesktop = useIsDesktop();

  return (
    <PortfolioPageContentWrapper>
      <PortfolioHeader>Open Orders</PortfolioHeader>
      <TabsRoot className="flex flex-col gap-y-3" value={selectedTabId}>
        <TabsList asChild>
          <UnderlinedTabs.Container>
            {openOrderTabs.map(({ id, label, associatedCount }) => {
              return (
                <TabsTrigger asChild value={id} key={id}>
                  <UnderlinedTabs.Button
                    size={isDesktop ? 'lg' : 'sm'}
                    active={id === selectedTabId}
                    onClick={() => setSelectedTabId(id)}
                    className="capitalize"
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
        {openOrderTabs.map(({ id, content }) => (
          <TabsContent key={id} value={id}>
            {content}
          </TabsContent>
        ))}
      </TabsRoot>
    </PortfolioPageContentWrapper>
  );
};
