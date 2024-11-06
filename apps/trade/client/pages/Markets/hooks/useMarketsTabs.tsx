import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { MarketsTableSearchWrapper } from 'client/pages/Markets/components/MarketsTableSearchWrapper';
import { FundingRateMarketsTable } from 'client/pages/Markets/tables/FundingRateMarketsTable';
import { PerpMarketsTable } from 'client/pages/Markets/tables/PerpMarketsTable';
import { SpotMarketsTable } from 'client/pages/Markets/tables/SpotMarketsTable';

const MARKETS_TABS = [
  {
    id: 'perps',
    label: 'Perps',
    content: (
      <MarketsTableSearchWrapper
        renderTable={({ query }) => <PerpMarketsTable query={query} />}
      />
    ),
  },
  {
    id: 'spot',
    label: 'Spot',
    content: <SpotMarketsTable />,
  },
  {
    id: 'funding_rates',
    label: 'Funding Rates',
    content: (
      <MarketsTableSearchWrapper
        renderTable={({ query }) => <FundingRateMarketsTable query={query} />}
      />
    ),
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
