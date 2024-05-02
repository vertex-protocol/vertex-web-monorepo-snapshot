import { useExecuteCloseAllPositions } from 'client/hooks/execute/placeOrder/useExecuteCloseAllPositions';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export function useCloseAllPositionsDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();
  const { mutateAsync, status } = useExecuteCloseAllPositions();

  useRunWithDelayOnCondition({
    condition: status === 'success',
    fn: hide,
    delay: 2000,
  });

  const buttonState = useMemo((): BaseActionButtonState => {
    if (status === 'pending') {
      return 'loading';
    } else if (status === 'success') {
      return 'success';
    } else if (status === 'idle') {
      return 'idle';
    } else {
      return 'disabled';
    }
  }, [status]);

  const onSubmit = async () => {
    const executeResultPromise = mutateAsync({});
    dispatchNotification({
      type: 'close_multi_positions',
      data: {
        executeResult: executeResultPromise,
      },
    });
  };

  return {
    onSubmit,
    buttonState,
  };
}
