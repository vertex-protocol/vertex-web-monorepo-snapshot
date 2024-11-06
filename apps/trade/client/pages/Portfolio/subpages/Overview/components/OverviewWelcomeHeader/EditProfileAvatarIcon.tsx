import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { ProfileAvatar } from 'client/modules/subaccounts/types';

interface Props {
  avatar: ProfileAvatar;
  size: number;
}

export function EditProfileAvatarIcon({ avatar, size }: Props) {
  const { show } = useDialog();
  const { trackEvent } = useAnalyticsContext();

  return (
    <Button
      className="group relative"
      onClick={() => {
        trackEvent({
          type: 'edit_profile_clicked',
          data: {},
        });
        show({ type: 'edit_user_profile', params: {} });
      }}
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
        <Icons.PencilSimple size={20} />
      </div>
    </Button>
  );
}
