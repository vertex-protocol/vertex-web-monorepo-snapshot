import { ProductEngineType } from '@vertex-protocol/client';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import {
  BalanceTableItem,
  useCommandCenterBalanceItems,
} from 'client/modules/commandCenter/hooks/useCommandCenterBalanceItems';
import {
  MarketTableItem,
  useCommandCenterMarketItems,
} from 'client/modules/commandCenter/hooks/useCommandCenterMarketItems';
import {
  NavItem,
  useCommandCenterNavItems,
} from 'client/modules/commandCenter/hooks/useCommandCenterNavItems';
import {
  PositionsTableItem,
  useCommandCenterPositionsItems,
} from 'client/modules/commandCenter/hooks/useCommandCenterPositionItems';
import { useMemo, useState } from 'react';

interface ItemsByGroupType {
  markets: MarketTableItem[];
  positions: PositionsTableItem[];
  balances: BalanceTableItem[];
  navItems: NavItem[];
}

/**
 * Sets up the base state getters / setters for the command center (`query`, `marketType`)
 * and fetches all the items to show, grouping them by their type (e.g. `markets`, `positions`, etc.)
 */
export function useCommandCenter() {
  const [query, setQuery] = useState('');

  const [marketType, setMarketType] = useState<ProductEngineType | undefined>();

  const { markets } = useCommandCenterMarketItems({ marketType });
  const { positions } = useCommandCenterPositionsItems({ marketType });
  const { balances } = useCommandCenterBalanceItems({ marketType });
  const { navItems } = useCommandCenterNavItems();

  const allItems = useMemo(
    () => [...markets, ...positions, ...balances, ...navItems],
    [markets, positions, balances, navItems],
  );

  const { results, normalizedQuery } = useTextSearch({
    query,
    items: allItems,
    getSearchString,
  });

  const filteredItemsByGroupType = useMemo(() => {
    const itemsByGroup: ItemsByGroupType = {
      markets: [],
      positions: [],
      balances: [],
      navItems: [],
    };

    results.forEach((item) => {
      if (item.type === 'markets') {
        itemsByGroup.markets.push(item);
      } else if (item.type === 'positions') {
        itemsByGroup.positions.push(item);
      } else if (item.type === 'balances') {
        itemsByGroup.balances.push(item);
      } else if (item.type === 'navItems') {
        itemsByGroup.navItems.push(item);
      }
    });

    return itemsByGroup;
  }, [results]);

  const shouldShowMarkets = filteredItemsByGroupType.markets.length > 0;
  const shouldShowPositions =
    !!normalizedQuery && filteredItemsByGroupType.positions.length > 0;
  const shouldShowBalances =
    !!normalizedQuery && filteredItemsByGroupType.balances.length > 0;
  const shouldShowNavItems =
    !!normalizedQuery && filteredItemsByGroupType.navItems.length > 0;

  return {
    query,
    setQuery,
    marketType,
    setMarketType,
    shouldShowMarkets,
    shouldShowPositions,
    shouldShowBalances,
    shouldShowNavItems,
    ...filteredItemsByGroupType,
  };
}

function getSearchString(
  item: MarketTableItem | PositionsTableItem | BalanceTableItem | NavItem,
) {
  return item.searchKey;
}
