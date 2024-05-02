import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useLpBalances } from 'client/hooks/subaccount/useLpBalances';
import { QueryState } from 'client/types/QueryState';
import { BigDecimals } from 'client/utils/BigDecimals';
import { getHealthWeights } from 'client/utils/calcs/healthCalcs';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { BaseProductMetadata, Token } from 'common/productMetadata/types';
import { useMemo } from 'react';
import { MarginWeightMetrics } from '../../types';

export interface MarginManagerPoolsTableItem {
  marketType: ProductEngineType;
  productId: number;
  metadata: {
    base: BaseProductMetadata;
    quote: Token;
  };
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
  const quotePrice = useQuotePriceUsd();
  const quoteMetadata = marketsStaticData?.quote;

  const mappedData = useMemo((): MarginManagerPoolsTableItem[] | undefined => {
    if (!quoteMetadata || !balances) {
      return;
    }

    return balances
      .map((lpBalance) => {
        const marketStaticData = marketsStaticData?.all[lpBalance.productId];

        // return if no market static data or lp balance amount is zero
        if (!marketStaticData || lpBalance.lpAmount.isZero()) {
          return;
        }

        const baseProductMetadata = getBaseProductMetadata(
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
            base: baseProductMetadata,
            quote: quoteMetadata.metadata.token,
          },
          amounts: {
            lpAmount: balance.lpAmount,
            baseAmount: balance.amountBase,
            quoteAmount: balance.amountQuote,
          },
          valueUsd: balance.lpValueUsd,
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
  }, [quoteMetadata, balances, marketsStaticData?.all, quotePrice]);

  return {
    data: mappedData,
    isLoading: balancesLoading || marketsStaticDataLoading,
  };
}
