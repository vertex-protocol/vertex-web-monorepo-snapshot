import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { BigDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useLpBalances } from 'client/hooks/subaccount/useLpBalances';
import { PairMetadata } from 'client/modules/pools/types';
import { MarginWeightMetrics } from 'client/pages/Portfolio/subpages/MarginManager/types';
import { QueryState } from 'client/types/QueryState';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

export interface MarginManagerPoolsTableItem {
  marketType: ProductEngineType;
  productId: number;
  metadata: PairMetadata;
  valueUsd: BigDecimal;
  amounts: {
    lpAmount: BigDecimal;
    baseAmount: BigDecimal;
    quoteAmount: BigDecimal;
  };
  initialHealth: MarginWeightMetrics;
  maintenanceHealth: MarginWeightMetrics;
}

export function useMarginManagerPoolsTable(): QueryState<
  MarginManagerPoolsTableItem[]
> {
  const { data: marketsStaticData, isLoading: marketsStaticDataLoading } =
    useAllMarketsStaticData();
  const { balances, isLoading: balancesLoading } = useLpBalances();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const quoteMetadata = marketsStaticData?.primaryQuoteProduct;

  const mappedData = useMemo((): MarginManagerPoolsTableItem[] | undefined => {
    if (!quoteMetadata || !balances) {
      return;
    }

    return balances
      .map((lpBalance) => {
        const marketStaticData =
          marketsStaticData?.allMarkets[lpBalance.productId];

        // return if no market static data or lp balance amount is zero
        if (!marketStaticData || lpBalance.lpAmount.isZero()) {
          return;
        }

        const baseMetadata = getSharedProductMetadata(
          marketStaticData.metadata,
        );

        const balance = balances?.find(
          (bal) => bal.productId === marketStaticData.productId,
        );

        if (!balance) {
          return;
        }

        // Use long weights for LPs.
        const healthWeights = getHealthWeights(
          BigDecimals.ONE,
          marketStaticData,
        );

        return {
          marketType: marketStaticData.type,
          productId: marketStaticData.productId,
          metadata: {
            base: baseMetadata,
            quote: quoteMetadata.metadata.token,
          },
          amounts: {
            lpAmount: balance.lpAmount,
            baseAmount: balance.amountBase,
            quoteAmount: balance.amountQuote,
          },
          valueUsd: balance.lpValueUsd,
          initialHealth: {
            marginUsd:
              balance.healthMetrics.initial.multipliedBy(primaryQuotePriceUsd),
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
  }, [
    quoteMetadata,
    balances,
    marketsStaticData?.allMarkets,
    primaryQuotePriceUsd,
  ]);

  return {
    data: mappedData,
    isLoading: balancesLoading || marketsStaticDataLoading,
  };
}
