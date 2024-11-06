import { BalanceSide, SubaccountTx } from '@vertex-protocol/client';
import { AnnotatedPerpBalanceWithProduct } from '@vertex-protocol/metadata';
import {
  addDecimals,
  BigDecimal,
  removeDecimals,
} from '@vertex-protocol/utils';
import { PerpStaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import {
  AdditionalSubaccountInfoFactory,
  EstimatedSubaccountInfo,
  useEstimateSubaccountInfoChange,
} from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { calcEstimatedLiquidationPrice } from 'client/utils/calcs/calcEstimatedLiquidationPrice';
import { useCallback, useMemo } from 'react';

interface AdditionalSubaccountInfo {
  positionAmount: BigDecimal | undefined;
  estimatedLiquidationPrice: BigDecimal | null | undefined;
}

interface TradeMetrics {
  fundsAvailableUsd: BigDecimal | undefined;
  costUsd: BigDecimal | undefined;
}

export interface TradingFormPerpTradingAccountMetrics {
  derivedMetrics: TradeMetrics;
  currentState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
  estimatedState: EstimatedSubaccountInfo<AdditionalSubaccountInfo> | undefined;
}

interface Params {
  orderSide: BalanceSide;
  enableMaxSizeLogic: boolean;
  validatedAssetAmountInput: BigDecimal | undefined;
  executionConversionPrice: BigDecimal | undefined;
  maxAssetOrderSize: BigDecimal | undefined;
  currentMarket: PerpStaticMarketData | undefined;
}

export function usePerpTradingFormTradingAccountMetrics({
  currentMarket,
  orderSide,
  validatedAssetAmountInput,
  executionConversionPrice,
  maxAssetOrderSize,
  enableMaxSizeLogic,
}: Params): TradingFormPerpTradingAccountMetrics {
  // Estimate state transactions
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    const invalidOrderSize =
      enableMaxSizeLogic &&
      maxAssetOrderSize &&
      validatedAssetAmountInput?.isGreaterThan(maxAssetOrderSize);

    if (
      !currentMarket?.productId ||
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
          productId: currentMarket.productId,
          amountDelta: assetAmountDelta,
          vQuoteDelta: quoteAmountDelta,
        },
      },
    ];
  }, [
    enableMaxSizeLogic,
    maxAssetOrderSize,
    validatedAssetAmountInput,
    currentMarket?.productId,
    executionConversionPrice,
    orderSide,
  ]);

  const additionalInfoFactory = useCallback<
    AdditionalSubaccountInfoFactory<AdditionalSubaccountInfo>
  >(
    (summary): AdditionalSubaccountInfo => {
      const balanceWithProduct = summary?.balances.find(
        (product) => product.productId === currentMarket?.productId,
      ) as AnnotatedPerpBalanceWithProduct | undefined;

      if (!balanceWithProduct) {
        return {
          positionAmount: undefined,
          estimatedLiquidationPrice: undefined,
        };
      }

      return {
        positionAmount: removeDecimals(balanceWithProduct?.amount),
        estimatedLiquidationPrice: calcEstimatedLiquidationPrice(
          balanceWithProduct,
          summary.health.maintenance.health,
        ),
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
      fundsAvailableUsd: currentState?.fundsAvailableUsdBounded,
      // Cost is the decrease in funds available from the order
      costUsd: currentState
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
