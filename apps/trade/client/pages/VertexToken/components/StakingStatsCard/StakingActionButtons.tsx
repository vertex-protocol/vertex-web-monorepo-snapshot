'use client';

import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function StakingActionButtons({ className }: WithClassnames) {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  return (
    <div className={mergeClassNames('flex items-center gap-x-4', className)}>
      <PrimaryButton
        className="flex-1"
        disabled={!isConnected}
        onClick={() => show({ type: 'stake_vrtx', params: {} })}
      >
        Stake
      </PrimaryButton>
      <SecondaryButton
        className="flex-1"
        disabled={!isConnected}
        onClick={() => show({ type: 'unstake_vrtx', params: {} })}
      >
        Unstake
      </SecondaryButton>
    </div>
  );
}
