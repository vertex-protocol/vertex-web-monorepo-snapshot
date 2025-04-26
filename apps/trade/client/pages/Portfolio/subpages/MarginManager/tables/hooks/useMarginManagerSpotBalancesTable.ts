import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { SpotProductMetadata } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { useMemo } from 'react';

export interface MarginManagerSpotBalanceTableItem {
  productId: number;
  metadata: SpotProductMetadata;
  balanceAmount: BigDecimal;
  balanceValueUsd: BigDecimal;
  initialHealth: MarginWeightMetrics;
  maintenanceHealth: MarginWeightMetrics;
}

export function useMarginManagerSpotBalancesTable() {
  const { balances: spotBalances, isLoading: spotBalancesLoading } =
    useSpotBalances();
  const { data: marketsStaticData, isLoading: marketStaticDataLoading } =
    useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData: MarginManagerSpotBalanceTableItem[] | undefined =
    useMemo(() => {
      if (!spotBalances || !marketsStaticData) {
        return;
      }

      return spotBalances
        .map((balance) => {
          const marketStaticData =
            getStaticMarketDataForProductId<SpotStaticMarketData>(
              balance.productId,
              marketsStaticData,
            );

          // return if no market static data or if it's quote product or balance amount is 0
          if (
            !marketStaticData ||
            balance.productId === QUOTE_PRODUCT_ID ||
            balance.amount.isZero()
          ) {
            return;
          }

          const healthWeights = getHealthWeights(
            balance.amount,
            marketStaticData,
          );

          return {
            productId: balance.productId,
            metadata: balance.metadata,
            balanceAmount: balance.amount,
            balanceValueUsd: balance.amount.multipliedBy(
              balance.oraclePriceUsd,
            ),
            initialHealth: {
              marginUsd:
                balance.healthMetrics.initial.multipliedBy(
                  primaryQuotePriceUsd,
                ),
              weight: healthWeights.initial,
            },
            maintenanceHealth: {
              marginUsd:
                balance.healthMetrics.maintenance.multipliedBy(
                  primaryQuotePriceUsd,
                ),
              weight: healthWeights.maintenance,
            },
          };
        })
        .filter(nonNullFilter);
    }, [marketsStaticData, primaryQuotePriceUsd, spotBalances]);

  return {
    balances: mappedData,
    isLoading: spotBalancesLoading || marketStaticDataLoading,
  };
}
