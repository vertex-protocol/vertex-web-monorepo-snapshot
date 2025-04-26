import {
  BalanceSide,
  QUOTE_PRODUCT_ID,
  SubaccountTx,
} from '@vertex-protocol/client';
import { AnnotatedPerpBalanceWithProduct } from '@vertex-protocol/react-client';
import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useSubaccountIsolatedPositions } from 'client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions';

import {
  AdditionalSubaccountInfoFactory,
  EstimatedSubaccountInfo,
  useEstimateSubaccountInfoChange,
} from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/perp/calcIsoPositionNetMargin';
import {
  calcEstimatedLiquidationPrice,
  calcEstimatedLiquidationPriceFromBalance,
} from 'client/utils/calcs/perp/liquidationPriceCalcs';
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
  isReducingIsoPosition: boolean;
  marginMode: MarginMode;
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
  marginMode,
  isReducingIsoPosition,
}: Params): TradingFormPerpTradingAccountMetrics {
  const { data: isolatedPositions } = useSubaccountIsolatedPositions();

  const amountDeltasWithDecimals = useMemo(() => {
    const isInvalidOrderSize =
      enableMaxSizeLogic &&
      maxAssetOrderSize &&
      validatedAssetAmountInput?.isGreaterThan(maxAssetOrderSize);

    if (
      isInvalidOrderSize ||
      !validatedAssetAmountInput ||
      !executionConversionPrice
    ) {
      return;
    }

    const assetAmountDelta = addDecimals(
      orderSide === 'long'
        ? validatedAssetAmountInput
        : validatedAssetAmountInput.negated(),
    );

    const vQuoteDelta = assetAmountDelta
      .multipliedBy(executionConversionPrice)
      .negated();

    // The delta on the isolated position's net margin
    // Does not account for fully closing the position (where net margin is all transferred out) because it doesn't affect any computed metrics
    const isoNetMarginAmountDelta = (() => {
      // Zero margin transfer when reducing position
      if (marginMode.mode !== 'isolated' || isReducingIsoPosition) {
        return BigDecimals.ZERO;
      }

      return assetAmountDelta
        .multipliedBy(executionConversionPrice)
        .abs()
        .div(marginMode.leverage);
    })();

    // The quote balance delta for the cross margin balance
    const isoCrossQuoteAmountDelta = (() => {
      const existingIsolatedPosition = isolatedPositions?.find((position) => {
        return position.baseBalance.productId === currentMarket?.productId;
      });

      if (isReducingIsoPosition) {
        const newPositionAmount =
          existingIsolatedPosition?.baseBalance.amount.plus(assetAmountDelta);

        // If new position amount is zero, we are closing the position, and net margin (ie total margin + unsettled margin) is transferred to cross
        // Otherwise, when reducing position, there is no margin transfer
        return existingIsolatedPosition && newPositionAmount?.isZero()
          ? calcIsoPositionNetMargin(
              existingIsolatedPosition.baseBalance,
              existingIsolatedPosition.quoteBalance,
            )
          : BigDecimals.ZERO;
      }

      // When increasing a position, the cross subaccount decreases in quote balance as the balance is transferred to the iso subaccount
      return isoNetMarginAmountDelta.negated();
    })();

    return {
      assetAmountDelta,
      vQuoteDelta,
      isoNetMarginAmountDelta,
      isoCrossQuoteAmountDelta,
    };
  }, [
    currentMarket?.productId,
    enableMaxSizeLogic,
    executionConversionPrice,
    isReducingIsoPosition,
    isolatedPositions,
    marginMode.leverage,
    marginMode.mode,
    maxAssetOrderSize,
    orderSide,
    validatedAssetAmountInput,
  ]);

  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    if (!currentMarket?.productId || !amountDeltasWithDecimals) {
      return [];
    }

    // For cross, we apply a delta on the perp product
    if (marginMode.mode === 'cross') {
      return [
        {
          type: 'apply_delta',
          tx: {
            productId: currentMarket.productId,
            amountDelta: amountDeltasWithDecimals.assetAmountDelta,
            vQuoteDelta: amountDeltasWithDecimals.vQuoteDelta,
          },
        },
      ];
    }
    // For iso, only the cross quote balance changes
    return [
      {
        type: 'apply_delta',
        tx: {
          productId: QUOTE_PRODUCT_ID,
          amountDelta: amountDeltasWithDecimals.isoCrossQuoteAmountDelta,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [currentMarket?.productId, amountDeltasWithDecimals, marginMode.mode]);

  const additionalInfoFactory = useCallback<
    AdditionalSubaccountInfoFactory<AdditionalSubaccountInfo>
  >(
    (summary, isEstimate): AdditionalSubaccountInfo => {
      const crossBalanceWithProduct = summary?.balances.find(
        (product) => product.productId === currentMarket?.productId,
      ) as AnnotatedPerpBalanceWithProduct | undefined;

      // The cross balance should always exist, even if its 0
      if (!crossBalanceWithProduct) {
        return {
          positionAmount: undefined,
          estimatedLiquidationPrice: undefined,
        };
      }

      // For cross, we can use the estimated summary directly
      if (marginMode.mode === 'cross') {
        if (!crossBalanceWithProduct) {
          return {
            positionAmount: undefined,
            estimatedLiquidationPrice: undefined,
          };
        }

        return {
          positionAmount: removeDecimals(crossBalanceWithProduct?.amount),
          estimatedLiquidationPrice: calcEstimatedLiquidationPriceFromBalance(
            crossBalanceWithProduct,
            summary.health.maintenance.health,
          ),
        };
      }

      // For isolated, we do a bit of a hack, `AdditionalSubaccountInfoFactory` doesn't have the ability to estimate
      // changes in isolated positions, so we add stuff manually. This is OK for the time being because this hook
      // is the only place where this pattern is used.
      if (!isolatedPositions || !currentMarket) {
        return {
          positionAmount: undefined,
          estimatedLiquidationPrice: undefined,
        };
      }
      // Unlike cross, isolated positions do not exist if the amount is 0
      const existingIsolatedPosition = isolatedPositions.find((position) => {
        return position.baseBalance.productId === currentMarket.productId;
      });

      if (!isEstimate) {
        // For non-estimate, we use the existing isolated position
        return {
          positionAmount: removeDecimals(
            existingIsolatedPosition?.baseBalance.amount,
          ),
          estimatedLiquidationPrice: existingIsolatedPosition
            ? calcEstimatedLiquidationPrice({
                longWeightMaintenance:
                  crossBalanceWithProduct.longWeightMaintenance,
                maintHealth: existingIsolatedPosition.healths.maintenance,
                oraclePrice: crossBalanceWithProduct.oraclePrice,
                shortWeightMaintenance:
                  crossBalanceWithProduct.shortWeightMaintenance,
                amount: existingIsolatedPosition.baseBalance.amount,
              })
            : undefined,
        };
      }

      // We require deltas to be present for estimates
      if (!amountDeltasWithDecimals) {
        return {
          positionAmount: undefined,
          estimatedLiquidationPrice: undefined,
        };
      }

      const currentPositionAmount =
        existingIsolatedPosition?.baseBalance.amount ?? BigDecimals.ZERO;
      const newPositionAmount = currentPositionAmount.plus(
        amountDeltasWithDecimals.assetAmountDelta,
      );

      const currentMaintHealth =
        existingIsolatedPosition?.healths.maintenance ?? BigDecimals.ZERO;
      // Maintenance health = weight * amount * oracle_price + v_quote + quote_margin
      const maintWeight = getHealthWeights(
        // Cannot switch sides for iso, so both current position & new position should be on the same side
        // However, current position can be zero (ie. opening a new position) and new position can be zero (ie. closing a position), but they cannot be both zero
        currentPositionAmount.isZero()
          ? newPositionAmount
          : currentPositionAmount,
        crossBalanceWithProduct,
      ).maintenance;
      const maintHealthDelta = maintWeight
        .multipliedBy(amountDeltasWithDecimals.assetAmountDelta)
        .multipliedBy(crossBalanceWithProduct.oraclePrice)
        .plus(amountDeltasWithDecimals.vQuoteDelta)
        .plus(amountDeltasWithDecimals.isoNetMarginAmountDelta);
      const newMaintHealth = currentMaintHealth.plus(maintHealthDelta);

      return {
        positionAmount: removeDecimals(newPositionAmount),
        estimatedLiquidationPrice: calcEstimatedLiquidationPrice({
          longWeightMaintenance: crossBalanceWithProduct.longWeightMaintenance,
          maintHealth: newMaintHealth,
          oraclePrice: crossBalanceWithProduct.oraclePrice,
          shortWeightMaintenance:
            crossBalanceWithProduct.shortWeightMaintenance,
          amount: newPositionAmount,
        }),
      };
    },
    [
      marginMode.mode,
      isolatedPositions,
      currentMarket,
      amountDeltasWithDecimals,
    ],
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
      fundsAvailableUsd: currentState?.fundsAvailableBoundedUsd,
      // Cost is the decrease in funds available from the order
      costUsd: currentState
        ? estimatedState?.fundsAvailableBoundedUsd
            .minus(currentState.fundsAvailableBoundedUsd)
            .negated()
        : undefined,
    };
  }, [currentState, estimatedState?.fundsAvailableBoundedUsd]);

  return { derivedMetrics, currentState, estimatedState };
}
