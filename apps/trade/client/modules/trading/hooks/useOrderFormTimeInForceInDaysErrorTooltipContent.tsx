import { OrderFormError } from 'client/modules/trading/types';
import { useMemo } from 'react';

export function useOrderFormTimeInForceInDaysErrorTooltipContent({
  formError,
}: {
  formError: OrderFormError | undefined;
}) {
  return useMemo(() => {
    switch (formError) {
      case 'time_in_force_in_days_invalid_input':
        return 'Please enter a valid number';
      case 'time_in_force_in_days_out_of_range':
        return 'Please enter a value between 1 and 365';
      default:
        return null;
    }
  }, [formError]);
}
