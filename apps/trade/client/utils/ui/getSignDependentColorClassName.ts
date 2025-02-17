import { BigDecimal } from '@vertex-protocol/client';
import { signDependentValue } from '@vertex-protocol/react-client';

export function getSignDependentColorClassName(value: BigDecimal | undefined) {
  return signDependentValue(value, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-primary',
  });
}
