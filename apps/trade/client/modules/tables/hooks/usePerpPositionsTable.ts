import { toBigDecimal } from '@vertex-protocol/client';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

export interface PerpPositionsTableItem {
  productId: number;
  isoSubaccountName: string | undefined;
  marketInfo: MarketInfoCellData;
  amountInfo: {
    symbol: string;
    amount: BigDecimal;
    notionalValueUsd: BigDecimal;
  };
  netFunding: BigDecimal | undefined;
  margin: {
    crossMarginUsedUsd: BigDecimal | undefined;
    isoMarginUsedUsd: BigDecimal | undefined;
    isoLeverage: number | undefined;
    marginModeType: MarginModeType;
  };
  pnlInfo: {
    estimatedPnlUsd: BigDecimal | undefined;
    estimatedPnlFrac: BigDecimal | undefined;
  };
  estimatedLiquidationPrice: BigDecimal | null;
  averageEntryPrice: BigDecimal | undefined;
  oraclePrice: BigDecimal;
  reduceOnlyOrders: {
    takeProfitTriggerPrice: BigDecimal | undefined;
    stopLossTriggerPrice: BigDecimal | undefined;
  };
  sizeFormatSpecifier: string;
  priceFormatSpecifier: string;
}

interface Params {
  marketFilter?: MarketFilter;
}

export function usePerpPositionsTable({ marketFilter }: Params) {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const { data: reduceOnlyOrdersData } = useReduceOnlyTriggerOrders();
  const { data: perpBalances, isLoading } = usePerpPositions();
  const { filteredProductIds } = useFilteredMarkets(marketFilter);
  const { data: staticMarketsData } = useAllMarketsStaticData();

  const mappedData: PerpPositionsTableItem[] | undefined = useMemo(() => {
    if (!perpBalances) {
      return;
    }
    return perpBalances
      .filter(
        (balance) =>
          !balance.amount.isZero() &&
          filteredProductIds.includes(balance.productId),
      )
      .map((position): PerpPositionsTableItem => {
        const staticMarketData =
          staticMarketsData?.perpMarkets[position.productId];
        const reduceOnlyOrders = reduceOnlyOrdersData?.[position?.productId];
        const tpSlOrders = !!position.iso
          ? reduceOnlyOrders?.iso
          : reduceOnlyOrders?.cross;

        const takeProfitTriggerPrice =
          tpSlOrders?.takeProfitOrder?.order.triggerCriteria.triggerPrice;
        const stopLossTriggerPrice =
          tpSlOrders?.stopLossOrder?.order.triggerCriteria.triggerPrice;

        return {
          productId: position.productId,
          isoSubaccountName: position.iso?.subaccountName,
          marketInfo: {
            ...position.metadata,
            // Perps are always quoted in the primary quote token
            quoteSymbol: primaryQuoteSymbol,
            isPrimaryQuote: true,
            amountForSide: position.amount,
            productType: ProductEngineType.PERP,
            priceIncrement:
              staticMarketData?.priceIncrement ?? BigDecimals.ZERO,
            sizeIncrement: staticMarketData?.sizeIncrement ?? BigDecimals.ZERO,
          },
          amountInfo: {
            symbol: position.metadata.symbol,
            amount: position.amount,
            notionalValueUsd: position.notionalValueUsd,
          },
          pnlInfo: {
            estimatedPnlUsd: position.estimatedPnlUsd,
            estimatedPnlFrac: position.estimatedPnlFrac,
          },
          reduceOnlyOrders: {
            takeProfitTriggerPrice: takeProfitTriggerPrice
              ? toBigDecimal(takeProfitTriggerPrice)
              : undefined,
            stopLossTriggerPrice: stopLossTriggerPrice
              ? toBigDecimal(stopLossTriggerPrice)
              : undefined,
          },
          averageEntryPrice: position.price.averageEntryPrice,
          oraclePrice: position.price.fastOraclePrice,
          sizeFormatSpecifier: getMarketSizeFormatSpecifier(
            staticMarketData?.sizeIncrement,
          ),
          priceFormatSpecifier: getMarketPriceFormatSpecifier(
            staticMarketData?.priceIncrement,
          ),
          netFunding: position.netFunding,
          estimatedLiquidationPrice: position.estimatedLiquidationPrice,
          margin: {
            crossMarginUsedUsd: position.crossMarginUsedUsd,
            isoLeverage: position.iso?.leverage,
            isoMarginUsedUsd:
              position.iso?.netMargin.multipliedBy(primaryQuotePriceUsd),
            marginModeType: !!position.iso ? 'isolated' : 'cross',
          },
        };
      });
  }, [
    filteredProductIds,
    perpBalances,
    primaryQuotePriceUsd,
    primaryQuoteSymbol,
    reduceOnlyOrdersData,
    staticMarketsData?.perpMarkets,
  ]);

  return {
    positions: mappedData,
    isLoading,
  };
}
