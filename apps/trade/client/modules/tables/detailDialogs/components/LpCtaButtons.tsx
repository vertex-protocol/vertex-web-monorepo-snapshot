import { BigDecimal } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';

interface Props {
  productId: number;
  lpAmount: BigDecimal | undefined;
}

export function LpCtaButtons({ productId, lpAmount }: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const userActionState = useUserActionState();
  const disableProvide = userActionState !== 'allow_all';
  const disableWithdraw = userActionState === 'block_all' || lpAmount?.lte(0);

  return (
    <div className="flex flex-col gap-y-3">
      <SecondaryButton
        title="Provide"
        disabled={disableProvide}
        onClick={() => {
          showDialogForProduct({
            dialogType: 'provide_liquidity',
            productId,
          });
        }}
      >
        Provide
      </SecondaryButton>
      <SecondaryButton
        title="Withdraw"
        disabled={disableWithdraw}
        onClick={() => {
          showDialogForProduct({
            dialogType: 'withdraw_liquidity',
            productId,
          });
        }}
      >
        Withdraw
      </SecondaryButton>
    </div>
  );
}
