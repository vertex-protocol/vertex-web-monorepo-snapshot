import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { useNextFundingTime } from 'client/modules/trading/hooks/useNextFundingTime';

import { useSelectedPerpMarket } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarket';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import {
  AnnotatedPerpMarket,
  PerpProductMetadata,
} from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface PerpMarketInfo {
  priceFormatSpecifier: string;
  oraclePrice: BigDecimal;
  indexPrice: BigDecimal | undefined;
  marketPrice: BigDecimal | undefined;
  marketPriceValueUsd: BigDecimal | undefined;
  priceChange24hr: BigDecimal | undefined;
  priceChangeFrac24hr: BigDecimal | undefined;
  quoteVolume24hr: BigDecimal | undefined;
  openInterestQuote: BigDecimal;
  fundingRates: FundingRates | undefined;
  metadata: PerpProductMetadata;
  latestPriceChange: BigDecimal | undefined;
}

interface UsePerpMarketInfoCards {
  productId: number | undefined;
  perpMarketInfo: PerpMarketInfo | undefined;
  millisToNextFunding: number | undefined;
  quoteSymbol: string;
}

export function usePerpMarketInfoCards(): UsePerpMarketInfoCards {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { currentMarket: staticMarketData } = useSelectedPerpMarket();
  const productId = staticMarketData?.productId;

  const { data: perpMarket } = useMarket<AnnotatedPerpMarket>({ productId });
  const quotePrice = useQuotePriceUsd();
  const { millisToNextFunding } = useNextFundingTime();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { data: fundingRatesData } = useAllMarkets24HrFundingRates();
  const { data: latestPerpPricesData } = useLatestPerpPrices();
  const { data: latestOraclePricesData } = useLatestOraclePrices();
  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });
  const latestPriceChange = useLatestPriceChange(latestOrderFillPrice?.price);

  const perpMarketInfo = useMemo<PerpMarketInfo | undefined>(() => {
    if (perpMarket == null) {
      return;
    }
    const productId = perpMarket.productId;

    const marketMetrics = marketMetricsData?.metricsByMarket[productId];
    const marketPriceChange = marketMetrics?.pastDayPriceChange;
    const dailyFundingRate = fundingRatesData?.[productId]?.fundingRate;
    const oraclePrice =
      latestOraclePricesData?.[productId]?.oraclePrice ??
      perpMarket.product.oraclePrice;
    const indexPrice = latestPerpPricesData?.[productId]?.indexPrice;

    return {
      priceFormatSpecifier: getMarketPriceFormatSpecifier(
        perpMarket.priceIncrement,
      ),
      fundingRates: dailyFundingRate
        ? getFundingRates(dailyFundingRate)
        : undefined,
      openInterestQuote: removeDecimals(
        perpMarket.product.openInterest.multipliedBy(oraclePrice),
      ),
      metadata: perpMarket.metadata,
      marketPrice: latestOrderFillPrice?.price,
      marketPriceValueUsd: latestOrderFillPrice?.price.multipliedBy(quotePrice),
      oraclePrice,
      indexPrice,
      priceChange24hr: marketPriceChange,
      priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
      quoteVolume24hr: removeDecimals(marketMetrics?.pastDayVolumeQuote),
      latestPriceChange: latestPriceChange ?? marketPriceChange,
    };
  }, [
    perpMarket,
    latestOrderFillPrice,
    marketMetricsData,
    fundingRatesData,
    latestOraclePricesData,
    latestPerpPricesData,
    quotePrice,
    latestPriceChange,
  ]);

  return {
    productId,
    perpMarketInfo,
    millisToNextFunding,
    quoteSymbol: primaryQuoteToken.symbol,
  };
}
