import { BigDecimal } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';

interface Props {
  productId: number;
  lpAmount: BigDecimal | undefined;
}

export function LpCtaButtons({ productId, lpAmount }: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const isConnected = useIsConnected();
  const disableProvide = !isConnected;
  const disableWithdraw = !isConnected || lpAmount?.lte(0);

  return (
    <div className="flex flex-col gap-y-3">
      <SecondaryButton
        title="Provide"
        disabled={disableProvide}
        onClick={() => {
          showDialogForProduct({
            dialogType: 'provide_liquidity',
            productId,
            navBehavior: 'push',
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
            navBehavior: 'push',
          });
        }}
      >
        Withdraw
      </SecondaryButton>
    </div>
  );
}
