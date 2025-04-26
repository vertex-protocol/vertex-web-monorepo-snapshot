import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { ProvideVlpLiquidityFormErrorType } from 'client/modules/vlp/provide/hooks/useProvideVlpLiquidityDialog';
import { useMemo } from 'react';

export function useProvideVlpLiquidityAmountErrorTooltipContent({
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
      case 'below_min':
        return `The entered amount is less than the minimum amount. Please enter an amount greater than ${SEQUENCER_FEE_AMOUNT_USDC}.`;
      default:
        return null;
    }
  }, [formError]);
}
