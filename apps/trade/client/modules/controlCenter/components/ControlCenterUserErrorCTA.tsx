import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ReactNode } from 'react';

export function ControlCenterUserErrorCTA({
  userStateError,
  className,
}: WithClassnames<{
  userStateError: UserStateError;
}>) {
  const { show } = useDialog();
  const { primaryChain, switchChain } = useEVMContext();

  switch (userStateError) {
    case 'requires_sign_once_approval':
      return (
        <CTAPane
          title="Welcome back!"
          description="You have One-Click Trading enabled. Please approve trading before starting this session."
          actionItem={
            <PrimaryButton
              as="div"
              size="lg"
              onClick={() =>
                show({ type: 'single_signature_reapproval', params: {} })
              }
              className="w-full"
            >
              Approve Trading
            </PrimaryButton>
          }
          className={className}
        />
      );
    case 'incorrect_chain':
      return (
        <CTAPane
          title="Welcome back!"
          actionItem={
            <PrimaryButton
              size="lg"
              className="w-full"
              onClick={() => switchChain()}
            >
              Switch to {primaryChain.name}
            </PrimaryButton>
          }
          className={className}
        />
      );
    case 'requires_deposit':
      return (
        <CTAPane
          title="Welcome!"
          actionItem={
            <PrimaryButton
              className="w-full"
              as="div"
              size="lg"
              onClick={() => show({ type: 'deposit', params: {} })}
            >
              Deposit Funds
            </PrimaryButton>
          }
          className={className}
        />
      );
    default:
      return null;
  }
}

function CTAPane({
  className,
  title,
  description,
  actionItem,
}: WithClassnames<{
  title: string;
  actionItem: ReactNode;
  description?: string;
}>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      <div className="flex flex-col gap-y-1.5">
        <h2 className="text-text-primary text-xl">{title}</h2>
        {description && (
          <p className="text-text-tertiary text-sm">{description}</p>
        )}
      </div>
      {actionItem}
    </div>
  );
}
