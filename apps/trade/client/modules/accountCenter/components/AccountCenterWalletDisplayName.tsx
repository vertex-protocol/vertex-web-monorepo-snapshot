import { WithClassnames } from '@vertex-protocol/web-common';
import { useConnectedAddressDisplayName } from 'client/hooks/util/useConnectedAddressDisplayName';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { MouseEventHandler } from 'react';

interface Props extends WithClassnames {
  onClick?: MouseEventHandler<Element>;
}

export function AccountCenterWalletDisplayName({ onClick, className }: Props) {
  const [isAddressPrivate] = usePrivacySetting('isAddressPrivate');
  const { truncatedDisplayName } = useConnectedAddressDisplayName();

  return (
    <PrivateContent
      isPrivate={isAddressPrivate}
      onClick={onClick}
      className={className}
    >
      {truncatedDisplayName}
    </PrivateContent>
  );
}
