import { BigDecimal, BigDecimals } from '@vertex-protocol/client';
import { safeDiv } from '@vertex-protocol/web-common';
import { StatsPieChartDataItem } from 'client/components/charts/StatsPieChart/types';

const OTHERS_THRESHOLD_FRAC = 0.01;

interface Params {
  items: { name: string; value: BigDecimal }[];
  maxItemValue: BigDecimal;
  othersCategoryName: string;
}
/**
 * Aggregates smaller pie chart items into a single "Other" category based on a threshold fraction.
 * @param {params}
 * @param {Array} params.items - List of items with names and values.
 * @param {BigDecimal} params.maxItemValue - The maximum item value for normalization.
 * @param {string} params.othersCategoryName - The label for the aggregated "Other" category.
 * @returns {StatsPieChartDataItem[]} Processed list of pie chart data items with smaller values aggregated.
 */
export function aggregatePieChartOtherItems({
  items,
  maxItemValue,
  othersCategoryName,
}: Params) {
  let othersItemValue = BigDecimals.ZERO;

  const itemsWithAggregatedOthers = items.reduce((acc, item) => {
    const itemFraction = safeDiv(item.value, maxItemValue);

    if (itemFraction.lt(OTHERS_THRESHOLD_FRAC)) {
      othersItemValue = othersItemValue.plus(item.value);
    } else {
      acc.push({
        name: item.name,
        value: item.value.toNumber(),
      });
    }
    return acc;
  }, [] as StatsPieChartDataItem[]);

  if (othersItemValue.gt(BigDecimals.ZERO)) {
    itemsWithAggregatedOthers.push({
      name: othersCategoryName,
      value: othersItemValue.toNumber(),
    });
  }

  return itemsWithAggregatedOthers;
}
