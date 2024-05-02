import { LpMarketsTable } from '../components/LpMarketsTable';
import { ElixirPoolsSection } from 'client/modules/pools/components/elixirPools/ElixirPoolsSection';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';

const POOL_TABS = [
  {
    id: 'fusion',
    label: 'Vertex Fusion',
    content: <ElixirPoolsSection />,
  },
  {
    id: 'spot',
    label: 'Spot',
    content: <LpMarketsTable />,
  },
] as const;

export function usePoolsTabs() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } = useTabs(POOL_TABS);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
