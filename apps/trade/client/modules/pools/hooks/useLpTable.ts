import {
  calcLpTokenValue,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useLpBalances } from 'client/hooks/subaccount/useLpBalances';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { QueryState } from 'client/types/QueryState';
import { calcIndexerSummaryUnrealizedLpPnl } from 'client/utils/calcs/pnlCalcs';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { BaseProductMetadata, Token } from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface LpTableItem {
  marketType: ProductEngineType;
  productId: number;
  metadata: {
    base: BaseProductMetadata;
    quote: Token;
  };
  yieldFraction: BigDecimal | undefined;
  tvlUsd: BigDecimal;
  // 24hr
  volume: BigDecimal | undefined;
  valueUsd: BigDecimal | undefined;
  amounts: {
    lpAmount: BigDecimal | undefined;
    baseAmount: BigDecimal | undefined;
    quoteAmount: BigDecimal | undefined;
  };
  unrealizedPnl: BigDecimal | undefined;
}

export function useLpTable({
  showZeroBalances,
}: {
  showZeroBalances?: boolean;
}): QueryState<LpTableItem[]> {
  const { getIsHiddenMarket } = useVertexMetadataContext();
  const { data: staticMarketData } = useAllMarketsStaticData();
  const { filteredMarkets, isLoading: loadingMarkets } = useFilteredMarkets({
    marketType: ProductEngineType.SPOT,
  });
  const { balances } = useLpBalances();
  // Default these to zero when not available
  const { data: marketMetrics } = useAllMarketsHistoricalMetrics();
  const { data: lpYields } = useLpYields();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();
  const quotePriceUsd = usePrimaryQuotePriceUsd();

  const quoteMetadata = staticMarketData?.primaryQuote;

  const mappedData = useMemo((): LpTableItem[] => {
    // Default all other values to 0, markets data are derived from same endpoint
    if (!filteredMarkets || !quoteMetadata) {
      return [];
    }

    return Object.values(filteredMarkets)
      .filter((market) => {
        const isHidden = getIsHiddenMarket(market.productId);

        return !isHidden && market.metadata.hasLpPool;
      })
      .map((market) => {
        const yieldFraction = lpYields?.[market.productId];
        const volume =
          marketMetrics?.metricsByMarket[market.productId]
            ?.pastDayVolumeInPrimaryQuote;
        const baseProductMetadata = getBaseProductMetadata(market.metadata);
        const indexerBalance = indexerSnapshot?.balances.find(
          (bal) => bal.productId === market.productId,
        );
        const balance = balances?.find(
          (bal) => bal.productId === market.productId,
        );
        const tvlUsd = calcLpTokenValue(market.product)
          .multipliedBy(market.product.totalLpSupply)
          .multipliedBy(quotePriceUsd);
        const unrealizedPnl = indexerBalance
          ? calcIndexerSummaryUnrealizedLpPnl(indexerBalance)
          : undefined;

        return {
          marketType: market.type,
          productId: market.productId,
          metadata: {
            base: baseProductMetadata,
            quote: quoteMetadata.metadata.token,
          },
          amounts: {
            lpAmount: balance?.lpAmount,
            baseAmount: balance?.amountBase,
            quoteAmount: balance?.amountQuote,
          },
          valueUsd: balance?.lpValueUsd,
          tvlUsd: removeDecimals(tvlUsd),
          volume: removeDecimals(volume),
          yieldFraction,
          unrealizedPnl: removeDecimals(unrealizedPnl),
        };
      });
  }, [
    filteredMarkets,
    quoteMetadata,
    lpYields,
    marketMetrics,
    indexerSnapshot,
    quotePriceUsd,
    balances,
    getIsHiddenMarket,
  ]);

  const filteredMappedData = useMemo(() => {
    if (showZeroBalances) {
      return mappedData;
    }
    return mappedData.filter((item) => item.amounts.lpAmount?.gt(0));
  }, [mappedData, showZeroBalances]);

  return {
    data: filteredMappedData,
    isLoading: loadingMarkets,
  };
}
