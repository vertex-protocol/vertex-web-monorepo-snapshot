import { ProvideVlpLiquidityFormErrorType } from 'client/modules/vlp/provide/hooks/useProvideVlpLiquidityDialog';
import { useMemo } from 'react';

export function useRedeemVlpLiquidityAmountErrorTooltipContent({
  formError,
}: {
  formError: ProvideVlpLiquidityFormErrorType | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'max_exceeded':
        return 'This exceeds your max. Please enter a valid amount.';
      default:
        return null;
    }
  }, [formError]);
}
