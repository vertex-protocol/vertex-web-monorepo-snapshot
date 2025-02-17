import { BigDecimal } from '@vertex-protocol/client';
import { SharedProductMetadata } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpreadBalances } from 'client/pages/Portfolio/subpages/MarginManager/tables/hooks/useSpreadBalances';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

export interface MarginManagerSpreadTableItem {
  spotProductId: number;
  perpProductId: number;
  // Uses the perp metadata. For something like the ETH-PERP & wETH spread, we want ETH as the symbol, not wETH
  productMetadata: SharedProductMetadata;
  spreadSize: BigDecimal;
  spotSpreadAmount: BigDecimal;
  perpSpreadAmount: BigDecimal;
  initialHealthBenefit: MarginWeightMetrics;
  maintenanceHealthBenefit: MarginWeightMetrics;
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
      .map((spread): MarginManagerSpreadTableItem | undefined => {
        const marketStaticData = marketsStaticData?.perp[spread.perpProductId];

        // return if no market static data or if basis amount is zero
        if (!marketStaticData || spread.basisAmount.isZero()) {
          return;
        }

        const spreadSize = spread.basisAmount.abs();

        const healthWeights = getHealthWeights(spreadSize, marketStaticData);

        return {
          spotProductId: spread.spotProductId,
          perpProductId: spread.perpProductId,
          productMetadata: marketStaticData.metadata,
          spreadSize,
          spotSpreadAmount: spread.basisAmount,
          perpSpreadAmount: spread.basisAmount.multipliedBy(-1),
          initialHealthBenefit: {
            marginUsd:
              spread.healthIncreaseMetrics.initial.multipliedBy(
                primaryQuotePriceUsd,
              ),
            weight: healthWeights.initial,
          },
          maintenanceHealthBenefit: {
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
