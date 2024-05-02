import { z } from 'zod';
import { ZodTypeDef } from 'zod/lib/types';

/**
 * Safely parse input data using a Zod validator, but returns undefined if parsing fails instead of a conditional type
 *
 * @param validator - The Zod validator for the expected output type.
 * @param input - The input data to be parsed.
 * @returns data - parsed data if successful, or undefined if parsing fails.
 */
export function safeParseForData<
  // Generic types come directly from definition of `ZodType`
  Output = any,
  Def extends ZodTypeDef = ZodTypeDef,
  Input = Output,
>(validator: z.ZodType<Output, Def, Input>, input: unknown) {
  const parsed = validator.safeParse(input);
  if (!parsed.success) {
    return;
  }

  return parsed.data;
}
