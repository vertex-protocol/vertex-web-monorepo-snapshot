import { BalanceSide } from '@vertex-protocol/contracts';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  addDecimals,
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
} from '@vertex-protocol/metadata';
import { useCallback, useMemo } from 'react';

interface AdditionalSubaccountInfo {
  assetBalance: BigDecimal | undefined;
  quoteBalance: BigDecimal | undefined;
}

interface TradeMetrics {
  amountToBorrow: BigDecimal | undefined;
  borrowAssetSymbol: string | undefined;
}

export interface SpotTradingFormTradingAccountMetrics {
  derivedMetrics: TradeMetrics;
  currentState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
  estimatedState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
}

interface Params {
  currentMarket: SpotStaticMarketData | undefined;
  quoteMetadata: StaticMarketQuoteData | undefined;
  orderSide: BalanceSide;
  enableMaxSizeLogic: boolean;
  validatedAssetAmountInput: BigDecimal | undefined;
  executionConversionPrice: BigDecimal | undefined;
  maxAssetOrderSize: BigDecimal | undefined;
}

export function useSpotTradingFormAccountMetrics({
  currentMarket,
  quoteMetadata,
  orderSide,
  validatedAssetAmountInput,
  executionConversionPrice,
  enableMaxSizeLogic,
  maxAssetOrderSize,
}: Params): SpotTradingFormTradingAccountMetrics {
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    const productId = currentMarket?.productId;
    const quoteProductId = quoteMetadata?.productId;
    const invalidOrderSize =
      enableMaxSizeLogic &&
      maxAssetOrderSize &&
      validatedAssetAmountInput?.isGreaterThan(maxAssetOrderSize);

    if (
      !productId ||
      // We can't do !quoteProductId because it can be 0
      quoteProductId == null ||
      !validatedAssetAmountInput ||
      !executionConversionPrice ||
      invalidOrderSize
    ) {
      return [];
    }

    const assetAmountDelta = addDecimals(
      orderSide === 'long'
        ? validatedAssetAmountInput
        : validatedAssetAmountInput.negated(),
    );
    const quoteAmountDelta = assetAmountDelta
      .multipliedBy(executionConversionPrice)
      .negated();

    return [
      {
        type: 'apply_delta',
        tx: {
          productId: quoteProductId,
          amountDelta: quoteAmountDelta,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
      {
        type: 'apply_delta',
        tx: {
          productId: productId,
          amountDelta: assetAmountDelta,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [
    currentMarket?.productId,
    quoteMetadata?.productId,
    enableMaxSizeLogic,
    maxAssetOrderSize,
    validatedAssetAmountInput,
    executionConversionPrice,
    orderSide,
  ]);

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
          assetBalance: undefined,
          quoteBalance: undefined,
        };
      }

      return {
        assetBalance: removeDecimals(balance.amount),
        quoteBalance: removeDecimals(quoteBalance.amount),
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
      if (
        !currentMarket ||
        !currentState?.quoteBalance ||
        !currentState?.assetBalance ||
        !estimatedState?.quoteBalance ||
        !estimatedState?.assetBalance
      ) {
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
