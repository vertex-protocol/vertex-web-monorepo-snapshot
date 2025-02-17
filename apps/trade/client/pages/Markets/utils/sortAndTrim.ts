import { BigDecimal } from '@vertex-protocol/client';
import { orderBy } from 'lodash';

interface Options {
  isAbsolute?: boolean;
  isAscending?: boolean;
  limit?: number;
}

export function sortAndTrim<TData extends any>(
  data: TData[],
  sortKey: keyof TData,
  { limit = 6, isAbsolute, isAscending }: Options = {},
): TData[] {
  return orderBy(
    data,
    (res) => {
      if (res[sortKey] instanceof BigDecimal) {
        return isAbsolute
          ? res[sortKey].abs().toNumber()
          : res[sortKey].toNumber();
      }
      if (typeof res[sortKey] === 'number' && isAbsolute) {
        return Math.abs(res[sortKey]);
      }
      return res[sortKey];
    },
    isAscending ? 'asc' : 'desc',
  ).slice(0, limit);
}
