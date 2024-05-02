import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { FundingRateMarketsTable } from '../tables/FundingRateMarketsTable';
import { MoneyMarketsTable } from '../tables/MoneyMarketsTable';
import { PerpMarketsTable } from '../tables/PerpMarketsTable';
import { SpotMarketsTable } from '../tables/SpotMarketsTable';

const TABS = [
  {
    id: 'perps',
    label: 'Perps',
    content: <PerpMarketsTable />,
  },
  {
    id: 'spot',
    label: 'Spot',
    content: <SpotMarketsTable />,
  },
  {
    id: 'funding_rates',
    label: 'Funding Rates',
    content: <FundingRateMarketsTable />,
  },
  {
    id: 'money_market',
    label: 'Lend/Borrow',
    content: <MoneyMarketsTable />,
  },
] as const;

export function useMarketsTabs() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } = useTabs(TABS);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
