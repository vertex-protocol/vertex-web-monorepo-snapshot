import { BigDecimal } from '@vertex-protocol/client';
import { useHealthGroups } from 'client/hooks/query/markets/useHealthGroups';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import {
  calcSpreadBasisAmount,
  calcSpreadHealthIncrease,
  InitialMaintMetrics,
} from 'client/utils/calcs/healthCalcs';
import { removeDecimals } from '@vertex-protocol/utils';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import {
  AnnotatedPerpBalanceWithProduct,
  AnnotatedSpotBalanceWithProduct,
  SpotProductMetadata,
} from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface SpreadBalanceItem {
  spotProductId: number;
  perpProductId: number;
  spotMetadata: SpotProductMetadata;
  basisAmount: BigDecimal;
  healthIncreaseMetrics: InitialMaintMetrics;
}

export function useSpreadBalances() {
  const { data: healthGroups, isLoading: healthGroupsLoading } =
    useHealthGroups();
  const {
    data: summaryData,
    isError: summaryError,
    isLoading: summaryLoading,
  } = useCurrentSubaccountSummary();

  const mappedData: SpreadBalanceItem[] | undefined = useMemo(() => {
    if (!healthGroups) {
      return;
    }

    return healthGroups?.healthGroups
      .map((healthGroup) => {
        const spotBalance = summaryData?.balances?.find(
          (balance) => balance.productId === healthGroup.spotProductId,
        ) as AnnotatedSpotBalanceWithProduct;

        const perpBalance = summaryData?.balances?.find(
          (position) => position.productId === healthGroup.perpProductId,
        ) as AnnotatedPerpBalanceWithProduct;

        if (!spotBalance || !perpBalance) {
          return;
        }

        const healthIncreaseMetrics = calcSpreadHealthIncrease(
          spotBalance,
          perpBalance,
        );

        const basisAmount = calcSpreadBasisAmount(
          spotBalance.amount,
          perpBalance.amount,
        );

        return {
          spotProductId: spotBalance.productId,
          perpProductId: perpBalance.productId,
          spotMetadata: spotBalance.metadata,
          basisAmount: removeDecimals(basisAmount),
          healthIncreaseMetrics: {
            initial: removeDecimals(healthIncreaseMetrics.initial),
            maintenance: removeDecimals(healthIncreaseMetrics.maintenance),
          },
        };
      })
      .filter(nonNullFilter);
  }, [healthGroups, summaryData?.balances]);

  return {
    data: mappedData,
    isLoading: summaryLoading || healthGroupsLoading,
    isError: summaryError,
  };
}
