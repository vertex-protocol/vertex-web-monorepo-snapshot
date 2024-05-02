import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { TriggerOrderType } from 'client/modules/trading/types';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import { MarketFilter } from 'client/types/MarketFilter';
import { QueryState } from 'client/types/QueryState';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
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
  // This can be derived from marketInfo.sizeIncrement, but is pulled here to reduce duplication
  sizeFormatSpecifier: string;
}

export function useOpenTriggerOrdersTable(
  filter?: MarketFilter,
): QueryState<OpenTriggerOrderTableItem[]> {
  const { filteredMarkets, isLoading: marketsAreLoading } =
    useFilteredMarkets(filter);
  const {
    isLoading: ordersAreLoading,
    isError: ordersIsError,
    data: ordersData,
  } = useSubaccountOpenTriggerOrders();

  const openTriggerOrders = useMemo(() => {
    if (!filteredMarkets || !ordersData) {
      return;
    }
    return Object.values(filteredMarkets).flatMap((market) => {
      const ordersForProduct = ordersData?.[market.productId];

      if (!ordersForProduct?.length) {
        return [];
      }

      return ordersForProduct.map(
        (openTriggerOrder): OpenTriggerOrderTableItem => {
          const { icon, symbol } = getBaseProductMetadata(market.metadata);
          const totalAmount = openTriggerOrder.order.amount;
          const decimalAdjustedTotalAmount = removeDecimals(totalAmount);

          // Assume execution occurs at the trigger price
          const triggerPrice = toBigDecimal(
            openTriggerOrder.order.triggerCriteria.triggerPrice,
          );

          return {
            timePlacedMillis: secondsToMilliseconds(openTriggerOrder.updatedAt),
            marketInfo: {
              marketName: market.metadata.marketName,
              icon,
              symbol,
              amountForSide: decimalAdjustedTotalAmount,
              productType: market.type,
              sizeIncrement: market.sizeIncrement,
              priceIncrement: market.priceIncrement,
            },
            orderType: getTriggerOrderType(openTriggerOrder),
            productId: openTriggerOrder.order.productId,
            triggerPrice,
            totalAmount: decimalAdjustedTotalAmount,
            totalSize: decimalAdjustedTotalAmount.abs(),
            orderPrice: toBigDecimal(openTriggerOrder.order.price),
            digest: openTriggerOrder.order.digest,
            sizeFormatSpecifier: getMarketSizeFormatSpecifier(
              market.sizeIncrement,
            ),
          };
        },
      );
    });
  }, [filteredMarkets, ordersData]);

  return {
    data: openTriggerOrders,
    isLoading: ordersAreLoading || marketsAreLoading,
    isError: ordersIsError,
  };
}
