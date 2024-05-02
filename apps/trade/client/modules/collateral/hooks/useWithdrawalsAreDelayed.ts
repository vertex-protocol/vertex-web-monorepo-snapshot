import { useLatestEventSubmissionIndex } from 'client/hooks/query/useLatestEventSubmissionIndex';
import { useNSubmissions } from 'client/hooks/query/useNSubmissions';
import { useMemo } from 'react';

export function useWithdrawalsAreDelayed() {
  const { data: latestEventSubmissionIndex } = useLatestEventSubmissionIndex();
  const { data: nSubmissions } = useNSubmissions();

  return useMemo(() => {
    if (!latestEventSubmissionIndex || !nSubmissions) {
      return false;
    }

    // There's a backlog of events if latestEventSubmissionIndex is much larger than nSubmissions
    return latestEventSubmissionIndex.minus(nSubmissions).gt(1000);
  }, [latestEventSubmissionIndex, nSubmissions]);
}
