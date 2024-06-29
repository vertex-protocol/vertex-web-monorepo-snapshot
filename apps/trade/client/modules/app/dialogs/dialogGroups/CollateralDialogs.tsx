import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BridgeDialog } from 'client/modules/collateral/bridge/components/BridgeDialog';
import { DepositDialog } from 'client/modules/collateral/deposit/components/DepositDialog';
import { RepayDialog } from 'client/modules/collateral/repay/RepayDialog';
import { WithdrawDialog } from 'client/modules/collateral/withdraw/components/WithdrawDialog';

export function CollateralDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'deposit' && <DepositDialog />}
      {currentDialog?.type === 'bridge' && <BridgeDialog />}
      {currentDialog?.type === 'withdraw' && (
        <WithdrawDialog defaultEnableBorrows={false} />
      )}
      {currentDialog?.type === 'repay' && <RepayDialog />}
      {currentDialog?.type === 'borrow' && (
        <WithdrawDialog defaultEnableBorrows />
      )}
    </>
  );
}
