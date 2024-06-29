import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { FundingRateMarketsTable } from '../tables/FundingRateMarketsTable';
import { PerpMarketsTable } from '../tables/PerpMarketsTable';
import { SpotMarketsTable } from '../tables/SpotMarketsTable';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';

const MARKETS_TABS = [
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
  const { selectedTabId, setSelectedUntypedTabId } = useTabs(MARKETS_TABS);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs: MARKETS_TABS,
  };
}
