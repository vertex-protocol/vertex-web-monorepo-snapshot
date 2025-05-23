import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useCanUserExecute } from 'client/hooks/subaccount/useCanUserExecute';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
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
  const canUserExecute = useCanUserExecute();
  const { cancelOrdersWithNotification, status } =
    useExecuteCancelOrdersWithNotification();
  const { productType } = marketInfo;
  const { hide } = useDialog();
  const pushTradePage = usePushTradePage();

  useRunWithDelayOnCondition({
    condition: status === 'success',
    fn: hide,
    delay: 1000,
  });

  const isCancelling = status === 'pending';
  const disableCancelOrder = !canUserExecute || isCancelling;

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
          decimalAdjustedTotalAmount: totalAmount,
          orderType,
        },
      ],
    });
  };

  const navigateToTradePage = () => {
    hide();
    pushTradePage({ productId });
  };

  return {
    disableCancelOrder,
    cancelOrderHandler,
    navigateToTradePage,
    sizeFormatSpecifier,
    isPerp,
  };
}
