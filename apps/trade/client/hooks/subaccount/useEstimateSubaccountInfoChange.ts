import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { AnnotatedSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/annotateSubaccountSummary';
import { useSubaccountEstimatedSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountEstimatedSummary';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { useDebounceFalsy } from 'client/hooks/util/useDebounceFalsy';
import {
  calcSubaccountLeverage,
  calcSubaccountMarginUsageFractions,
} from 'client/utils/calcs/subaccount/subaccountInfoCalcs';
import { useMemo } from 'react';
import { EmptyObject } from 'type-fest';

export interface UseEstimateSubaccountInfoChange<TAdditionalInfo> {
  current?: EstimatedSubaccountInfo<TAdditionalInfo>;
  estimated?: EstimatedSubaccountInfo<TAdditionalInfo>;
}

interface UseEstimatedSubaccountInfoChangeParams<TAdditionalInfo> {
  estimateStateTxs: SubaccountTx[];
  additionalInfoFactory?: AdditionalSubaccountInfoFactory<TAdditionalInfo>;
  subaccountName?: string;
}

export interface EstimatedBaseSubaccountInfo {
  accountValueUsd: BigDecimal;
  // Max of 1
  marginUsageBounded: BigDecimal;
  //Max of 1
  liquidationRiskBounded: BigDecimal;
  // Min of 0
  fundsUntilLiquidationBoundedUsd: BigDecimal;
  // Min of 0
  fundsAvailableBoundedUsd: BigDecimal;
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
 * @param subaccountName
 */
export function useEstimateSubaccountInfoChange<TAdditionalInfo = EmptyObject>({
  estimateStateTxs,
  additionalInfoFactory,
  subaccountName,
}: UseEstimatedSubaccountInfoChangeParams<TAdditionalInfo>): UseEstimateSubaccountInfoChange<TAdditionalInfo> {
  const { data: current } = useSubaccountSummary({ subaccountName });
  const { data: estimated } = useSubaccountEstimatedSummary({
    estimateStateTxs,
    subaccountName,
  });

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const estimatedSubaccountInfo = useMemo(() => {
    // If there are no transactions, force this to be undefined to indicate that there is no change
    return !estimateStateTxs.length
      ? undefined
      : calcSubaccountInfo(
          estimated,
          primaryQuotePriceUsd,
          true,
          additionalInfoFactory,
        );
  }, [
    additionalInfoFactory,
    estimated,
    primaryQuotePriceUsd,
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
        primaryQuotePriceUsd,
        false,
        additionalInfoFactory,
      ),
      estimated: debouncedEstimatedSubaccountInfo,
    };
  }, [
    additionalInfoFactory,
    current,
    debouncedEstimatedSubaccountInfo,
    primaryQuotePriceUsd,
  ]);
}

function calcSubaccountInfo<TAdditionalInfo>(
  subaccountSummary: AnnotatedSubaccountSummary | undefined,
  primaryQuotePriceUsd: BigDecimal,
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
    ).multipliedBy(primaryQuotePriceUsd),
    fundsAvailableBoundedUsd: removeDecimals(
      BigDecimal.max(0, subaccountSummary.health.initial.health),
    ).multipliedBy(primaryQuotePriceUsd),
    fundsUntilLiquidationBoundedUsd: removeDecimals(
      BigDecimal.max(0, subaccountSummary.health.maintenance.health),
    ).multipliedBy(primaryQuotePriceUsd),
    leverage: calcSubaccountLeverage(subaccountSummary),
    marginUsageBounded: marginUsageFractions.initial,
    liquidationRiskBounded: marginUsageFractions.maintenance,
    // Force typecast here :(
    ...(additionalInfoFactory?.(subaccountSummary, isEstimate) ??
      ({} as TAdditionalInfo)),
  };
}
