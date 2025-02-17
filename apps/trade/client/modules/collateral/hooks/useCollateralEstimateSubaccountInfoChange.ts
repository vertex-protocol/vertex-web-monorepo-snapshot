import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import {
  AdditionalSubaccountInfoFactory,
  EstimatedBaseSubaccountInfo,
  useEstimateSubaccountInfoChange,
} from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { first } from 'lodash';
import { useCallback } from 'react';

interface Params {
  productId: number | undefined;
  estimateStateTxs: SubaccountTx[];
  subaccountName?: string;
}

// Partial<EstimatedBaseSubaccountInfo> is used to override the default behavior of useEstimateSubaccountInfoChange when needed
// See below comment for details
export interface CollateralAdditionalSubaccountInfo
  extends Partial<EstimatedBaseSubaccountInfo> {
  vertexBalance: BigDecimal | undefined;
  borrowedAmount: BigDecimal | undefined;
  borrowedValueUsd: BigDecimal | undefined;
}

export function useCollateralEstimateSubaccountInfoChange({
  productId,
  estimateStateTxs,
  subaccountName,
}: Params) {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const additionalInfoFactory = useCallback<
    AdditionalSubaccountInfoFactory<CollateralAdditionalSubaccountInfo>
  >(
    (summary, isEstimate) => {
      const balance = summary?.balances.find(
        (product) => product.productId === productId,
      );
      if (productId == null || !balance) {
        return {
          vertexBalance: undefined,
          borrowedAmount: undefined,
          borrowedValueUsd: undefined,
        };
      }

      // This is a bit of a hack, but if the subaccount does NOT exist, then the estimateStateTxs is never applied
      // This is only relevant when first depositing to a subaccount, so we add some logic to mimic the behavior of the backend call
      const shouldUseManualEstimate = !summary.exists && isEstimate;

      const newBalanceAmountWithDecimals = (() => {
        if (!shouldUseManualEstimate) {
          return balance.amount;
        }

        // Collateral should only have 1 tx
        const tx = first(estimateStateTxs);

        // If subaccount doesn't exist, assume amount of the tx is the new balance
        return tx?.type === 'apply_delta' ? tx.tx.amountDelta : balance.amount;
      })();

      const vertexBalance = removeDecimals(newBalanceAmountWithDecimals);
      const borrowedAmount = BigDecimal.min(
        vertexBalance,
        BigDecimals.ZERO,
      ).abs();
      const oraclePriceUsd =
        balance.oraclePrice.multipliedBy(primaryQuotePriceUsd);

      // Override base subaccount info assuming that the new balance is the only balance that the user has
      const baseSubaccountInfo = ((): Partial<EstimatedBaseSubaccountInfo> => {
        if (!shouldUseManualEstimate) {
          return {};
        }

        const balanceValueUsd = vertexBalance.multipliedBy(oraclePriceUsd);
        const weights = getHealthWeights(vertexBalance, balance);

        return {
          accountValueUsd: balanceValueUsd,
          // Everything below assumes that the subaccount is depositing - other operations (ex. withdrawal) aren't valid anyway
          fundsAvailableUsdBounded: balanceValueUsd.multipliedBy(
            weights.initial,
          ),
          fundsUntilLiquidationUsdBounded: balanceValueUsd.multipliedBy(
            weights.maintenance,
          ),
          leverage: BigDecimals.ZERO,
          liquidationRiskBounded: BigDecimals.ZERO,
          marginUsageBounded: BigDecimals.ZERO,
        };
      })();

      return {
        vertexBalance,
        borrowedAmount,
        borrowedValueUsd: borrowedAmount.multipliedBy(oraclePriceUsd),
        ...baseSubaccountInfo,
      };
    },
    [estimateStateTxs, productId, primaryQuotePriceUsd],
  );

  return useEstimateSubaccountInfoChange({
    estimateStateTxs,
    additionalInfoFactory,
    subaccountName,
  });
}
