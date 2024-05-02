import { BigDecimal } from '@vertex-protocol/utils';
import {
  SpotBalanceItem,
  useSpotBalances,
} from 'client/hooks/subaccount/useSpotBalances';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

interface BalanceInfo {
  symbol: string;
  amount: BigDecimal;
  valueUsd: BigDecimal;
}

export interface SpotBalanceTableItem extends SpotBalanceItem {
  balanceInfo: BalanceInfo;
}

interface Params {
  marketFilter?: MarketFilter;
}

export const useSpotBalancesTable = ({ marketFilter }: Params) => {
  const { balances: spotBalances, ...rest } = useSpotBalances();

  const mappedData: SpotBalanceTableItem[] | undefined = useMemo(() => {
    if (!spotBalances) {
      return;
    }

    return spotBalances
      .filter((balance) => {
        // Instead of using `useFilteredMarkets`, we do this manually as:
        // 1. market filtering is a superset of the functionality required here (ex. only spot here)
        // 2. market filtering does not include the quote product
        if (
          marketFilter?.productIds &&
          !marketFilter.productIds.includes(balance.productId)
        ) {
          return false;
        }
        if (marketFilter?.amount) {
          // Apparently, BigDecimals.ZERO.isPositive() is true
          switch (marketFilter.amount) {
            case 'nonzero':
              return !balance.amount.isZero();
            case 'positive':
              return balance.amount.isGreaterThan(0);
            case 'negative':
              return balance.amount.isLessThan(0);
          }
        }
        return true;
      })
      .map((balance) => {
        return {
          ...balance,
          balanceInfo: {
            amount: balance.amount,
            valueUsd: balance.valueUsd,
            symbol: balance.metadata.token.symbol,
          },
        };
      });
  }, [marketFilter?.amount, marketFilter?.productIds, spotBalances]);

  return {
    balances: mappedData,
    ...rest,
  };
};
