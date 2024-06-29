import {
  calcSubaccountLeverage,
  calcSubaccountMarginUsageFractions,
} from '@vertex-protocol/contracts';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { AnnotatedSubaccountSummary } from 'client/hooks/query/subaccount/annotateSubaccountSummary';
import { useCurrentSubaccountEstimatedSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountEstimatedSummary';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { useDebounceFalsy } from 'client/hooks/util/useDebounceFalsy';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { EmptyObject } from 'type-fest';

export interface UseEstimateSubaccountInfoChange<TAdditionalInfo> {
  current?: EstimatedSubaccountInfo<TAdditionalInfo>;
  estimated?: EstimatedSubaccountInfo<TAdditionalInfo>;
}

interface UseEstimatedSubaccountInfoChangeParams<TAdditionalInfo> {
  estimateStateTxs: SubaccountTx[];
  additionalInfoFactory?: AdditionalSubaccountInfoFactory<TAdditionalInfo>;
}

export interface EstimatedBaseSubaccountInfo {
  accountValueUsd: BigDecimal;
  // Max of 1
  marginUsageBounded: BigDecimal;
  //Max of 1
  liquidationRiskBounded: BigDecimal;
  // Min of 0
  fundsUntilLiquidationUsdBounded: BigDecimal;
  // Min of 0
  fundsAvailableUsdBounded: BigDecimal;
  leverage: BigDecimal;
}

export type EstimatedSubaccountInfo<TAdditionalInfo> =
  EstimatedBaseSubaccountInfo & TAdditionalInfo;

export type AdditionalSubaccountInfoFactory<TAdditionalInfo> = (
  summary: AnnotatedSubaccountSummary,
  isEstimate: boolean,
) => TAdditionalInfo;

/**
 * Estimates a change in subaccount info. additionalInfoFactory MUST be memoized in a `useCallback`
 * @param estimateStateTxs
 * @param additionalInfoFactory
 */
export function useEstimateSubaccountInfoChange<TAdditionalInfo = EmptyObject>({
  estimateStateTxs,
  additionalInfoFactory,
}: UseEstimatedSubaccountInfoChangeParams<TAdditionalInfo>): UseEstimateSubaccountInfoChange<TAdditionalInfo> {
  const { data: current } = useCurrentSubaccountSummary();
  const { data: estimated } = useCurrentSubaccountEstimatedSummary({
    estimateStateTxs,
  });

  const quotePriceUsd = usePrimaryQuotePriceUsd();

  const estimatedSubaccountInfo = useMemo(() => {
    // If there are no transactions, force this to be undefined to indicate that there is no change
    return !estimateStateTxs.length
      ? undefined
      : calcSubaccountInfo(
          estimated,
          quotePriceUsd,
          true,
          additionalInfoFactory,
        );
  }, [
    additionalInfoFactory,
    estimated,
    quotePriceUsd,
    estimateStateTxs.length,
  ]);

  // Debounce falsy values here to prevent "flashing" during estimated state change UI updates
  // when query data for new input is loading
  const debouncedEstimatedSubaccountInfo = useDebounceFalsy(
    estimatedSubaccountInfo,
  );

  return useMemo(() => {
    return {
      current: calcSubaccountInfo(
        current,
        quotePriceUsd,
        false,
        additionalInfoFactory,
      ),
      estimated: debouncedEstimatedSubaccountInfo,
    };
  }, [
    additionalInfoFactory,
    current,
    debouncedEstimatedSubaccountInfo,
    quotePriceUsd,
  ]);
}

function calcSubaccountInfo<TAdditionalInfo>(
  subaccountSummary: AnnotatedSubaccountSummary | undefined,
  quotePriceUsd: BigDecimal,
  isEstimate: boolean,
  additionalInfoFactory?: AdditionalSubaccountInfoFactory<TAdditionalInfo>,
): EstimatedSubaccountInfo<TAdditionalInfo> | undefined {
  if (!subaccountSummary) {
    return;
  }

  const marginUsageFractions =
    calcSubaccountMarginUsageFractions(subaccountSummary);

  return {
    accountValueUsd: removeDecimals(
      subaccountSummary.health.unweighted.health,
    ).multipliedBy(quotePriceUsd),
    fundsAvailableUsdBounded: removeDecimals(
      BigDecimal.max(0, subaccountSummary.health.initial.health),
    ).multipliedBy(quotePriceUsd),
    fundsUntilLiquidationUsdBounded: removeDecimals(
      BigDecimal.max(0, subaccountSummary.health.maintenance.health),
    ).multipliedBy(quotePriceUsd),
    leverage: calcSubaccountLeverage(subaccountSummary),
    marginUsageBounded: marginUsageFractions.initial,
    liquidationRiskBounded: marginUsageFractions.maintenance,
    // Force typecast here :(
    ...(additionalInfoFactory?.(subaccountSummary, isEstimate) ??
      ({} as TAdditionalInfo)),
  };
}
