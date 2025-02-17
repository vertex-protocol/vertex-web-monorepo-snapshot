import { useEVMContext } from '@vertex-protocol/react-client';
import {
  truncateAddress,
  truncateMiddle,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { useAddressDisplayName } from 'client/hooks/util/useAddressDisplayName';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { MouseEventHandler } from 'react';

interface Props extends WithClassnames {
  onClick?: MouseEventHandler<Element>;
}

export function AccountCenterWalletDisplayName({ onClick, className }: Props) {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const [isAddressPrivate] = usePrivacySetting('isAddressPrivate');
  const { displayName } = useAddressDisplayName(address) ?? {};

  const addressLabel = (() => {
    const truncatedAddress = truncateAddress(address ?? '');
    if (!displayName) {
      return truncatedAddress;
    }

    const truncatedDisplayName = truncateMiddle(displayName ?? '', 7);
    return truncatedDisplayName;
  })();

  return (
    <PrivateContent
      isPrivate={isAddressPrivate}
      onClick={onClick}
      className={className}
    >
      {addressLabel}
    </PrivateContent>
  );
}
