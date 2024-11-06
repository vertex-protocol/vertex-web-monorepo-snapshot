'use client';

import { TextButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function ReferralsCustomizeLinkTextButton() {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  return (
    <TextButton
      disabled={!isConnected}
      onClick={() =>
        show({
          type: 'customize_referral_link',
          params: {},
        })
      }
    >
      Customize
    </TextButton>
  );
}
