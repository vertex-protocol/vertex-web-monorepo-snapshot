import { BigDecimal } from '@vertex-protocol/client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpreadBalances } from 'client/pages/Portfolio/subpages/MarginManager/tables/hooks/useSpreadBalances';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { SpotProductMetadata } from '@vertex-protocol/metadata';
import { useMemo } from 'react';

export interface MarginManagerSpreadTableItem {
  spotProductId: number;
  perpProductId: number;
  spotMetadata: SpotProductMetadata;
  spreadSize: BigDecimal;
  spotSpreadAmount: BigDecimal;
  perpSpreadAmount: BigDecimal;
  initialHealth: MarginWeightMetrics;
  maintenanceHealth: MarginWeightMetrics;
}

export function useMarginManagerSpreadsTable() {
  const { data: spreadBalances, isLoading: spreadBalancesLoading } =
    useSpreadBalances();
  const { data: marketsStaticData, isLoading: marketStaticDataLoading } =
    useAllMarketsStaticData();

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData: MarginManagerSpreadTableItem[] | undefined = useMemo(() => {
    if (!spreadBalances || !marketsStaticData) {
      return;
    }

    return spreadBalances
      .map((spread) => {
        const marketStaticData = marketsStaticData?.spot[spread.spotProductId];

        // return if no market static data or if basis amount is zero
        if (!marketStaticData || spread.basisAmount.isZero()) {
          return;
        }

        const spreadSize = spread.basisAmount.abs();

        const healthWeights = getHealthWeights(spreadSize, marketStaticData);

        return {
          spotProductId: spread.spotProductId,
          perpProductId: spread.perpProductId,
          spotMetadata: spread.spotMetadata,
          spreadSize,
          spotSpreadAmount: spread.basisAmount,
          perpSpreadAmount: spread.basisAmount.multipliedBy(-1),
          initialHealth: {
            marginUsd:
              spread.healthIncreaseMetrics.initial.multipliedBy(
                primaryQuotePriceUsd,
              ),
            weight: healthWeights.initial,
          },
          maintenanceHealth: {
            marginUsd:
              spread.healthIncreaseMetrics.maintenance.multipliedBy(
                primaryQuotePriceUsd,
              ),
            weight: healthWeights.maintenance,
          },
        };
      })
      .filter(nonNullFilter);
  }, [marketsStaticData, primaryQuotePriceUsd, spreadBalances]);

  return {
    data: mappedData,
    isLoading: spreadBalancesLoading || marketStaticDataLoading,
  };
}
