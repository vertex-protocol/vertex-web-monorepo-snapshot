import { BigDecimalish, toBigDecimal } from '@vertex-protocol/utils';

export interface SignValueMap<T> {
  positive: T;
  negative: T;
  zero: T;
  // If not given, uses the zero value
  undefined?: T;
}

export function signDependentValue<T>(
  value: BigDecimalish | undefined,
  mapping: SignValueMap<T>,
): T {
  if (value == null) {
    return mapping.undefined ?? mapping.zero;
  }
  const bigDecimalVal = toBigDecimal(value);
  if (bigDecimalVal.gt(0)) {
    return mapping.positive;
  } else if (bigDecimalVal.lt(0)) {
    return mapping.negative;
  } else {
    return mapping.zero;
  }
}
