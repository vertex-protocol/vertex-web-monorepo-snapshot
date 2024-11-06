import { z } from 'zod';

// Needed because base Zod cannot handle numeric enum types (such as ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS)
export function zodNumericEnum<ValuesType extends readonly number[]>(
  values: ValuesType,
) {
  return z.number().refine((val) => values.includes(val)) as z.ZodType<
    ValuesType[number]
  >;
}

// Needed because JavaScript implicitly converts numeric object keys to strings, so convert them back to number
export function zodNumericObjectKey() {
  return z.coerce.number().finite();
}

export function validateOrReset<ValueType>(
  newValue: ValueType | undefined,
  defaultValue: ValueType,
  valueSchema: z.ZodType,
): ValueType {
  const parsedNewValue = valueSchema.safeParse(newValue);
  return parsedNewValue.success ? parsedNewValue.data : defaultValue;
}
