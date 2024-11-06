import { toBigDecimal } from '@vertex-protocol/client';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import {
  PerpPositionItem,
  usePerpPositions,
} from 'client/hooks/subaccount/usePerpPositions';
import { useReduceOnlyTriggerOrders } from 'client/hooks/subaccount/useReduceOnlyTriggerOrders';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

export interface PerpPositionsTableItem extends PerpPositionItem {
  marketInfo: MarketInfoCellData;
  amountInfo: {
    symbol: string;
    position: BigDecimal;
    notionalValueUsd: BigDecimal;
  };
  netFunding: BigDecimal;
  marginUsedUsd: BigDecimal;
  pnlInfo: {
    estimatedPnlUsd: BigDecimal;
    estimatedPnlFrac: BigDecimal;
  };
  estimatedLiquidationPrice: BigDecimal | null;
  averageEntryPrice: BigDecimal;
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

export const usePerpPositionsTable = ({ marketFilter }: Params) => {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const { data: reduceOnlyOrdersData } = useReduceOnlyTriggerOrders();
  const { data: perpBalances, ...rest } = usePerpPositions();
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
        const staticMarketData = staticMarketsData?.perp[position.productId];
        const reduceOnlyOrders = reduceOnlyOrdersData?.[position?.productId];

        const takeProfitTriggerPrice =
          reduceOnlyOrders?.takeProfitOrder?.order.triggerCriteria.triggerPrice;
        const stopLossTriggerPrice =
          reduceOnlyOrders?.stopLossOrder?.order.triggerCriteria.triggerPrice;

        return {
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
            position: position.amount,
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
          ...position,
        };
      });
  }, [
    filteredProductIds,
    perpBalances,
    primaryQuoteSymbol,
    reduceOnlyOrdersData,
    staticMarketsData?.perp,
  ]);

  return {
    positions: mappedData,
    ...rest,
  };
};
