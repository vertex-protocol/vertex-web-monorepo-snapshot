'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function SonicPointsEarnDepositCardButton({
  className,
}: WithClassnames) {
  const { show } = useDialog();

  return (
    <SecondaryButton
      className={className}
      onClick={() => show({ type: 'deposit', params: {} })}
    >
      Deposit
    </SecondaryButton>
  );
}
