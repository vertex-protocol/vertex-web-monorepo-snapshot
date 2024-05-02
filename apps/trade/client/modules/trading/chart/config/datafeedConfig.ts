import { ProductEngineType } from '@vertex-protocol/contracts';
import { CandlestickPeriod } from '@vertex-protocol/indexer-client';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { clientEnv } from 'common/environment/clientEnv';
import { precisionFixed } from 'd3-format';
import {
  DatafeedConfiguration,
  LibrarySymbolInfo,
  ResolutionString,
} from 'public/charting_library';

export const RESOLUTIONS_TO_INTERVALS = {
  '1': CandlestickPeriod.MIN,
  '5': CandlestickPeriod.FIVE_MIN,
  '15': CandlestickPeriod.FIFTEEN_MIN,
  '60': CandlestickPeriod.HOUR,
  '120': CandlestickPeriod.TWO_HOUR,
  '240': CandlestickPeriod.FOUR_HOUR,
  '1D': CandlestickPeriod.DAY,
  '1W': CandlestickPeriod.WEEK,
  '1M': CandlestickPeriod.MONTH,
} as Record<ResolutionString, CandlestickPeriod>;

const DATAFEED_RESOLUTIONS = Object.keys(
  RESOLUTIONS_TO_INTERVALS,
) as ResolutionString[];

const SUPPORTED_RESOLUTIONS: ResolutionString[] = [
  ...DATAFEED_RESOLUTIONS,
  // 8hr - Compiled using 4hr intervals
  '480',
  // 30min - Compiled using 15min intervals
  '30',
] as ResolutionString[];

export const DATAFEED_CONFIGURATION: DatafeedConfiguration = {
  supports_time: true,
  // Resolutions supported in the widget, TV will call `getBars` with the supported resolutions in `intraday_multipliers`
  // to compile to the resolutions
  supported_resolutions: SUPPORTED_RESOLUTIONS,
};

export const COMMON_SYMBOL_INFO: Omit<
  LibrarySymbolInfo,
  'name' | 'description' | 'minmov' | 'pricescale'
> = {
  format: 'price',
  type: 'crypto',
  session: '24x7',
  exchange: clientEnv.brandMetadata.displayName,
  listed_exchange: clientEnv.brandMetadata.displayName,
  timezone: 'Etc/UTC',
  has_intraday: true,
  has_daily: true,
  has_weekly_and_monthly: true,
  data_status: 'streaming',
  supported_resolutions: SUPPORTED_RESOLUTIONS,
  // Resolutions supported by the datafeed, must correspond with DATAFEED_RESOLUTIONS
  intraday_multipliers: ['1', '5', '15', '60', '120', '240'],
  daily_multipliers: ['1'],
  weekly_multipliers: ['1'],
  monthly_multipliers: ['1'],
};

export interface TradingViewSymbolInfo
  extends Omit<LibrarySymbolInfo, 'ticker'> {
  // Makes ticker a required property
  ticker: string;
  productId: number;
  productType: ProductEngineType;
}

export function getTradingViewSymbolInfo(
  market: StaticMarketData,
): TradingViewSymbolInfo {
  const symbolInfo = ((): TradingViewSymbolInfo => {
    // https://www.tradingview.com/charting-library-docs/latest/connecting_data/Symbology#decimal-format
    // Price scale = 10 ^ (number of decimal places in price)
    // Price increment = tick size = minmove / pricescale
    const priceNumDecimalPlaces = precisionFixed(
      market.priceIncrement.toNumber(),
    );
    const priceScale = 10 ** priceNumDecimalPlaces;
    const minMov = market.priceIncrement.multipliedBy(priceScale).toNumber();

    return {
      // This needs to be set to enable volume by default: https://github.com/tradingview/charting_library/issues/8306#issuecomment-1955174388
      visible_plots_set: 'ohlcv',
      productType: market.type,
      name: market.metadata.marketName,
      description: market.metadata.marketName,
      productId: market.productId,
      ticker: market.productId.toFixed(0),
      minmov: minMov,
      pricescale: priceScale,
      ...COMMON_SYMBOL_INFO,
    };
  })();

  const decimalPlaces = market.priceIncrement.decimalPlaces();
  if (decimalPlaces != null) {
    symbolInfo.pricescale = 10 ** decimalPlaces;
  }

  return symbolInfo;
}
