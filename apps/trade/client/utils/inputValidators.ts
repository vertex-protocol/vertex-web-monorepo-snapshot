import { isPrivateKey } from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { isAddress } from 'viem';
import { z } from 'zod';

export const addressValidator = z.string().refine(isAddress);

export const privateKeyValidator = z.string().refine(isPrivateKey);

export const finiteBigDecimalValidator = z
  .string()
  .refine((val) => {
    const parsed = toBigDecimal(val);
    return parsed.isFinite();
  })
  .transform((val) => toBigDecimal(val));

export const positiveBigDecimalValidator = z
  .string()
  .refine((val) => {
    const parsed = toBigDecimal(val);
    return parsed.isFinite() && parsed.gt(0);
  })
  .transform((val) => toBigDecimal(val));

interface RangeValidatorOptions {
  minInclusive?: BigDecimal.Value;
  maxInclusive?: BigDecimal.Value;
  minExclusive?: BigDecimal.Value;
  maxExclusive?: BigDecimal.Value;
}

export const getRangeBigDecimalValidator = ({
  maxExclusive,
  maxInclusive,
  minExclusive,
  minInclusive,
}: RangeValidatorOptions) => {
  return z
    .string()
    .refine((val) => {
      const parsed = toBigDecimal(val);
      if (!parsed.isFinite()) {
        return;
      }

      if (maxExclusive != null && parsed.gte(maxExclusive)) {
        return;
      }
      if (maxInclusive != null && parsed.gt(maxInclusive)) {
        return;
      }
      if (minExclusive != null && parsed.lte(minExclusive)) {
        return;
      }
      if (minInclusive != null && parsed.lt(minInclusive)) {
        return;
      }

      return parsed;
    })
    .transform((val) => toBigDecimal(val));
};
