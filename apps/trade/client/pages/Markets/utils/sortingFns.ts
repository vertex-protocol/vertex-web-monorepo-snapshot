import { Row } from '@tanstack/react-table';

export function favoriteSortFn<T>(
  a: Row<T>,
  b: Row<T>,
  columnId: string,
): number {
  // true -> 1, false -> 0
  return Number(b.getValue(columnId)) - Number(a.getValue(columnId));
}
