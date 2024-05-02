import { useMemo } from 'react';
import { WithdrawErrorType } from '../types';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';

interface Params {
  formError: WithdrawErrorType | undefined;
  suggestBorrowing: boolean;
}

export function useWithdrawAmountErrorTooltipContent({
  formError,
  suggestBorrowing,
}: Params) {
  return useMemo(() => {
    switch (formError) {
      case 'max_exceeded':
        return suggestBorrowing
          ? 'This exceeds the max withdrawable amount. Try borrowing instead.'
          : 'This exceeds the max borrowable amount. Please enter a valid amount.';
      case 'under_min':
        return 'Please withdraw more than the fee.';
      case 'invalid_input':
        return 'Please enter a valid amount.';
      case 'vrtx_borrow':
        return `${VRTX_TOKEN_INFO.symbol} cannot be borrowed. You will only be able to withdraw your own funds.`;
      default:
        return null;
    }
  }, [formError, suggestBorrowing]);
}
