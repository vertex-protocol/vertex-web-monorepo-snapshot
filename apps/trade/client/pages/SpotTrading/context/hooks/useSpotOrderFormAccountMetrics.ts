import { BalanceSide } from '@vertex-protocol/contracts';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import {
  SpotStaticMarketData,
  StaticMarketQuoteData,
} from 'client/hooks/markets/useAllMarketsStaticData';
import {
  AdditionalSubaccountInfoFactory,
  EstimatedSubaccountInfo,
  useEstimateSubaccountInfoChange,
} from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import {
  AnnotatedBalanceWithProduct,
  AnnotatedSpotBalanceWithProduct,
} from 'common/productMetadata/types';
import { useCallback, useMemo } from 'react';

interface AdditionalSubaccountInfo {
  assetBalance: BigDecimal;
  quoteBalance: BigDecimal;
}

interface TradeMetrics {
  amountToBorrow: BigDecimal | undefined;
  borrowAssetSymbol: string | undefined;
}

export interface SpotOrderFormTradingAccountMetrics {
  derivedMetrics: TradeMetrics;
  currentState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
  estimatedState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
}

interface Params {
  estimateStateTxs: SubaccountTx[];
  currentMarket: SpotStaticMarketData | undefined;
  quoteMetadata: StaticMarketQuoteData | undefined;
  orderSide: BalanceSide;
}

export function useSpotOrderFormAccountMetrics({
  estimateStateTxs,
  currentMarket,
  quoteMetadata,
  orderSide,
}: Params): SpotOrderFormTradingAccountMetrics {
  const additionalInfoFactory = useCallback<
    AdditionalSubaccountInfoFactory<AdditionalSubaccountInfo>
  >(
    (summary): AdditionalSubaccountInfo => {
      const balance = summary.balances.find(
        (b: AnnotatedBalanceWithProduct) =>
          b.productId === currentMarket?.productId,
      ) as AnnotatedSpotBalanceWithProduct;
      const quoteBalance = summary.balances.find(
        (b: AnnotatedBalanceWithProduct) =>
          b.productId === quoteMetadata?.productId,
      ) as AnnotatedSpotBalanceWithProduct;

      if (!currentMarket || !balance || !quoteBalance) {
        return {
          assetBalance: BigDecimals.ZERO,
          quoteBalance: BigDecimals.ZERO,
        };
      }

      return {
        assetBalance: balance
          ? removeDecimals(balance.amount)
          : BigDecimals.ZERO,
        quoteBalance: balance
          ? removeDecimals(quoteBalance.amount)
          : BigDecimals.ZERO,
      };
    },
    [currentMarket, quoteMetadata?.productId],
  );

  // State change
  const { current: currentState, estimated: estimatedState } =
    useEstimateSubaccountInfoChange({
      estimateStateTxs,
      additionalInfoFactory,
    });

  // Derived metrics
  const derivedMetrics = useMemo((): TradeMetrics => {
    const infoChangeMetrics = (() => {
      if (!currentState || !estimatedState || !currentMarket) {
        return;
      }

      const estimatedBalance =
        orderSide === 'long'
          ? estimatedState.quoteBalance
          : estimatedState.assetBalance;
      const currentBalance =
        orderSide === 'long'
          ? currentState.quoteBalance
          : currentState.assetBalance;
      // -(new borrowed amount - old borrowed amount)
      // Example, if new balance is -10, old balance is 2, amount to borrow is 8
      const newBorrowedAmount = BigDecimal.min(estimatedBalance, 0);
      const currentBorrowedAmount = BigDecimal.min(currentBalance, 0);
      const amountToBorrow = newBorrowedAmount
        .minus(currentBorrowedAmount)
        .negated();

      return {
        amountToBorrow,
      };
    })();

    return {
      amountToBorrow: infoChangeMetrics?.amountToBorrow,
      borrowAssetSymbol:
        orderSide === 'long'
          ? quoteMetadata?.symbol
          : currentMarket?.metadata.token.symbol,
    };
  }, [
    currentMarket,
    currentState,
    estimatedState,
    orderSide,
    quoteMetadata?.symbol,
  ]);

  return useMemo(
    () => ({ derivedMetrics, currentState, estimatedState }),
    [currentState, derivedMetrics, estimatedState],
  );
}
