import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  calcLpBalanceValue,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import {
  PerpProductMetadata,
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
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import {
  calcLpBalanceHealth,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';

type LpUnderlyingProduct =
  | {
      type: ProductEngineType.SPOT;
      metadata: SpotProductMetadata;
    }
  | {
      type: ProductEngineType.PERP;
      metadata: PerpProductMetadata;
    };

export interface LpBalanceItem {
  product: LpUnderlyingProduct;
  productId: number;
  oraclePrice: BigDecimal;
  oraclePriceUsd: BigDecimal;
  lpAmount: BigDecimal;
  // Base balance in the subaccount
  underlyingAmount: BigDecimal;
  // Decomposed amounts, based on current pool state
  amountBase: BigDecimal;
  amountQuote: BigDecimal;
  // Lp token value in USD
  lpValueUsd: BigDecimal;
  healthMetrics: InitialMaintMetrics;
}

interface UseLpBalances {
  balances?: LpBalanceItem[];
  isLoading?: boolean;
  isError?: boolean;
}

function lpBalancesQueryKey(
  subaccount: AppSubaccount,
  subaccountSummaryLastUpdated: number,
) {
  return createQueryKey('lpBalances', subaccount, subaccountSummaryLastUpdated);
}

/**
 * Fetches LP balances for the current subaccount
 *
 * Note: Also includes balances where the pool is disabled (when quote for the market isn't product ID of 0)
 */
export function useLpBalances(): UseLpBalances {
  const { currentSubaccount } = useSubaccountContext();

  const {
    data: summaryData,
    isError: summaryError,
    isLoading: summaryLoading,
    dataUpdatedAt,
  } = useSubaccountSummary();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const disabled = !summaryData;

  const queryFn = () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    return summaryData.balances.map((balance): LpBalanceItem => {
      const product = ((): LpUnderlyingProduct => {
        // This seems required for correct typing
        if (balance.type === ProductEngineType.SPOT) {
          return {
            type: ProductEngineType.SPOT,
            metadata: balance.metadata,
          };
        } else {
          return {
            type: ProductEngineType.PERP,
            metadata: balance.metadata,
          };
        }
      })();

      const decimalAdjustedLpAmount = removeDecimals(balance.lpAmount);

      const shareOfPool = balance.totalLpSupply.isZero()
        ? BigDecimals.ZERO
        : balance.lpAmount.dividedBy(balance.totalLpSupply);

      const healthMetrics = calcLpBalanceHealth(balance);

      return {
        product,
        productId: balance.productId,
        oraclePrice: balance.oraclePrice,
        oraclePriceUsd: balance?.oraclePrice.multipliedBy(primaryQuotePriceUsd),
        lpAmount: decimalAdjustedLpAmount,
        underlyingAmount: removeDecimals(balance.amount),
        amountBase: removeDecimals(
          balance.totalLpBaseAmount.multipliedBy(shareOfPool),
        ),
        amountQuote: removeDecimals(
          balance.totalLpQuoteAmount.multipliedBy(shareOfPool),
        ),
        lpValueUsd: removeDecimals(calcLpBalanceValue(balance)).multipliedBy(
          primaryQuotePriceUsd,
        ),
        healthMetrics: {
          initial: removeDecimals(healthMetrics.initial),
          maintenance: removeDecimals(healthMetrics.maintenance),
        },
      };
    });
  };

  const { data: mappedData } = useQuery({
    queryKey: lpBalancesQueryKey(currentSubaccount, dataUpdatedAt),
    queryFn,
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
