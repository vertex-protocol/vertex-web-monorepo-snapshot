import { useMemo } from 'react';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useElixirLpYields } from './useElixirLpYields';
import { BigDecimal } from '@vertex-protocol/utils';
import { bigDecimalComparator } from 'client/utils/comparators';

export interface ElixirMarketTableItem {
  metadata: {
    marketName: string;
    icon: TokenIconMetadata;
  };
  productId: number;
  poolApy: BigDecimal;
}

export function useElixirPoolsTable() {
  const { data: staticMarketData } = useAllMarketsStaticData();
  const { data: elixirApyData, isLoading } = useElixirLpYields();
  const allMarkets = staticMarketData?.all;

  const mappedData: ElixirMarketTableItem[] | undefined = useMemo(() => {
    if (!elixirApyData || !allMarkets) {
      return;
    }

    return (
      Object.entries(elixirApyData)
        .map(([product_id, pool_apy]) => {
          const productId = Number(product_id);
          const market = allMarkets[productId];

          if (!market) {
            return;
          }

          const { icon } = getBaseProductMetadata(market.metadata);

          return {
            metadata: {
              marketName: market.metadata.marketName,
              icon,
            },
            productId,
            poolApy: pool_apy,
          };
        })
        .filter(nonNullFilter)
        // Sort from descending order
        .sort((a, b) => bigDecimalComparator(b.poolApy, a.poolApy))
        // Limit to 5 pools
        .slice(0, 5)
    );
  }, [elixirApyData, allMarkets]);

  return {
    data: mappedData,
    isLoading,
  };
}
