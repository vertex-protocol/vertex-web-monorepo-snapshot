import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { isSpotProduct } from '@vertex-protocol/contracts';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { calcBorrowAPR, calcDepositAPR } from 'client/utils/calcs/calcSpotApr';
import {
  calcSpotBalanceHealth,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import {
  AnnotatedSpotBalanceWithProduct,
  SpotProductMetadata,
} from 'common/productMetadata/types';
import { useCurrentSubaccountSummary } from '../query/subaccount/useCurrentSubaccountSummary';

export interface SpotBalanceItem {
  metadata: SpotProductMetadata;
  productId: number;
  amount: BigDecimal;
  amountBorrowed: BigDecimal;
  amountDeposited: BigDecimal;
  oraclePrice: BigDecimal;
  oraclePriceUsd: BigDecimal;
  valueUsd: BigDecimal;
  healthMetrics: InitialMaintMetrics;
  depositAPR: BigDecimal;
  borrowAPR: BigDecimal;
}

interface UseSpotBalances {
  balances?: SpotBalanceItem[];
  isLoading?: boolean;
  isError?: boolean;
}

function spotBalancesQueryKey(lastUpdated: number) {
  return createQueryKey('spotBalances', lastUpdated);
}

export function useSpotBalances(): UseSpotBalances {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const {
    data: summaryData,
    isError: summaryError,
    isLoading: summaryLoading,
    dataUpdatedAt,
  } = useCurrentSubaccountSummary();

  const disabled = !summaryData;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    return summaryData.balances
      .filter(isSpotProduct)
      .map((balance): SpotBalanceItem => {
        const balanceWithProduct = balance as AnnotatedSpotBalanceWithProduct;

        const decimalAdjustedBalanceAmount = removeDecimals(
          balanceWithProduct.amount,
        );

        // Ignore dust spot balances
        const roundedBalanceAmount = (() => {
          if (decimalAdjustedBalanceAmount.abs().lt(1e-6)) {
            return BigDecimals.ZERO;
          }
          return decimalAdjustedBalanceAmount;
        })();

        const healthMetrics = calcSpotBalanceHealth(balanceWithProduct);

        return {
          productId: balanceWithProduct.productId,
          oraclePrice: balance.oraclePrice,
          oraclePriceUsd:
            balance.oraclePrice.multipliedBy(primaryQuotePriceUsd),
          amount: roundedBalanceAmount,
          valueUsd: balance.oraclePrice
            .multipliedBy(roundedBalanceAmount)
            .multipliedBy(primaryQuotePriceUsd),
          amountBorrowed: BigDecimal.min(roundedBalanceAmount, 0),
          amountDeposited: BigDecimal.max(roundedBalanceAmount, 0),
          metadata: balanceWithProduct.metadata,
          healthMetrics: {
            initial: removeDecimals(healthMetrics.initial),
            maintenance: removeDecimals(healthMetrics.maintenance),
          },
          depositAPR: calcDepositAPR(balanceWithProduct),
          borrowAPR: calcBorrowAPR(balanceWithProduct),
        };
      });
  };

  const { data: mappedData } = useQuery({
    queryKey: spotBalancesQueryKey(dataUpdatedAt),
    queryFn,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
  });

  return {
    balances: mappedData,
    isLoading: summaryLoading,
    isError: summaryError,
  };
}
