import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function AppBottomSheet({ className }: WithClassnames) {
  const { show } = useDialog();
  const userStateError = useUserStateError();
  const { switchChain, primaryChain } = useEVMContext();

  if (!userStateError) {
    return null;
  }

  const { message, onClick } = {
    not_connected: {
      message: 'Connect Wallet',
      onClick: () => show({ type: 'connect', params: {} }),
    },
    incorrect_chain: {
      message: `Switch to ${primaryChain.name}`,
      onClick: () => switchChain(),
    },
    requires_deposit: {
      message: 'Deposit Funds',
      onClick: () => show({ type: 'deposit', params: {} }),
    },
    requires_single_signature_setup: {
      message: 'Setup 1CT',
      onClick: () => show({ type: 'signature_mode_settings', params: {} }),
    },
    requires_sign_once_approval: {
      message: 'Approve Trading',
      onClick: () => show({ type: 'single_signature_reapproval', params: {} }),
    },
  }[userStateError];

  return (
    <div
      className={joinClassNames(
        'fixed w-full max-w-[450px] px-6 lg:hidden',
        'bottom-4 left-1/2 -translate-x-1/2',
        className,
      )}
    >
      <div className="bg-background/50 rounded p-1 backdrop-blur-sm">
        <PrimaryButton className="w-full" onClick={onClick}>
          {message}
        </PrimaryButton>
      </div>
    </div>
  );
}
