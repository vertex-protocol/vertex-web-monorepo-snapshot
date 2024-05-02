import { BigDecimal } from '@vertex-protocol/client';
import { OrderFormError } from '../types';
import { useMemo } from 'react';

export function useOrderFormPriceErrorTooltipContent({
  formError,
  priceIncrement,
}: {
  formError: OrderFormError | undefined;
  priceIncrement: BigDecimal | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return `Please enter a valid amount.`;
      case 'invalid_price_increment':
        return `Price must be in a multiple of ${
          priceIncrement?.toString() ?? ''
        }`;
      default:
        return null;
    }
  }, [formError, priceIncrement]);
}
