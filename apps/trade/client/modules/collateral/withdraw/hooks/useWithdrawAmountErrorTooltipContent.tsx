import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import { WithdrawErrorType } from 'client/modules/collateral/withdraw/types';

interface Params {
  formError: WithdrawErrorType | undefined;
  suggestBorrowing: boolean;
}

export function useWithdrawAmountErrorTooltipContent({
  formError,
  suggestBorrowing,
}: Params) {
  if (!formError) {
    return null;
  }

  return {
    max_exceeded: suggestBorrowing
      ? 'This exceeds the max withdrawable amount. Try borrowing instead.'
      : 'This exceeds the max borrowable amount. Please enter a valid amount.',
    below_min: 'Please withdraw more than the fee.',
    invalid_input: 'Please enter a valid amount.',
    vrtx_borrow: `${VRTX_TOKEN_INFO.symbol} cannot be borrowed. You will only be able to withdraw your own funds.`,
  }[formError];
}
