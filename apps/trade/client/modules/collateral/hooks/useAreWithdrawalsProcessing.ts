import { useNSubmissions } from 'client/hooks/query/useNSubmissions';
import { useMarkedWithdrawPoolIdxs } from 'client/hooks/query/withdrawPool/useMarkedWithdrawPoolIdxs';
import { useMemo } from 'react';

/**
 * A hook to check if the given submission indices are processing in ex. (withdrawal or fast withdrawal are not completed).
 * @param submissionIndices
 * @returns
 */
export function useAreWithdrawalsProcessing({
  submissionIndices,
}: {
  submissionIndices: string[] | undefined;
}) {
  const { data: nSubmissionsData } = useNSubmissions();
  const { data: markedWithdrawPoolIdxsData } = useMarkedWithdrawPoolIdxs({
    submissionIndices,
  });

  return useMemo(() => {
    if (!nSubmissionsData || !submissionIndices) {
      return;
    }

    const isProcessingBySubmissionIndex: Record<string, boolean> = {};

    submissionIndices.forEach((submissionIndex) => {
      // Check if marked complete. In case it's not loaded yet, default to false.
      const isIdxMarkedComplete =
        markedWithdrawPoolIdxsData?.[submissionIndex] ?? false;

      // nSubmissions.lt(submissionIndex) would be true in case of fast withdraw.
      // Which is not correct. To get complete state, we need to check in withdrawal pool if the submission index is marked as complete or not.
      const isProcessing =
        nSubmissionsData.lt(submissionIndex) && !isIdxMarkedComplete;

      isProcessingBySubmissionIndex[submissionIndex] = isProcessing;
    });

    return isProcessingBySubmissionIndex;
  }, [markedWithdrawPoolIdxsData, nSubmissionsData, submissionIndices]);
}
