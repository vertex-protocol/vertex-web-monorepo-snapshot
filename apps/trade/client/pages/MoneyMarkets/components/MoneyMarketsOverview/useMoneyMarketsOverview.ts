import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useMemo } from 'react';

export function useMoneyMarketsOverview() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: allMarketsData, isLoading: isLoadingAllMarketsData } =
    useAllMarkets();

  const mappedData = useMemo(() => {
    if (!allMarketsData) {
      return;
    }

    let totalDeposits = BigDecimals.ZERO;
    let totalBorrows = BigDecimals.ZERO;

    Object.values(allMarketsData.spotProducts).forEach(({ product }) => {
      const decimalAdjustedProductTotalDeposited = removeDecimals(
        product.totalDeposited.times(product.oraclePrice),
      );

      const decimalAdjustedProductTotalBorrowed = removeDecimals(
        product.totalBorrowed.times(product.oraclePrice),
      );

      totalDeposits = totalDeposits.plus(decimalAdjustedProductTotalDeposited);
      totalBorrows = totalBorrows.plus(decimalAdjustedProductTotalBorrowed);
    });
    return {
      totalDepositsUsd: totalDeposits.times(primaryQuotePriceUsd),
      totalBorrowsUsd: totalBorrows.times(primaryQuotePriceUsd),
    };
  }, [allMarketsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingAllMarketsData,
  };
}
