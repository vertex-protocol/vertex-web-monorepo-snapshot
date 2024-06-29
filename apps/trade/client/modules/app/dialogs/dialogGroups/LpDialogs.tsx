import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProvideLiquidityDialog } from 'client/modules/pools/provide/ProvideLiquidityDialog';
import { WithdrawLiquidityDialog } from 'client/modules/pools/withdraw/WithdrawLiquidityDialog';

export function LpDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'provide_liquidity' && (
        <ProvideLiquidityDialog />
      )}
      {currentDialog?.type === 'withdraw_liquidity' && (
        <WithdrawLiquidityDialog />
      )}
    </>
  );
}
