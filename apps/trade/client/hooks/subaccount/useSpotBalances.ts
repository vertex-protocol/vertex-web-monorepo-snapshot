import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { isSpotProduct } from '@vertex-protocol/contracts';
import {
  AnnotatedSpotBalanceWithProduct,
  SpotProductMetadata,
} from '@vertex-protocol/react-client';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotInterestRates } from 'client/hooks/markets/useSpotInterestRates';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import {
  calcSpotBalanceHealth,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';

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
  depositAPR: BigDecimal | undefined;
  borrowAPR: BigDecimal | undefined;
}

interface UseSpotBalances {
  balances: SpotBalanceItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

function spotBalancesQueryKey(
  subaccount: AppSubaccount,
  subaccountSummaryDataUpdatedAt: number,
  hasInterestRatesData: boolean,
) {
  return createQueryKey(
    'spotBalances',
    subaccount,
    subaccountSummaryDataUpdatedAt,
    hasInterestRatesData,
  );
}

export function useSpotBalances(): UseSpotBalances {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { currentSubaccount } = useSubaccountContext();

  const {
    data: summaryData,
    isError: summaryError,
    isLoading: summaryLoading,
    dataUpdatedAt,
  } = useSubaccountSummary();
  const { data: spotInterestRates } = useSpotInterestRates();

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
          depositAPR: spotInterestRates?.[balance.productId]?.deposit,
          borrowAPR: spotInterestRates?.[balance.productId]?.borrow,
        };
      });
  };

  const { data: mappedData } = useQuery({
    queryKey: spotBalancesQueryKey(
      currentSubaccount,
      dataUpdatedAt,
      !!spotInterestRates,
    ),
    queryFn,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });

  return {
    balances: mappedData,
    isLoading: summaryLoading,
    isError: summaryError,
  };
}
