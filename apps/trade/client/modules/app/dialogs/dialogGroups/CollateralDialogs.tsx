import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BridgeDialog } from 'client/modules/collateral/bridge/components/BridgeDialog';
import { DepositDialogWithFunkit } from 'client/modules/collateral/deposit/components/DepositDialogWithFunkit';
import { FastWithdrawDialog } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawDialog';
import { RepayDialog } from 'client/modules/collateral/repay/RepayDialog';
import { WithdrawDialog } from 'client/modules/collateral/withdraw/components/WithdrawDialog';
import { TransakNoticeDialog } from 'client/modules/transak/TransakNoticeDialog';

export function CollateralDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'deposit' && (
        <DepositDialogWithFunkit {...currentDialog.params} />
      )}
      {currentDialog?.type === 'bridge' && <BridgeDialog />}
      {currentDialog?.type === 'withdraw' && (
        <WithdrawDialog
          {...currentDialog.params}
          defaultEnableBorrows={false}
        />
      )}
      {currentDialog?.type === 'fast_withdraw' && (
        <FastWithdrawDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'repay' && (
        <RepayDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'borrow' && (
        <WithdrawDialog {...currentDialog.params} defaultEnableBorrows />
      )}
      {currentDialog?.type === 'transak_onramp_notice' && (
        <TransakNoticeDialog />
      )}
    </>
  );
}
