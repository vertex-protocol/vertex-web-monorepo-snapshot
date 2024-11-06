import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useExecuteExportHistory } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/useExecuteExportHistory';
import { HistoryExportType } from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { endOfDay, startOfDay, subMonths, subWeeks, subYears } from 'date-fns';
import { useMemo, useState } from 'react';

export function useExportHistoryDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  // We can safely assume that the current date will not meaningfully change during the lifetime of this hook
  const nowDate = useMemo(() => {
    return new Date();
  }, []);

  const [startDate, setStartDateState] = useState<Date>();
  const [endDate, setEndDateState] = useState<Date>();
  const [selectedExportType, setSelectedExportType] =
    useState<HistoryExportType>('trades');

  const { mutateAsync, isSuccess, isPending, reset } =
    useExecuteExportHistory();

  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: reset,
  });

  /*
  Util fns for setting start and end dates that span to the beginning and end of the day, respectively
   */
  const setStartDate = (date: Date | null | undefined) => {
    setStartDateState(date ? startOfDay(date) : undefined);
  };

  const setEndDate = (date: Date | null | undefined) => {
    setEndDateState(date ? endOfDay(date) : undefined);
  };

  const onLastWeekClick = () => {
    setStartDate(subWeeks(nowDate, 1));
    setEndDate(nowDate);
  };

  const onLastMonthClick = () => {
    setStartDate(subMonths(nowDate, 1));
    setEndDate(nowDate);
  };

  const onLastYearClick = () => {
    setStartDate(subYears(nowDate, 1));
    setEndDate(nowDate);
  };

  const onSubmit = async () => {
    if (!startDate || !endDate) {
      return;
    }

    const mutationPromise = mutateAsync({
      endTimeMillis: endDate.getTime(),
      startTimeMillis: startDate.getTime(),
      type: selectedExportType,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        executionData: {
          serverExecutionResult: mutationPromise,
        },
        errorNotificationTitle: 'Export History',
      },
    });
  };

  const buttonState = useMemo((): BaseActionButtonState => {
    if (isPending) {
      return 'loading';
    }
    if (isSuccess) {
      return 'success';
    }
    // Export type is required, so just need to check dates here
    if (!startDate || !endDate || startDate > endDate) {
      return 'disabled';
    }
    return 'idle';
  }, [endDate, isPending, isSuccess, startDate]);

  return {
    startDate,
    endDate,
    nowDate,
    setStartDate,
    setEndDate,
    onLastWeekClick,
    onLastMonthClick,
    onLastYearClick,
    selectedExportType,
    setSelectedExportType,
    onSubmit,
    buttonState,
  };
}
