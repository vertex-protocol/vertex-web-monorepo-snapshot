import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProfileAvatarIcon } from 'client/modules/userProfile/components/ProfileAvatarIcon';
import { ProfileAvatar } from 'client/modules/userProfile/types';

interface Props {
  avatar: ProfileAvatar;
  size: number;
}
export function EditProfileAvatarIcon({ avatar, size }: Props) {
  const { show } = useDialog();

  return (
    <Button
      className="group relative"
      onClick={() => show({ type: 'edit_user_profile', params: {} })}
    >
      <ProfileAvatarIcon
        avatar={avatar}
        size={size}
        className="group-hover:opacity-40"
      />
      <div
        // Edit icon overlay for editing user profile
        className={joinClassNames(
          'absolute inset-0 flex items-center justify-center',
          'opacity-0 transition-opacity group-hover:opacity-100',
        )}
      >
        <Icons.MdEdit size={20} />
      </div>
    </Button>
  );
}
