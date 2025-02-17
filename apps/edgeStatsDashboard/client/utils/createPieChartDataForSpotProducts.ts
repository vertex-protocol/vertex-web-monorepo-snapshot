import { BigDecimal, BigDecimals } from '@vertex-protocol/client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { EdgeAnnotatedSpotMarket } from 'client/hooks/types';
import { aggregatePieChartOtherItems } from 'client/utils/aggregatePieChartOtherItems';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';

export function createPieChartDataForSpotProducts(
  allEdgeSpotMarketsData: EdgeAnnotatedSpotMarket[],
  getValue: (market: EdgeAnnotatedSpotMarket) => BigDecimal,
) {
  let maxItemValue: BigDecimal = BigDecimals.ZERO;

  const items = allEdgeSpotMarketsData
    .map((market) => {
      const value = getValue(market);

      if (value.gt(maxItemValue)) {
        maxItemValue = value;
      }

      return {
        name: getSpotMarketTokenName(market),
        value,
      };
    })
    .filter(nonNullFilter);

  return aggregatePieChartOtherItems({
    items,
    maxItemValue,
    othersCategoryName: 'Other Assets',
  });
}
