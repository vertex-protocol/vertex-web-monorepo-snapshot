import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { RepayConvertAmountInputErrorType } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';

interface Params extends WithClassnames {
  amountInputError: RepayConvertAmountInputErrorType | undefined;
  sizeIncrement: BigDecimal | undefined;
}

export function useRepayConvertReplayAmountErrorTooltipContent({
  amountInputError,
  sizeIncrement,
}: Params) {
  if (!amountInputError) {
    return null;
  }

  return {
    max_exceeded:
      "You've exceeded the max convert order size. Please enter a valid amount.",
    invalid_input: 'Please enter a valid amount.',
    invalid_size_increment: `Amount must be in a multiple of ${sizeIncrement?.toString() ?? ''}`,
  }[amountInputError];
}
