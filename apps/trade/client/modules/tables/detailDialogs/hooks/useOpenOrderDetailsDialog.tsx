import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { MarketInfoCellData } from '../../types/MarketInfoCellData';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { OrderType } from 'client/modules/trading/types';

interface Params {
  isTrigger: boolean;
  marketInfo: MarketInfoCellData;
  productId: number;
  price: BigDecimal;
  totalAmount: BigDecimal;
  digest: string;
  orderType: OrderType;
}

export function useOpenOrderDetailsDialog({
  productId,
  isTrigger,
  digest,
  totalAmount,
  marketInfo,
  orderType,
}: Params) {
  const userActionState = useUserActionState();
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const { productType } = marketInfo;
  const { hide } = useDialog();

  useRunWithDelayOnCondition({
    condition: status === 'success',
    fn: hide,
    delay: 1000,
  });

  const isCancelling = status === 'pending';
  // Users should be able to cancel orders even if a deposit is required
  const disableCancelOrder = userActionState === 'block_all' || isCancelling;

  const isPerp = productType === ProductEngineType.PERP;

  const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
    marketInfo.sizeIncrement,
  );

  const cancelOrderHandler = () => {
    cancelOrdersWithNotification({
      orders: [
        {
          isTrigger,
          productId,
          digest,
          totalAmount,
          orderType,
        },
      ],
    });
  };

  return {
    disableCancelOrder,
    cancelOrderHandler,
    sizeFormatSpecifier,
    isPerp,
  };
}
