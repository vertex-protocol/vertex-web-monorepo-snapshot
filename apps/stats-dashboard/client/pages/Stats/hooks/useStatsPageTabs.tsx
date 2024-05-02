import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { OverviewSection } from 'client/sections/Overview/OverviewSection';
import { PerpsSection } from 'client/sections/Perps/PerpsSection';
import { SpotSection } from 'client/sections/Spot/SpotSection';
import { MoneyMarketsSection } from 'client/sections/MoneyMarkets/MoneyMarketsSection';

const TABS = [
  {
    id: 'Overview',
    content: <OverviewSection />,
  },
  {
    id: 'Perps',
    content: <PerpsSection />,
  },
  {
    id: 'Spot',
    content: <SpotSection />,
  },
  {
    id: 'Money Market',
    content: <MoneyMarketsSection />,
  },
] as const;

export function useStatsPageTabs() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } = useTabs(TABS);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
