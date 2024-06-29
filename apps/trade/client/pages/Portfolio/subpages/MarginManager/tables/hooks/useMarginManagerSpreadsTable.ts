import { BigDecimal } from '@vertex-protocol/client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useMemo } from 'react';
import { useSpreadBalances } from './useSpreadBalances';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { MarginWeightMetrics } from '../../types';
import { SpotProductMetadata } from 'common/productMetadata/types';

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

  const quotePrice = usePrimaryQuotePriceUsd();

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
              spread.healthIncreaseMetrics.initial.multipliedBy(quotePrice),
            weight: healthWeights.initial,
          },
          maintenanceHealth: {
            marginUsd:
              spread.healthIncreaseMetrics.maintenance.multipliedBy(quotePrice),
            weight: healthWeights.maintenance,
          },
        };
      })
      .filter(nonNullFilter);
  }, [marketsStaticData, quotePrice, spreadBalances]);

  return {
    data: mappedData,
    isLoading: spreadBalancesLoading || marketStaticDataLoading,
  };
}
