import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { Address } from 'viem';

interface SkateVaultActionButtonsProps extends WithClassnames {
  vaultAddress: Address;
  vaultName: string;
}

export function SkateVaultActionButtons({
  className,
  vaultAddress,
  vaultName,
}: SkateVaultActionButtonsProps) {
  const { show } = useDialog();
  const isConnected = useIsConnected();

  const disableButtons = !isConnected;

  return (
    <div className={joinClassNames('flex gap-x-1', className)}>
      <SecondaryButton
        onClick={() =>
          show({
            type: 'skate_vaults_deposit',
            params: { vaultAddress, vaultName },
          })
        }
        className="flex-1"
        disabled={disableButtons}
      >
        Deposit
      </SecondaryButton>
      <SecondaryButton
        onClick={() =>
          show({
            type: 'skate_vaults_withdraw',
            params: { vaultAddress, vaultName },
          })
        }
        className="flex-1"
        disabled={disableButtons}
      >
        Withdraw
      </SecondaryButton>
    </div>
  );
}
