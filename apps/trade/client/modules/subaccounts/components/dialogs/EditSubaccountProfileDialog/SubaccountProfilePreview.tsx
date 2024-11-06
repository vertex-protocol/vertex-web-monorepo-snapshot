import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { ProfileAvatar } from 'client/modules/subaccounts/types';
import { getDefaultSubaccountUsername } from 'client/modules/subaccounts/utils/getDefaultSubaccountUsername';

interface Props {
  watchedUsername: string;
  watchedAvatar: ProfileAvatar;
  subaccountName: string;
}

export function SubaccountProfilePreview({
  watchedUsername,
  watchedAvatar,
  subaccountName,
}: Props) {
  // If the username's been cleared, we want to show the default username.
  const formUsername = watchedUsername.substring(0, 24);
  const defaultUsername = getDefaultSubaccountUsername(subaccountName);
  const username = formUsername ? formUsername : defaultUsername;

  return (
    <div className="flex items-center gap-x-2.5">
      <ProfileAvatarIcon
        avatar={watchedAvatar}
        size={40}
        subaccountName={subaccountName}
      />
      <p className="text-text-primary">{username}</p>
    </div>
  );
}
