import {
  TabIdentifiable,
  TabIdentifiableID,
  TabIdentifiableList,
} from 'client/hooks/ui/tabs/types';
import { useCallback, useMemo, useState } from 'react';

export function useTabs<
  TTab extends TabIdentifiable<TTabId>,
  TTabId extends string = TabIdentifiableID<TTab>,
>(tabs: TabIdentifiableList<TTab>, defaultTabId?: TabIdentifiableID<TTab>) {
  const [selectedTabId, setSelectedTabId] = useState<TabIdentifiableID<TTab>>(
    defaultTabId ?? tabs[0].id,
  );

  const selectedTab = useMemo(
    () => tabs.find((tab) => tab.id === selectedTabId) ?? tabs[0],
    [selectedTabId, tabs],
  );

  // An unsafe version of setSelectedTabId that is headless component compatible as the ID is not strongly typed
  const setSelectedUntypedTabId = useCallback((id: string) => {
    setSelectedTabId(id as TabIdentifiableID<TTab>);
  }, []);

  return {
    tabs,
    selectedTab,
    selectedTabId,
    setSelectedTabId,
    setSelectedUntypedTabId,
  };
}
