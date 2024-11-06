import { Row, SortingFn } from '@tanstack/table-core';
import { BigDecimal } from '@vertex-protocol/utils';
import { bigDecimalComparator } from 'client/utils/comparators';

// A sort fn that uses the value of `context.getValue()` of the current column
// Should be used if `context.getValue()` returns a `BigDecimal`
export function bigDecimalSortFn<T>(
  a: Row<T>,
  b: Row<T>,
  columnId: string,
): number {
  return bigDecimalComparator(a.getValue(columnId), b.getValue(columnId));
}

// A sort fn factory that uses a nested value of `context.getValue()` of the current column
// Should be used if `context.getValue()` returns an object with `BigDecimal` values
export function getKeyedBigDecimalSortFn<T>(
  keyOfColumnValue: string,
): SortingFn<T> {
  const sortFn: SortingFn<T> = (a, b, columnId) => {
    // Column values can be nullable, so we need to handle that case with the "?." accessor.
    const valueA =
      a.getValue<Record<string, BigDecimal>>(columnId)?.[keyOfColumnValue];
    const valueB =
      b.getValue<Record<string, BigDecimal>>(columnId)?.[keyOfColumnValue];

    return bigDecimalComparator(valueA, valueB);
  };
  return sortFn;
}

// A sort fn factory that takes in a callback of `(rowValues) => BigDecimal`
// Used to retrieve a custom `BigDecimal` to sort by
export function getCustomGetterBigDecimalSortFn<T>(
  valueExtractor: (row: Row<T>) => BigDecimal,
): SortingFn<T> {
  const sortFn: SortingFn<T> = (a, b) => {
    const valueA = valueExtractor(a);
    const valueB = valueExtractor(b);
    return bigDecimalComparator(valueA, valueB);
  };
  return sortFn;
}

type SortablePrimitive = string | number | boolean | bigint;

/**
 * A sort fn factory that uses a nested value of `context.getValue()` for the current column.
 * Should be used when sorting a primitive value (ie. string | number | boolean | bigint).
 */
export function getKeyedPrimitiveSortFn<T>(
  keyOfColumnValue: string,
): SortingFn<T> {
  const sortFn: SortingFn<T> = (a, b, columnId) => {
    // Column values can be nullable, so we need to handle that case with the "?." accessor.
    const valueA =
      a.getValue<Record<string, SortablePrimitive>>(columnId)?.[
        keyOfColumnValue
      ];
    const valueB =
      b.getValue<Record<string, SortablePrimitive>>(columnId)?.[
        keyOfColumnValue
      ];

    return valueA == valueB ? 0 : valueA > valueB ? 1 : -1;
  };
  return sortFn;
}
