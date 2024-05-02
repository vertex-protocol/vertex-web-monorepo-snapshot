import { BigDecimal, QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface Props {
  productId: number;
  balanceAmount: BigDecimal;
}

export function BalancesButtons({ productId, balanceAmount }: Props) {
  const { hide } = useDialog();
  const showDialogForProduct = useShowDialogForProduct();
  const pushTradePage = usePushTradePage();
  const userActionState = useUserActionState();

  const disableTrade = productId === QUOTE_PRODUCT_ID;
  const disableDeposit = userActionState === 'block_all';
  const disableBorrow = userActionState !== 'allow_all';
  const disableRepay = userActionState === 'block_all' || balanceAmount.gte(0);
  const disableWithdraw =
    userActionState !== 'allow_all' || balanceAmount.lte(0);

  return (
    <div className="flex flex-col gap-y-3">
      <SecondaryButton
        size="md"
        onClick={() => {
          showDialogForProduct({
            dialogType: 'deposit',
            productId,
          });
        }}
        disabled={disableDeposit}
      >
        Deposit
      </SecondaryButton>
      <SecondaryButton
        size="md"
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
        size="md"
        onClick={() => {
          showDialogForProduct({
            dialogType: 'withdraw',
            productId,
          });
        }}
        disabled={disableWithdraw}
      >
        Withdraw
      </SecondaryButton>
      <SecondaryButton
        size="md"
        onClick={() => {
          showDialogForProduct({
            dialogType: 'borrow',
            productId,
          });
        }}
        disabled={disableBorrow}
      >
        Borrow
      </SecondaryButton>
      <SecondaryButton
        size="md"
        onClick={() => {
          showDialogForProduct({
            dialogType: 'repay',
            productId,
          });
        }}
        disabled={disableRepay}
      >
        Repay
      </SecondaryButton>
    </div>
  );
}
