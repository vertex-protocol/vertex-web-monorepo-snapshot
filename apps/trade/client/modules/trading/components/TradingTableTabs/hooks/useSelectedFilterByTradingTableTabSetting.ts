import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { useCallback } from 'react';

interface Props {
  tradingTableTab: TradingTabFilters['tradingTableTab'];
}

export function useSelectedFilterByTradingTableTabSetting<T extends string>({
  tradingTableTab,
}: Props) {
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const selectedFilter = savedUserSettings.trading
    .selectedFilterByTradingTableTab[tradingTableTab] as T;

  const setSelectedFilter = useCallback(
    (newValue: string) => {
      setSavedUserSettings((prev) => ({
        ...prev,
        trading: {
          ...prev.trading,
          selectedFilterByTradingTableTab: {
            ...prev.trading.selectedFilterByTradingTableTab,
            [tradingTableTab]: newValue,
          },
        },
      }));
    },
    [tradingTableTab, setSavedUserSettings],
  );

  return { selectedFilter, setSelectedFilter };
}
