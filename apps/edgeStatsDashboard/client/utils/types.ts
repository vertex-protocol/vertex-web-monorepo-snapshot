export type MappedNullable<TOriginalValue, TMappedValue> =
  TOriginalValue extends undefined ? undefined : TMappedValue;
