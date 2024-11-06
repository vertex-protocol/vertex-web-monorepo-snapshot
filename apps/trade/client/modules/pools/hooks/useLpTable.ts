import {
  calcLpTokenValue,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useLpBalances } from 'client/hooks/subaccount/useLpBalances';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { QueryState } from 'client/types/QueryState';
import { calcIndexerSummaryUnrealizedLpPnl } from 'client/utils/calcs/pnlCalcs';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';
import { PairMetadata } from 'client/modules/pools/types';

export interface LpTableItem {
  marketType: ProductEngineType;
  productId: number;
  metadata: PairMetadata;
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
    marketCategory: 'spot',
  });
  const { balances } = useLpBalances();
  // Default these to zero when not available
  const { data: marketMetrics } = useAllMarketsHistoricalMetrics();
  const { data: lpYields } = useLpYields();
  const { data: indexerSnapshot } = useSubaccountIndexerSnapshot();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const quoteMetadata = staticMarketData?.primaryQuote;

  const mappedData = useMemo((): LpTableItem[] => {
    // Default all other values to 0, markets data are derived from same endpoint
    if (!filteredMarkets || !quoteMetadata) {
      return [];
    }

    return Object.values(filteredMarkets)
      .filter((market) => {
        const isHidden = getIsHiddenMarket(market.productId);
        const hasLpPool = market.metadata.quoteProductId === QUOTE_PRODUCT_ID;

        return !isHidden && hasLpPool;
      })
      .map((market) => {
        const yieldFraction = lpYields?.[market.productId];
        const volume =
          marketMetrics?.metricsByMarket[market.productId]
            ?.pastDayVolumeInPrimaryQuote;
        const baseMetadata = getSharedProductMetadata(market.metadata);
        const indexerBalance = indexerSnapshot?.balances.find(
          (bal) => bal.productId === market.productId,
        );
        const balance = balances?.find(
          (bal) => bal.productId === market.productId,
        );
        const tvlUsd = calcLpTokenValue(market.product)
          .multipliedBy(market.product.totalLpSupply)
          .multipliedBy(primaryQuotePriceUsd);
        const unrealizedPnl = indexerBalance
          ? calcIndexerSummaryUnrealizedLpPnl(indexerBalance)
          : undefined;

        return {
          marketType: market.type,
          productId: market.productId,
          metadata: {
            base: baseMetadata,
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
    primaryQuotePriceUsd,
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
