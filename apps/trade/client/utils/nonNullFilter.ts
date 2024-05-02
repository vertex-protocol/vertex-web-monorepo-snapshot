export function nonNullFilter<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value != null;
}
