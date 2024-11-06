import {
  truncateAddress,
  truncateMiddle,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { MouseEventHandler, useEffect } from 'react';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useAddressDisplayName } from 'client/hooks/util/useAddressDisplayName';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

interface Props extends WithClassnames {
  onClick?: MouseEventHandler<Element>;
}

export function AccountCenterWalletDisplayName({ onClick, className }: Props) {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const [isAddressPrivate] = usePrivacySetting('isAddressPrivate');
  const { type: displayNameType, displayName } =
    useAddressDisplayName(address) ?? {};

  const addressLabel = (() => {
    const truncatedAddress = truncateAddress(address ?? '');
    if (!displayName) {
      return truncatedAddress;
    }

    const truncatedDisplayName = truncateMiddle(displayName ?? '', 7);
    return truncatedDisplayName;
  })();

  const { trackEvent } = useAnalyticsContext();
  useEffect(() => {
    if (!displayNameType) {
      return;
    }

    trackEvent({
      type: 'wallet_display_name_shown',
      data: { displayNameType, length: displayName?.length },
    });
  }, [trackEvent, displayNameType, displayName]);

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
