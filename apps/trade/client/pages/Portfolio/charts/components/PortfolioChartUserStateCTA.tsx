import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function PortfolioChartUserStateCTA({
  userStateError,
}: {
  userStateError?: UserStateError;
}) {
  const { show } = useDialog();
  const ctaContent = (() => {
    switch (userStateError) {
      case 'not_connected':
        return (
          <>
            <p>Connect your wallet to start trading.</p>
            <PrimaryButton
              onClick={() => show({ type: 'connect', params: {} })}
            >
              Connect Wallet
            </PrimaryButton>
          </>
        );
      case 'requires_deposit':
        return (
          <>
            <p>Deposit funds into your account to start trading.</p>
            <PrimaryButton
              onClick={() => show({ type: 'deposit', params: {} })}
            >
              Deposit Funds
            </PrimaryButton>
          </>
        );
    }
  })();

  return (
    <div
      className={joinClassNames(
        'flex w-56 flex-col gap-y-3 rounded-md',
        'bg-surface-2 px-4 py-3',
        'text-text-secondary text-center text-xs',
      )}
    >
      {ctaContent}
    </div>
  );
}
