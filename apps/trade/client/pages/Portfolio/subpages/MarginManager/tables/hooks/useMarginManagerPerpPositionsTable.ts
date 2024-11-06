import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useMemo } from 'react';

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
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData: MarginManagerPerpPositionsTableItem[] | undefined =
    useMemo(() => {
      if (!perpBalances || !marketsStaticData) {
        return;
      }

      return perpBalances
        .map((position): MarginManagerPerpPositionsTableItem | undefined => {
          const perpMarketData = marketsStaticData.perp[position.productId];

          // return if no market data or position amount is zero
          if (!perpMarketData || position.amount.isZero()) {
            return;
          }

          const healthWeights = getHealthWeights(
            position.amount,
            perpMarketData,
          );

          return {
            productId: position.productId,
            marketInfo: {
              ...position.metadata,
              // Perps are always quoted in the primary quote token
              quoteSymbol: primaryQuoteSymbol,
              isPrimaryQuote: true,
              amountForSide: position.amount,
              productType: ProductEngineType.PERP,
              priceIncrement: perpMarketData.priceIncrement,
              sizeIncrement: perpMarketData.sizeIncrement,
            },
            positionAmount: position.amount,
            estimatedPnlUsd: position.estimatedPnlUsd,
            unsettledQuoteAmount: position.unsettledQuoteAmount,
            notionalValueUsd: position.notionalValueUsd,
            initialHealth: {
              marginUsd:
                position.healthMetrics.initial.multipliedBy(
                  primaryQuotePriceUsd,
                ),
              weight: healthWeights.initial,
            },
            maintenanceHealth: {
              marginUsd:
                position.healthMetrics.maintenance.multipliedBy(
                  primaryQuotePriceUsd,
                ),
              weight: healthWeights.maintenance,
            },
          };
        })
        .filter(nonNullFilter);
    }, [
      marketsStaticData,
      perpBalances,
      primaryQuoteSymbol,
      primaryQuotePriceUsd,
    ]);

  return {
    positions: mappedData,
    isLoading: perpBalancesLoading || marketsStaticDataLoading,
  };
}
