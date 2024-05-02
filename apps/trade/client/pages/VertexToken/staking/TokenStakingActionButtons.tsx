import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function TokenStakingActionButtons({
  className,
  userActionState,
}: WithClassnames<{
  userActionState: UserActionState;
}>) {
  const { show } = useDialog();

  return (
    <div className={mergeClassNames('flex items-center gap-x-4', className)}>
      <PrimaryButton
        size="lg"
        className="flex-1"
        disabled={userActionState === 'block_all'}
        onClick={() => show({ type: 'stake_vrtx', params: {} })}
      >
        Stake
      </PrimaryButton>
      <SecondaryButton
        size="lg"
        className="flex-1"
        disabled={userActionState === 'block_all'}
        onClick={() => show({ type: 'unstake_vrtx', params: {} })}
      >
        Unstake
      </SecondaryButton>
    </div>
  );
}
