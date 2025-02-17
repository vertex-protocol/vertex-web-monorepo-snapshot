import {
  AnnotatedPerpMarket,
  getMarketPriceFormatSpecifier,
  PerpProductMetadata,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useLatestPerpPrices } from 'client/hooks/query/markets/useLatestPerpPrices';
import { useNextFundingTime } from 'client/modules/trading/hooks/useNextFundingTime';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { FundingRates, getFundingRates } from 'client/utils/calcs/funding';
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
  openInterestQuote: BigDecimal | undefined;
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
  const { currentMarket: staticMarketData } = usePerpOrderFormContext();
  const productId = staticMarketData?.productId;

  const { data: perpMarket } = useMarket<AnnotatedPerpMarket>({ productId });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { millisToNextFunding } = useNextFundingTime();
  const { data: marketStatsData } = useAllMarketsStats();
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

    const marketStats = marketStatsData?.statsByMarket[productId];
    const marketPriceChange = marketStats?.pastDayPriceChange;
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
      openInterestQuote: removeDecimals(marketStats?.openInterestQuote),
      metadata: perpMarket.metadata,
      marketPrice: latestOrderFillPrice?.price,
      marketPriceValueUsd:
        latestOrderFillPrice?.price.multipliedBy(primaryQuotePriceUsd),
      oraclePrice,
      indexPrice,
      priceChange24hr: marketPriceChange,
      priceChangeFrac24hr: marketStats?.pastDayPriceChangeFrac,
      quoteVolume24hr: removeDecimals(marketStats?.pastDayVolumeInPrimaryQuote),
      latestPriceChange: latestPriceChange ?? marketPriceChange,
    };
  }, [
    perpMarket,
    marketStatsData?.statsByMarket,
    fundingRatesData,
    latestOraclePricesData,
    latestPerpPricesData,
    latestOrderFillPrice?.price,
    primaryQuotePriceUsd,
    latestPriceChange,
  ]);

  return {
    productId,
    perpMarketInfo,
    millisToNextFunding,
    quoteSymbol: primaryQuoteToken.symbol,
  };
}
