import { RepayConvertErrorType } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';
import { WithClassnames } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

export function useRepayConvertReplayAmountErrorTooltipContent({
  formError,
}: WithClassnames<{
  formError: RepayConvertErrorType | undefined;
}>) {
  return useMemo(() => {
    switch (formError) {
      case 'max_exceeded':
        return "You've exceeded the max convert order size. Please enter a valid amount.";
      case 'not_borrowing':
        return "You aren't borrowing this asset.";
      case 'no_available_source':
        return 'No available balances to convert.';
      case 'invalid_input':
        return 'Please enter a valid amount.';
      default:
        return null;
    }
  }, [formError]);
}
