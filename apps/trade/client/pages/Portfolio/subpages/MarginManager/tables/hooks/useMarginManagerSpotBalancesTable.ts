import { useMemo } from 'react';
import { BigDecimal } from '@vertex-protocol/utils';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { MarginWeightMetrics } from '../../types';

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
  const quotePrice = useQuotePriceUsd();

  const mappedData: MarginManagerSpotBalanceTableItem[] | undefined =
    useMemo(() => {
      if (!spotBalances || !marketsStaticData) {
        return;
      }

      return spotBalances
        .map((balance) => {
          const marketStaticData = marketsStaticData?.spot[balance.productId];

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
              marginUsd: balance.healthMetrics.initial.multipliedBy(quotePrice),
              weight: healthWeights.initial,
            },
            maintenanceHealth: {
              marginUsd:
                balance.healthMetrics.maintenance.multipliedBy(quotePrice),
              weight: healthWeights.maintenance,
            },
          };
        })

        .filter(nonNullFilter);
    }, [marketsStaticData, quotePrice, spotBalances]);

  return {
    balances: mappedData,
    isLoading: spotBalancesLoading || marketStaticDataLoading,
  };
}
