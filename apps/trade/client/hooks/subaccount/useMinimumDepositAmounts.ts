import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { useMemo } from 'react';
import { mapValues } from 'lodash';
import { QueryState } from 'client/types/QueryState';
import { BigDecimal } from '@vertex-protocol/utils';

export function useMinimumDepositAmounts(): QueryState<
  Record<number, BigDecimal>
> {
  const { data, ...rest } = useSubaccountFeeRates();

  const mappedData = useMemo(() => {
    if (!data) {
      return;
    }
    // Minimum deposit is 5x withdrawal fee
    return mapValues(data.withdrawal, (val) => val.multipliedBy(5));
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}
