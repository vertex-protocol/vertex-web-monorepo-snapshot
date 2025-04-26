import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProvideLiquidityDialog } from 'client/modules/pools/provide/ProvideLiquidityDialog';
import { WithdrawLiquidityDialog } from 'client/modules/pools/withdraw/WithdrawLiquidityDialog';
import { ProvideVlpLiquidityDialog } from 'client/modules/vlp/provide/ProvideVlpLiquidityDialog';
import { RedeemVlpLiquidityDialog } from 'client/modules/vlp/redeem/RedeemVlpLiquidityDialog';

export function LpDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'provide_liquidity' && (
        <ProvideLiquidityDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'withdraw_liquidity' && (
        <WithdrawLiquidityDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'provide_vlp_liquidity' && (
        <ProvideVlpLiquidityDialog />
      )}
      {currentDialog?.type === 'redeem_vlp_liquidity' && (
        <RedeemVlpLiquidityDialog />
      )}
    </>
  );
}
