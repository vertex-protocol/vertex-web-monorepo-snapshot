import { Icons } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';

type ControlCenterWalletIconProps = {
  size: number;
  userStateError: UserStateError | undefined;
};

export function AccountCenterWalletIcon({
  userStateError,
  size,
}: ControlCenterWalletIconProps) {
  const {
    currentSubaccountProfile: { avatar },
  } = useSubaccountContext();

  if (userStateError === 'requires_sign_once_approval') {
    return <Icons.LightningSlash size={size} className="text-warning" />;
  }

  if (userStateError === 'incorrect_connected_chain') {
    return <Icons.Warning size={size} className="text-warning" />;
  }

  return <ProfileAvatarIcon avatar={avatar} size={size} />;
}
