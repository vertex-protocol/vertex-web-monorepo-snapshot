import { Icons } from '@vertex-protocol/web-ui';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { ProfileAvatarIcon } from 'client/modules/userProfile/components/ProfileAvatarIcon';
import { useSavedUserProfile } from 'client/modules/userProfile/hooks/useSavedUserProfile';

type ControlCenterWalletIconProps = {
  size: number;
  userStateError: UserStateError | undefined;
};

export function AccountCenterWalletIcon({
  userStateError,
  size,
}: ControlCenterWalletIconProps) {
  const { savedAvatar } = useSavedUserProfile();

  if (userStateError) {
    return <Icons.BsExclamationTriangle size={size} className="text-warning" />;
  }

  return <ProfileAvatarIcon avatar={savedAvatar} size={size} />;
}
