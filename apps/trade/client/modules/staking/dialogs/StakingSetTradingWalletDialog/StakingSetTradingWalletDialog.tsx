import { CompactInput, PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { useExecuteStakingSetTradingWallet } from 'client/hooks/execute/vrtxToken/useExecuteStakingSetTradingWallet';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useEffect, useState } from 'react';
import { isAddress } from 'viem';

export function StakingSetTradingWalletDialog() {
  const { hide } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const { data: accountStakingV2State } = useAccountStakingV2State();
  const {
    mutateAsync,
    status: mutationStatus,
    data: mutationData,
    reset: resetMutation,
  } = useExecuteStakingSetTradingWallet();

  const [addressInput, setAddressInput] = useState('');

  const cleanedAddress = addressInput.trim();
  const isValidAddress = isAddress(cleanedAddress);

  const onChainMutationStatus = useOnChainMutationStatus({
    mutationStatus,
    txHash: mutationData,
  });

  // Reset mutation on success
  useRunWithDelayOnCondition({
    condition: onChainMutationStatus.isSuccess,
    fn: resetMutation,
  });

  // Sync with contract data
  const delegatedTradingWallet = accountStakingV2State?.delegatedTradingWallet;
  useEffect(() => {
    if (delegatedTradingWallet) {
      setAddressInput(delegatedTradingWallet);
    }
  }, [delegatedTradingWallet]);

  const onSaveClicked = () => {
    if (!isValidAddress) {
      return;
    }

    const txHashPromise = mutateAsync({
      address: cleanedAddress,
    });
    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Failed to Update',
        executionData: {
          txHashPromise,
        },
      },
    });
  };

  const buttonContent = (() => {
    if (onChainMutationStatus.isLoading) {
      return 'Confirm Transaction';
    }
    if (onChainMutationStatus.isSuccess) {
      return <ButtonStateContent.Success message="Saved" />;
    }
    return 'Save';
  })();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Set Trading Wallet
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <p className="text-text-tertiary text-xs">
          Set a beneficiary trading wallet for your staked VRTX to factor into
          market maker rebate calculations.
        </p>
        <CompactInput
          value={addressInput}
          placeholder="0x..."
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <PrimaryButton
          onClick={onSaveClicked}
          disabled={!isValidAddress}
          isLoading={onChainMutationStatus.isLoading}
        >
          {buttonContent}
        </PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
