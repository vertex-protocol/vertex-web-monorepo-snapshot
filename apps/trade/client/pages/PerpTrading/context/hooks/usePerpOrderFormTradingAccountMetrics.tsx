import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { PerpStaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import {
  AdditionalSubaccountInfoFactory,
  EstimatedSubaccountInfo,
  useEstimateSubaccountInfoChange,
} from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { useCallback, useMemo } from 'react';

interface AdditionalSubaccountInfo {
  positionAmount: BigDecimal;
}

interface TradeMetrics {
  fundsAvailable: BigDecimal | undefined;
  cost: BigDecimal | undefined;
}

export interface OrderFormPerpTradingAccountMetrics {
  derivedMetrics: TradeMetrics;
  currentState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
  estimatedState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
}

interface Params {
  currentMarket: PerpStaticMarketData | undefined;
  estimateStateTxs: SubaccountTx[];
}

export function usePerpOrderFormTradingAccountMetrics({
  currentMarket,
  estimateStateTxs,
}: Params): OrderFormPerpTradingAccountMetrics {
  const additionalInfoFactory = useCallback<
    AdditionalSubaccountInfoFactory<AdditionalSubaccountInfo>
  >(
    (summary): AdditionalSubaccountInfo => {
      const positionAmount = summary?.balances.find(
        (product) => product.productId === currentMarket?.productId,
      )?.amount;

      if (!currentMarket || !positionAmount) {
        return {
          positionAmount: BigDecimals.ZERO,
        };
      }

      return {
        positionAmount: removeDecimals(positionAmount),
      };
    },
    [currentMarket],
  );

  // State change
  const { current: currentState, estimated: estimatedState } =
    useEstimateSubaccountInfoChange({
      estimateStateTxs,
      additionalInfoFactory,
    });

  // Derived metrics
  const derivedMetrics = useMemo((): TradeMetrics => {
    return {
      fundsAvailable: currentState?.fundsAvailableUsdBounded,
      // Cost is the decrease in funds available from the order
      cost: currentState
        ? estimatedState?.fundsAvailableUsdBounded
            .minus(currentState.fundsAvailableUsdBounded)
            .negated()
        : undefined,
    };
  }, [currentState, estimatedState?.fundsAvailableUsdBounded]);

  return useMemo(
    () => ({ derivedMetrics, currentState, estimatedState }),
    [currentState, derivedMetrics, estimatedState],
  );
}
