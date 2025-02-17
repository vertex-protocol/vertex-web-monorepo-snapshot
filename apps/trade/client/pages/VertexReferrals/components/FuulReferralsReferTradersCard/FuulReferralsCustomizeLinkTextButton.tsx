'use client';

import { TextButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function FuulReferralsCustomizeLinkTextButton() {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  return (
    <TextButton
      colorVariant="secondary"
      disabled={!isConnected}
      onClick={() =>
        show({
          type: 'customize_fuul_referral_link',
          params: {},
        })
      }
    >
      Customize
    </TextButton>
  );
}
