import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useMemo } from 'react';
import { MarginWeightMetrics } from '../../types';

export interface MarginManagerPerpPositionsTableItem {
  productId: number;
  marketInfo: MarketInfoCellData;
  estimatedPnlUsd: BigDecimal;
  unsettledQuoteAmount: BigDecimal;
  notionalValueUsd: BigDecimal;
  positionAmount: BigDecimal;
  initialHealth: MarginWeightMetrics;
  maintenanceHealth: MarginWeightMetrics;
}

export function useMarginManagerPerpPositionsTable() {
  const { data: perpBalances, isLoading: perpBalancesLoading } =
    usePerpPositions();
  const { data: marketsStaticData, isLoading: marketsStaticDataLoading } =
    useAllMarketsStaticData();

  const quotePrice = useQuotePriceUsd();

  const mappedData: MarginManagerPerpPositionsTableItem[] | undefined =
    useMemo(() => {
      if (!perpBalances || !marketsStaticData) {
        return;
      }
      return perpBalances
        .map((position): MarginManagerPerpPositionsTableItem | undefined => {
          const marketStaticData = marketsStaticData?.perp[position.productId];

          // return if no market static data or position amount is zero
          if (!marketStaticData || position.amount.isZero()) {
            return;
          }

          const healthWeights = getHealthWeights(
            position.amount,
            marketStaticData,
          );

          return {
            productId: position.productId,
            marketInfo: {
              ...position.metadata,
              amountForSide: position.amount,
              productType: ProductEngineType.PERP,
              priceIncrement: marketStaticData.priceIncrement,
              sizeIncrement: marketStaticData.sizeIncrement,
            },
            positionAmount: position.amount,
            estimatedPnlUsd: position.estimatedPnlUsd,
            unsettledQuoteAmount: position.unsettledQuoteAmount,
            notionalValueUsd: position.notionalValueUsd,
            initialHealth: {
              marginUsd:
                position.healthMetrics.initial.multipliedBy(quotePrice),
              weight: healthWeights.initial,
            },
            maintenanceHealth: {
              marginUsd:
                position.healthMetrics.maintenance.multipliedBy(quotePrice),
              weight: healthWeights.maintenance,
            },
          };
        })
        .filter(nonNullFilter);
    }, [marketsStaticData, perpBalances, quotePrice]);

  return {
    positions: mappedData,
    isLoading: perpBalancesLoading || marketsStaticDataLoading,
  };
}
