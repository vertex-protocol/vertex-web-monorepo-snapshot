import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SkateVaultDepositDialog } from 'client/modules/skateVaults/dialogs/deposit/SkateVaultDepositDialog';
import { SkateVaultWithdrawDialog } from 'client/modules/skateVaults/dialogs/withdraw/SkateVaultWithdrawDialog';

export function VaultsDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'skate_vaults_deposit' && (
        <SkateVaultDepositDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'skate_vaults_withdraw' && (
        <SkateVaultWithdrawDialog {...currentDialog.params} />
      )}
    </>
  );
}
