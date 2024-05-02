import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  calcLpBalanceValue,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { BigDecimals } from 'client/utils/BigDecimals';
import {
  calcLpBalanceHealth,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from 'common/productMetadata/types';

import { useCurrentSubaccountSummary } from '../query/subaccount/useCurrentSubaccountSummary';

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

function lpBalancesQueryKey(lastUpdated: number) {
  return createQueryKey('lpBalances', lastUpdated);
}

export function useLpBalances(): UseLpBalances {
  const {
    data: summaryData,
    isError: summaryError,
    isLoading: summaryLoading,
    dataUpdatedAt,
  } = useCurrentSubaccountSummary();
  const quotePrice = useQuotePriceUsd();

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
        oraclePriceUsd: balance?.oraclePrice.multipliedBy(quotePrice),
        lpAmount: decimalAdjustedLpAmount,
        underlyingAmount: removeDecimals(balance.amount),
        amountBase: removeDecimals(
          balance.totalLpBaseAmount.multipliedBy(shareOfPool),
        ),
        amountQuote: removeDecimals(
          balance.totalLpQuoteAmount.multipliedBy(shareOfPool),
        ),
        lpValueUsd: removeDecimals(calcLpBalanceValue(balance)).multipliedBy(
          quotePrice,
        ),
        healthMetrics: {
          initial: removeDecimals(healthMetrics.initial),
          maintenance: removeDecimals(healthMetrics.maintenance),
        },
      };
    });
  };

  const { data: mappedData } = useQuery({
    queryKey: lpBalancesQueryKey(dataUpdatedAt),
    queryFn,
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
