import { GetExportHistoryDataParams } from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { clamp } from 'lodash';

export function updateProgressFrac(
  { startTimeMillis, endTimeMillis }: GetExportHistoryDataParams,
  { setProgressFrac }: GetExportHistoryDataContext,
  earliestItemDate: Date | undefined,
) {
  if (!earliestItemDate) {
    return;
  }

  const earliestMillis = earliestItemDate.getTime();
  const progressFrac = clamp(
    (endTimeMillis - earliestMillis) / (endTimeMillis - startTimeMillis),
    0,
    1,
  );
  setProgressFrac(progressFrac);
}
