import { BigDecimal } from '@vertex-protocol/client';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { RenderValueType } from './types';

export function getValueContent<TValue>(
  renderValue: RenderValueType<TValue>,
  value?: TValue,
) {
  if (typeof renderValue === 'function') {
    return renderValue(value);
  }

  // Force casting types here, if the value is not numerical, a custom render function should be used
  return formatNumber(value as unknown as BigDecimal, {
    formatSpecifier: renderValue,
  });
}
