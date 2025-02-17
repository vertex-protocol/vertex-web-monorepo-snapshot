import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { MarketsTableSearchWrapper } from 'client/pages/Markets/components/MarketsTableSearchWrapper';
import { FundingRateMarketsTable } from 'client/pages/Markets/tables/FundingRateMarketsTable';
import { PerpMarketsTable } from 'client/pages/Markets/tables/PerpMarketsTable';
import { SpotMarketsTable } from 'client/pages/Markets/tables/SpotMarketsTable';
import { useMemo } from 'react';

export function useMarketsTableTabs() {
  const { isSpotTradingEnabled } = useEnabledFeatures();

  const tabs = useMemo(() => {
    return [
      {
        id: 'perps',
        label: 'Perps',
        content: (
          <MarketsTableSearchWrapper
            renderTable={({ query }) => <PerpMarketsTable query={query} />}
          />
        ),
      },
      ...(isSpotTradingEnabled
        ? [
            {
              id: 'spot',
              label: 'Spot',
              content: <SpotMarketsTable />,
            },
          ]
        : []),
      {
        id: 'funding_rates',
        label: 'Funding Rates',
        content: (
          <MarketsTableSearchWrapper
            renderTable={({ query }) => (
              <FundingRateMarketsTable query={query} />
            )}
          />
        ),
      },
      {
        id: 'money_market',
        label: 'Lend/Borrow',
        content: <MoneyMarketsTable />,
      },
    ];
  }, [isSpotTradingEnabled]);

  const { selectedTabId, setSelectedUntypedTabId } = useTabs(tabs);

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
