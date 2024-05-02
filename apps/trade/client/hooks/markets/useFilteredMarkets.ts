import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { MarketFilter } from 'client/types/MarketFilter';
import { AnnotatedMarket } from 'common/productMetadata/types';
import { useCallback, useMemo } from 'react';
import { pickBy } from 'lodash';

interface UseFilteredMarkets {
  filteredMarkets: Record<number, AnnotatedMarket>;
  filteredProductIds: number[];
  isLoading: boolean;
}

export function useFilteredMarkets(filters?: MarketFilter): UseFilteredMarkets {
  const { data: allMarketsData, isLoading: loadingMarkets } = useAllMarkets();
  const { data: subaccountSummary, isLoading: loadingSubaccountSummary } =
    useCurrentSubaccountSummary();

  // Destructure for a nice dependency array
  const amountFilter = filters?.amount;
  const marketTypeFilter = filters?.marketType;
  const productIdFilters = filters?.productIds;

  const filterFn = useCallback(
    (market: AnnotatedMarket): boolean => {
      if (marketTypeFilter != null && marketTypeFilter !== market.type) {
        return false;
      }
      if (
        productIdFilters?.length &&
        !productIdFilters.includes(market.productId)
      ) {
        return false;
      }
      if (amountFilter && subaccountSummary) {
        const balance = subaccountSummary.balances.find(
          (bal) => bal.productId === market.productId,
        );
        if (!balance) {
          // Invalid state
          console.warn(
            '[useFilteredMarkets] Could not find balance for product',
            market.productId,
          );
          return false;
        }
        switch (amountFilter) {
          case 'nonzero':
            return !balance.amount.isZero();
          case 'positive':
            return balance.amount.isPositive();
          case 'negative':
            return balance.amount.isNegative();
        }
      }
      return true;
    },
    [amountFilter, marketTypeFilter, productIdFilters, subaccountSummary],
  );

  const filteredMarkets = useMemo((): Record<number, AnnotatedMarket> => {
    return pickBy(allMarketsData?.allMarkets, filterFn);
  }, [allMarketsData, filterFn]);

  const filteredProductIds = useMemo(() => {
    return Object.keys(filteredMarkets).map(Number);
  }, [filteredMarkets]);

  return {
    filteredMarkets,
    filteredProductIds,
    isLoading: loadingMarkets || loadingSubaccountSummary,
  };
}
