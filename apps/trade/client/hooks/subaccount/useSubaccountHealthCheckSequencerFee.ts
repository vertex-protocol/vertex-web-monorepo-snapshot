import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { useMemo } from 'react';
import { removeDecimals } from 'client/utils/decimalAdjustment';

/**
 * Returns the decimal adjusted health check sequencer fee, which is taken for mint / burn LP events
 */
export function useSubaccountHealthCheckSequencerFee() {
  const { data } = useSubaccountFeeRates();

  return useMemo(() => {
    return removeDecimals(data?.healthCheckSequencerFee);
  }, [data?.healthCheckSequencerFee]);
}
