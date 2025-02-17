import { BigDecimal, BigDecimals } from '@vertex-protocol/client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { AllEdgeMarketsData } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { aggregatePieChartOtherItems } from 'client/utils/aggregatePieChartOtherItems';
import { getMarketName } from 'client/utils/getMarketName';

export function createPieChartDataForProducts(
  allEdgeMarketsData: AllEdgeMarketsData,
  valueByProductId: Record<number, BigDecimal | undefined> | undefined,
) {
  let maxItemValue: BigDecimal = BigDecimals.ZERO;
  const items = Object.entries(valueByProductId ?? {})
    .map(([productId, value]) => {
      const productIdAsNum = Number(productId);

      const market = allEdgeMarketsData.allMarkets[productIdAsNum];

      if (!market || !value) {
        return;
      }

      if (value.gt(maxItemValue)) {
        maxItemValue = value;
      }

      return {
        name: getMarketName(market),
        value,
      };
    })
    .filter(nonNullFilter);

  return aggregatePieChartOtherItems({
    items,
    maxItemValue,
    othersCategoryName: 'Other Markets',
  });
}
