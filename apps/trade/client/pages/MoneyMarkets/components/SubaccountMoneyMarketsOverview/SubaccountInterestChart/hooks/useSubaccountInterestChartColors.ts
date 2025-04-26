import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { SubaccountInterestChartDataItem } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';
import { first, last, mapValues } from 'lodash';
import { useMemo } from 'react';

const SUBACCOUNT_INTEREST_CHART_GRADIENT_IDS = {
  netInterestPositive: 'net_interest_positive',
  netInterestNegative: 'net_interest_negative',
} as const;

const SUBACCOUNT_INTEREST_CHART_GRADIENT_URLS = mapValues(
  SUBACCOUNT_INTEREST_CHART_GRADIENT_IDS,
  (id) => `url(#${id})`,
);

export const SUBACCOUNT_INTEREST_CHART_DYNAMIC_GRADIENT_CONFIG = [
  {
    id: SUBACCOUNT_INTEREST_CHART_GRADIENT_IDS.netInterestPositive,
    stopColor: getTradeAppColorVar('positive'),
  },
  {
    id: SUBACCOUNT_INTEREST_CHART_GRADIENT_IDS.netInterestNegative,
    stopColor: getTradeAppColorVar('negative'),
  },
];

export function useSubaccountInterestChartColors({
  data,
  valueKey,
}: {
  data: SubaccountInterestChartDataItem[] | undefined;
  valueKey: keyof Omit<SubaccountInterestChartDataItem, 'timestampMillis'>;
}) {
  return useMemo(() => {
    const startItemValue = first(data)?.[valueKey];
    const endItemValue = last(data)?.[valueKey];
    if (endItemValue == null || startItemValue == null) {
      return {
        fill: SUBACCOUNT_INTEREST_CHART_GRADIENT_URLS.netInterestPositive,
        stroke: getTradeAppColorVar('positive'),
      };
    }
    const isPositiveInterest = endItemValue >= startItemValue;

    return {
      fill: isPositiveInterest
        ? SUBACCOUNT_INTEREST_CHART_GRADIENT_URLS.netInterestPositive
        : SUBACCOUNT_INTEREST_CHART_GRADIENT_URLS.netInterestNegative,
      stroke: isPositiveInterest
        ? getTradeAppColorVar('positive')
        : getTradeAppColorVar('positive'),
    };
  }, [data, valueKey]);
}
