import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { BridgeTabContent } from './BridgeTabContent';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { OnrampTabContent } from './OnrampTabContent';
import { HistoryTabContent } from './HistoryTabContent';
import { useMemo } from 'react';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

const BRIDGE_TAB = {
  id: 'bridge',
  content: <BridgeTabContent />,
};

const ONRAMP_TAB = {
  id: 'onramp',
  content: <OnrampTabContent />,
};

export function ControlCenterTabs() {
  const showBridgeTab = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showOnrampTab = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  const controlCenterTabs = useMemo(
    () => [
      ...(showBridgeTab ? [BRIDGE_TAB] : []),
      ...(showOnrampTab ? [ONRAMP_TAB] : []),
      {
        id: 'history',
        content: <HistoryTabContent />,
      },
    ],
    [showBridgeTab, showOnrampTab],
  );

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(controlCenterTabs);

  return (
    <TabsRoot
      className="flex flex-col gap-y-3"
      value={selectedTabId}
      onValueChange={setSelectedUntypedTabId}
    >
      <TabsList asChild>
        <UnderlinedTabs.Container>
          {tabs.map(({ id }) => {
            return (
              <TabsTrigger asChild value={id} key={id}>
                <UnderlinedTabs.Button
                  size="lg"
                  active={selectedTabId === id}
                  className="capitalize"
                >
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
