import {
  TabIdentifiable,
  TabIdentifiableID,
  TabIdentifiableList,
} from 'client/hooks/ui/tabs/types';
import { PrimitiveAtom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

export function useAtomControlledTabs<
  TTabID extends string,
  TTab extends TabIdentifiable<TTabID>,
>(
  options: TabIdentifiableList<TTab>,
  // Atom with the ID of the current tab
  atom: PrimitiveAtom<TTabID>,
) {
  const [selectedTabId, setSelectedTabId] = useAtom(atom);

  const selectedTab = useMemo(() => {
    return (
      options.find((option) => {
        if (typeof option === 'string') {
          return option === selectedTabId;
        }
        return option.id === selectedTabId;
      }) ?? options[0]
    );
  }, [options, selectedTabId]);

  // An unsafe version of setSelectedTabId that is headless component compatible as the ID is not strongly typed
  const setSelectedUntypedTabId = useCallback(
    (id: string) => {
      setSelectedTabId(id as TabIdentifiableID<TTab>);
    },
    [setSelectedTabId],
  );

  return {
    selectedTab,
    selectedTabId,
    setSelectedTabId,
    setSelectedUntypedTabId,
  };
}
