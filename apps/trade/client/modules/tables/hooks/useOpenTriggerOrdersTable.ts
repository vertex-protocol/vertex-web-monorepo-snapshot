import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { CancellableOrderWithNotificationInfo } from 'client/hooks/execute/cancelOrder/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { TriggerOrderType } from 'client/modules/trading/types';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { getIsIsoTriggerOrder } from 'client/modules/trading/utils/isoOrderChecks';
import { MarketFilter } from 'client/types/MarketFilter';
import { QueryState } from 'client/types/QueryState';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface OpenTriggerOrderTableItem {
  orderType: TriggerOrderType;
  timePlacedMillis: number;
  marketInfo: MarketInfoCellData;
  productId: number;
  triggerPrice: BigDecimal;
  totalAmount: BigDecimal;
  totalSize: BigDecimal;
  orderPrice: BigDecimal;
  digest: string;
  marginModeType: MarginModeType;
  // This can be derived from marketInfo.sizeIncrement, but is pulled here to reduce duplication
  sizeFormatSpecifier: string;
  priceFormatSpecifier: string;
  orderForCancellation: CancellableOrderWithNotificationInfo;
}

export function useOpenTriggerOrdersTable(
  filter?: MarketFilter,
): QueryState<OpenTriggerOrderTableItem[]> {
  const { filteredMarkets, isLoading: marketsAreLoading } =
    useFilteredMarkets(filter);
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const {
    isLoading: ordersAreLoading,
    isError: ordersIsError,
    data: ordersData,
  } = useSubaccountOpenTriggerOrders();

  const openTriggerOrders = useMemo(() => {
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
        (openTriggerOrder): OpenTriggerOrderTableItem => {
          const { icon, symbol } = getSharedProductMetadata(market.metadata);
          const totalAmount = openTriggerOrder.order.amount;
          const decimalAdjustedTotalAmount = removeDecimals(totalAmount);

          // Assume execution occurs at the trigger price
          const triggerPrice = toBigDecimal(
            openTriggerOrder.order.triggerCriteria.triggerPrice,
          );

          const { productId, price, digest } = openTriggerOrder.order;
          const orderType = getTriggerOrderType(openTriggerOrder);

          return {
            timePlacedMillis: secondsToMilliseconds(openTriggerOrder.updatedAt),
            marketInfo: {
              marketName: market.metadata.marketName,
              icon,
              symbol,
              quoteSymbol: quoteData.symbol,
              isPrimaryQuote: quoteData.isPrimaryQuote,
              amountForSide: decimalAdjustedTotalAmount,
              productType: market.type,
              sizeIncrement: market.sizeIncrement,
              priceIncrement: market.priceIncrement,
            },
            orderType,
            productId,
            triggerPrice,
            totalAmount: decimalAdjustedTotalAmount,
            totalSize: decimalAdjustedTotalAmount.abs(),
            orderPrice: toBigDecimal(price),
            digest,
            marginModeType: getIsIsoTriggerOrder(openTriggerOrder)
              ? 'isolated'
              : 'cross',
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
              isTrigger: true,
              orderType,
            },
          };
        },
      );
    });
  }, [allMarketsStaticData, filteredMarkets, ordersData]);

  return {
    data: openTriggerOrders,
    isLoading: ordersAreLoading || marketsAreLoading,
    isError: ordersIsError,
  };
}
