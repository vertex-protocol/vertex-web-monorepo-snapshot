import { useMemo } from 'react';
import { BigDecimal } from '@vertex-protocol/utils';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountOpenEngineOrders } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { MarketFilter } from 'client/types/MarketFilter';
import { QueryState } from 'client/types/QueryState';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { EngineOrderType } from 'client/modules/trading/types';
import { secondsToMilliseconds } from 'date-fns';

export interface OpenEngineOrderTableItem {
  orderType: EngineOrderType;
  timePlacedMillis: number;
  marketInfo: MarketInfoCellData;
  productId: number;
  price: BigDecimal;
  totalAmount: BigDecimal;
  totalSize: BigDecimal;
  totalCost: BigDecimal;
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

  const openEngineOrders = useMemo(() => {
    if (!filteredMarkets || !ordersData) {
      return;
    }

    return Object.values(filteredMarkets).flatMap((market) => {
      const ordersForProduct = ordersData?.[market.productId];

      if (!ordersForProduct?.length) {
        return [];
      }

      return ordersForProduct.map(
        (openEngineOrder): OpenEngineOrderTableItem => {
          const { icon, symbol } = getBaseProductMetadata(market.metadata);
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

          return {
            timePlacedMillis: secondsToMilliseconds(
              openEngineOrder.placementTime,
            ),
            orderType: 'limit',
            marketInfo: {
              marketName: market.metadata.marketName,
              icon,
              symbol,
              amountForSide: decimalAdjustedTotalAmount,
              productType: market.type,
              priceIncrement: market.priceIncrement,
              sizeIncrement: market.sizeIncrement,
            },
            productId: openEngineOrder.productId,
            price: openEngineOrder.price,
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
            digest: openEngineOrder.digest,
            sizeFormatSpecifier: getMarketSizeFormatSpecifier(
              market.sizeIncrement,
            ),
          };
        },
      );
    });
  }, [filteredMarkets, ordersData]);

  return {
    data: openEngineOrders,
    isLoading: ordersAreLoading || marketsAreLoading,
    isError: ordersIsError,
  };
}
