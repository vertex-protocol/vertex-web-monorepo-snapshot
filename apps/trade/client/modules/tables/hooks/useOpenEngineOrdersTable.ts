import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { CancellableOrderWithNotificationInfo } from 'client/hooks/execute/cancelOrder/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountOpenEngineOrders } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { EngineOrderType } from 'client/modules/trading/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { QueryState } from 'client/types/QueryState';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface OpenEngineOrderTableItem {
  orderType: EngineOrderType;
  timePlacedMillis: number;
  marketInfo: MarketInfoCellData;
  productId: number;
  price: BigDecimal;
  totalAmount: BigDecimal;
  totalSize: BigDecimal;
  totalCost: BigDecimal;
  marginModeType: MarginModeType;
  isoMarginTransfer: BigDecimal | undefined;
  filled: {
    amount: BigDecimal;
    fraction: BigDecimal;
  };
  unfilled: {
    amount: BigDecimal;
  };
  digest: string;
  // This can be derived from marketInfo.sizeIncrement, but is pulled here to reduce duplication
  sizeFormatSpecifier: string;
  priceFormatSpecifier: string;
  orderForCancellation: CancellableOrderWithNotificationInfo;
}

export function useOpenEngineOrdersTable(
  filter?: MarketFilter,
): QueryState<OpenEngineOrderTableItem[]> {
  const { filteredMarkets, isLoading: marketsAreLoading } =
    useFilteredMarkets(filter);
  const {
    isLoading: ordersAreLoading,
    isError: ordersIsError,
    data: ordersData,
  } = useSubaccountOpenEngineOrders();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const openEngineOrders = useMemo(() => {
    if (!filteredMarkets || !ordersData || !allMarketsStaticData) {
      return;
    }

    return Object.values(filteredMarkets).flatMap((market) => {
      const ordersForProduct = ordersData?.[market.productId];
      const quoteData = allMarketsStaticData.quotes[market.productId];

      if (!ordersForProduct?.length || !quoteData) {
        return [];
      }

      return ordersForProduct.map(
        (openEngineOrder): OpenEngineOrderTableItem => {
          const { icon, symbol } = getSharedProductMetadata(market.metadata);
          const decimalAdjustedTotalAmount = removeDecimals(
            openEngineOrder.totalAmount,
          );
          const decimalAdjustedTotalCost = removeDecimals(
            openEngineOrder.totalAmount.multipliedBy(openEngineOrder.price),
          );
          const decimalAdjustedUnfilledAmount = removeDecimals(
            openEngineOrder.unfilledAmount,
          );
          const decimalAdjustedFilledAmount = decimalAdjustedTotalAmount.minus(
            decimalAdjustedUnfilledAmount,
          );
          const filledFraction = decimalAdjustedFilledAmount.div(
            decimalAdjustedTotalAmount,
          );

          const { productId, price, digest } = openEngineOrder;
          const orderType = 'limit';
          const isoMarginTransfer = removeDecimals(
            openEngineOrder.margin ?? undefined,
          );
          const marginModeType: MarginModeType = !!isoMarginTransfer
            ? 'isolated'
            : 'cross';

          return {
            timePlacedMillis: secondsToMilliseconds(
              openEngineOrder.placementTime,
            ),
            orderType,
            marginModeType,
            isoMarginTransfer,
            marketInfo: {
              marketName: market.metadata.marketName,
              icon,
              symbol,
              quoteSymbol: quoteData.symbol,
              isPrimaryQuote: quoteData.isPrimaryQuote,
              amountForSide: decimalAdjustedTotalAmount,
              productType: market.type,
              priceIncrement: market.priceIncrement,
              sizeIncrement: market.sizeIncrement,
            },
            productId,
            price,
            totalAmount: decimalAdjustedTotalAmount,
            totalSize: decimalAdjustedTotalAmount.abs(),
            totalCost: decimalAdjustedTotalCost.abs(),
            filled: {
              amount: decimalAdjustedFilledAmount.abs(),
              fraction: filledFraction,
            },
            unfilled: {
              amount: decimalAdjustedUnfilledAmount.abs(),
            },
            digest,
            sizeFormatSpecifier: getMarketSizeFormatSpecifier(
              market.sizeIncrement,
            ),
            priceFormatSpecifier: getMarketPriceFormatSpecifier(
              market.priceIncrement,
            ),
            orderForCancellation: {
              productId,
              digest,
              decimalAdjustedTotalAmount,
              isTrigger: false,
              orderType,
            },
          };
        },
      );
    });
  }, [allMarketsStaticData, filteredMarkets, ordersData]);

  return {
    data: openEngineOrders,
    isLoading: ordersAreLoading || marketsAreLoading,
    isError: ordersIsError,
  };
}
