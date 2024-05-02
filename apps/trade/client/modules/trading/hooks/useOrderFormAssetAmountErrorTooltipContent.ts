import { BigDecimal } from '@vertex-protocol/client';
import { OrderFormError } from '../types';
import { useMemo } from 'react';

export function useOrderFormAssetAmountErrorTooltipContent({
  formError,
  sizeIncrement,
  minAssetOrderSize,
}: {
  formError: OrderFormError | undefined;
  sizeIncrement: BigDecimal | undefined;
  minAssetOrderSize: BigDecimal | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return `Please enter a valid amount.`;
      case 'below_min':
        return `Amount must be at least ${minAssetOrderSize?.toString() ?? ''}`;
      case 'invalid_size_increment':
        return `Amount must be in a multiple of ${
          sizeIncrement?.toString() ?? ''
        }`;
      case 'max_exceeded':
        return 'This trade exceeds your max position. Cancel open orders or deposit more collateral to increase funds available.';
      default:
        return null;
    }
  }, [formError, minAssetOrderSize, sizeIncrement]);
}
