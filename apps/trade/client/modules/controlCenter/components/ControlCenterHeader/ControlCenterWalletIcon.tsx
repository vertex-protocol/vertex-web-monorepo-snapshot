import { Icons } from '@vertex-protocol/web-ui';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { ProfileAvatarIcon } from 'client/modules/userProfile/components/ProfileAvatarIcon';
import { useSavedUserProfile } from 'client/modules/userProfile/hooks/useSavedUserProfile';

type ControlCenterWalletIconProps = {
  errorIconSize?: number;
  walletIconSize?: number;
  userStateError?: UserStateError;
};

export function ControlCenterWalletIcon({
  userStateError,
  walletIconSize = 22,
  errorIconSize = 18,
}: ControlCenterWalletIconProps) {
  const { savedAvatar } = useSavedUserProfile();

  if (userStateError === 'not_connected') {
    return (
      <Icons.BsWallet2 className="text-text-tertiary" size={errorIconSize} />
    );
  }
  if (userStateError) {
    return (
      <Icons.BsExclamationTriangle
        size={errorIconSize}
        className="text-orange-400"
      />
    );
  }

  return <ProfileAvatarIcon avatar={savedAvatar} size={walletIconSize} />;
}
