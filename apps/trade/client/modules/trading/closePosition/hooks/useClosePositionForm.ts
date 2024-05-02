import { BigDecimal } from '@vertex-protocol/utils';
import { useExecuteCancelReduceOnlyOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelReduceOnlyOrdersWithNotification';
import { useExecuteClosePosition } from 'client/hooks/execute/placeOrder/useExecuteClosePosition';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import {
  PerpPositionItem,
  usePerpPositions,
} from 'client/hooks/subaccount/usePerpPositions';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

interface UseClosePositionForm {
  perpPositionItem?: PerpPositionItem;
  sizeIncrement: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
  amountClosedPnl: BigDecimal | undefined;
  amountRealizedPnl: BigDecimal | undefined;
  disableSlider: boolean;
  fractionToClose: number;
  buttonState: BaseActionButtonState;
  closePosition: ReturnType<typeof useExecuteClosePosition>;
  setFractionToClose: Dispatch<SetStateAction<number>>;
  onSubmit: () => void;
}

// Conscious decision here to NOT check for max order size, given that this submits a market order
// This allows users to easily submit close position orders of any size if their initial health < 0
export function useClosePositionForm({
  productId,
}: {
  productId: number;
}): UseClosePositionForm {
  const { hide } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();
  const executeClosePosition = useExecuteClosePosition();
  const { data: positionsData } = usePerpPositions();
  const { data: staticMarketsData } = useAllMarketsStaticData();
  const { cancelReduceOnlyOrdersWithNotification } =
    useExecuteCancelReduceOnlyOrdersWithNotification();

  const [fractionToClose, setFractionToClose] = useState<number>(1); // 100% as default

  // Perp Position Item
  const perpPositionItem = positionsData?.find(
    (position) => position.productId === productId,
  );

  useRunWithDelayOnCondition({
    condition: executeClosePosition.isSuccess,
    fn: hide,
    // Adding a shorter delay so dialog closes after success
    delay: 2000,
  });

  // Action Button State
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeClosePosition.isPending) {
      return 'loading';
    } else if (executeClosePosition.isSuccess) {
      return 'success';
    } else if (fractionToClose) {
      return 'idle';
    } else {
      return 'disabled';
    }
  }, [
    fractionToClose,
    executeClosePosition.isPending,
    executeClosePosition.isSuccess,
  ]);

  // Amount of current close
  const amountClosedPnl = useMemo(() => {
    if (!perpPositionItem || !fractionToClose) return;

    return perpPositionItem.amount.times(fractionToClose).abs();
  }, [perpPositionItem, fractionToClose]);

  // Amount of PnL of current close
  const amountRealizedPnl = useMemo(() => {
    if (!perpPositionItem?.estimatedPnlUsd || !fractionToClose) return;

    return perpPositionItem?.estimatedPnlUsd?.times(fractionToClose);
  }, [perpPositionItem?.estimatedPnlUsd, fractionToClose]);

  const staticMarketData = staticMarketsData?.perp[productId];
  const sizeIncrement = staticMarketData?.sizeIncrement;
  const priceIncrement = staticMarketData?.priceIncrement;

  // Handle Close Position
  const onSubmit = useCallback(() => {
    if (
      !perpPositionItem ||
      !fractionToClose ||
      perpPositionItem.amount.isZero()
    )
      return;

    const orderActionResult = executeClosePosition.mutateAsync({
      productId,
      fractionToClose,
    });

    // Cancel all reduce only orders for product
    cancelReduceOnlyOrdersWithNotification([productId]);

    dispatchNotification({
      type: 'close_position',
      data: {
        closePositionParams: {
          fraction: fractionToClose,
          amount: perpPositionItem.amount,
          metadata: {
            ...perpPositionItem.metadata,
            priceIncrement,
          },
        },
        executeResult: orderActionResult,
      },
    });
  }, [
    perpPositionItem,
    fractionToClose,
    executeClosePosition,
    productId,
    cancelReduceOnlyOrdersWithNotification,
    dispatchNotification,
    priceIncrement,
  ]);

  return {
    perpPositionItem,
    amountClosedPnl,
    amountRealizedPnl,
    disableSlider: !perpPositionItem?.amount || buttonState === 'loading',
    fractionToClose,
    buttonState,
    closePosition: executeClosePosition,
    sizeIncrement,
    priceIncrement,
    setFractionToClose,
    onSubmit,
  };
}
