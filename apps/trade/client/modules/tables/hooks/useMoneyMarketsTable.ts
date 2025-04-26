import { BigDecimal } from '@vertex-protocol/client';
import {
  AnnotatedSpotMarket,
  SpotProductMetadata,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { getMarketForProductId } from 'client/hooks/query/markets/allMarkets/getMarketForProductId';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useMemo } from 'react';

export interface MoneyMarketsTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  totalDeposited: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  totalBorrowed: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  spotBalance: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  depositAPR: BigDecimal | undefined;
  borrowAPR: BigDecimal | undefined;
  isNewMarket: boolean;
  isFavorited: boolean;
  utilizationRatioFrac: BigDecimal | undefined;
}

export function useMoneyMarketsTable() {
  const { getIsNewMarket } = useVertexMetadataContext();
  const isConnected = useIsConnected();

  const { balances, isLoading: isLoadingBalances } = useSpotBalances();
  const { data: allMarketsData, isLoading: isLoadingMarkets } = useAllMarkets();

  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const mappedData: MoneyMarketsTableItem[] | undefined = useMemo(() => {
    if (!balances || !allMarketsData) {
      return;
    }

    return balances
      .map((balance) => {
        const market = getMarketForProductId<AnnotatedSpotMarket>(
          balance.productId,
          allMarketsData,
        );

        if (!market) {
          return;
        }

        const decimalAdjustedTotalDepositedAmount = removeDecimals(
          market.product.totalDeposited,
        );
        const decimalAdjustedTotalBorrowedAmount = removeDecimals(
          market.product.totalBorrowed,
        );

        return {
          metadata: balance.metadata,
          productId: balance.productId,
          totalDeposited: {
            amount: decimalAdjustedTotalDepositedAmount,
            valueUsd: decimalAdjustedTotalDepositedAmount.multipliedBy(
              balance.oraclePriceUsd,
            ),
          },
          totalBorrowed: {
            amount: decimalAdjustedTotalBorrowedAmount,
            valueUsd: decimalAdjustedTotalBorrowedAmount.multipliedBy(
              balance.oraclePriceUsd,
            ),
          },
          spotBalance: {
            amount: balance.amount,
            valueUsd: balance.valueUsd,
          },
          depositAPR: balance.depositAPR,
          borrowAPR: balance.borrowAPR,
          isNewMarket: getIsNewMarket(balance.productId),
          isFavorited: favoritedMarketIds.has(balance.productId),
          utilizationRatioFrac: balance.utilizationRatioFrac,
        };
      })
      .filter(nonNullFilter);
  }, [balances, allMarketsData, getIsNewMarket, favoritedMarketIds]);

  return {
    moneyMarkets: mappedData,
    isLoading: isLoadingBalances || isLoadingMarkets,
    toggleIsFavoritedMarket,
    disableFavoriteButton: !isConnected,
  };
}
