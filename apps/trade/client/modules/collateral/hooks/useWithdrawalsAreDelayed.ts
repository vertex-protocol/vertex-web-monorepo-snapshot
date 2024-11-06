import { useLatestEventSubmissionIndex } from 'client/hooks/query/useLatestEventSubmissionIndex';
import { useNSubmissions } from 'client/hooks/query/useNSubmissions';
import { useMemo } from 'react';

export function useWithdrawalsAreDelayed() {
  const { data: latestEventSubmissionIndexData } =
    useLatestEventSubmissionIndex();
  const { data: nSubmissionsData } = useNSubmissions();

  return useMemo(() => {
    if (!latestEventSubmissionIndexData || !nSubmissionsData) {
      return false;
    }

    // There's a backlog of events if latestEventSubmissionIndex is much larger than nSubmissions
    return latestEventSubmissionIndexData.minus(nSubmissionsData).gt(1000);
  }, [latestEventSubmissionIndexData, nSubmissionsData]);
}
