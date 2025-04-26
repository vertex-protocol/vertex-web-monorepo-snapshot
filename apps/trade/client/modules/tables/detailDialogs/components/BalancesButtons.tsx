import {
  BigDecimal,
  QUOTE_PRODUCT_ID,
  VLP_PRODUCT_ID,
} from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props {
  productId: number;
  balanceAmount: BigDecimal;
}

export function BalancesButtons({ productId, balanceAmount }: Props) {
  const { hide } = useDialog();
  const showDialogForProduct = useShowDialogForProduct();
  const pushTradePage = usePushTradePage();

  const isConnected = useIsConnected();
  const disableTrade =
    productId === QUOTE_PRODUCT_ID || productId === VLP_PRODUCT_ID;
  const disableDeposit = !isConnected;
  const disableBorrow = !isConnected;
  const disableRepay = !isConnected || balanceAmount.gte(0);
  const disableWithdraw = !isConnected || balanceAmount.lte(0);

  return (
    <div className="flex flex-col gap-y-3">
      <SecondaryButton
        onClick={() => {
          showDialogForProduct({
            dialogType: 'deposit',
            productId,
            navBehavior: 'push',
          });
        }}
        disabled={disableDeposit}
      >
        Deposit
      </SecondaryButton>
      <SecondaryButton
        onClick={() => {
          hide();
          pushTradePage({
            productId,
          });
        }}
        disabled={disableTrade}
      >
        Trade
      </SecondaryButton>
      <SecondaryButton
        onClick={() => {
          showDialogForProduct({
            dialogType: 'withdraw',
            productId,
            navBehavior: 'push',
          });
        }}
        disabled={disableWithdraw}
      >
        Withdraw
      </SecondaryButton>
      <SecondaryButton
        onClick={() => {
          showDialogForProduct({
            dialogType: 'borrow',
            productId,
            navBehavior: 'push',
          });
        }}
        disabled={disableBorrow}
      >
        Borrow
      </SecondaryButton>
      <SecondaryButton
        onClick={() => {
          showDialogForProduct({
            dialogType: 'repay',
            productId,
            navBehavior: 'push',
          });
        }}
        disabled={disableRepay}
      >
        Repay
      </SecondaryButton>
    </div>
  );
}
