import { BigDecimal } from '@vertex-protocol/client';

/**
 * Boolean comparator that sorts `true` before `false`
 *
 * @param a
 * @param b
 */
export function booleanComparator(a: boolean, b: boolean): number {
  return a === b ? 0 : a ? -1 : 1;
}

/**
 * BigDecimal comparator that sorts in ascending order and also takes undefined values
 *  https://tanstack.com/table/v8/docs/api/features/sorting#sorting-functions
 * a > b ? 1 : b < a ? 1 : 0
 *
 * @param a
 * @param b
 */
export function bigDecimalComparator(
  a: BigDecimal | undefined,
  b: BigDecimal | undefined,
): number {
  if (!a || !b) {
    return 0;
  } else if (a.gt(b)) {
    return 1;
  } else if (a.lt(b)) {
    return -1;
  }

  return 0;
}
