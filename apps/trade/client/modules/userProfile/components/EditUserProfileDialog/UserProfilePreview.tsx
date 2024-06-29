import { joinClassNames } from '@vertex-protocol/web-common';
import { ProfileAvatarIcon } from 'client/modules/userProfile/components/ProfileAvatarIcon';
import { ProfileAvatar } from 'client/modules/userProfile/types';
import { getTruncatedAddress } from 'client/utils/getTruncatedAddress';

interface Props {
  watchedUsername: string;
  address: string | undefined;
  watchedAvatar: ProfileAvatar;
}

export function UserProfilePreview({
  watchedUsername,
  address,
  watchedAvatar,
}: Props) {
  const header = !!watchedUsername ? watchedUsername : 'Welcome Back!';

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-text-primary text-sm">Preview</p>
      <div
        className={joinClassNames(
          'bg-surface-1 border-stroke rounded border',
          'flex items-center justify-center gap-x-3 py-5',
        )}
      >
        <ProfileAvatarIcon avatar={watchedAvatar} size={40} />
        <div>
          <p className="text-text-primary text-base">
            {header.substring(0, 24)}
          </p>
          {address && (
            <p className="text-text-tertiary text-2xs">
              {getTruncatedAddress(address, 4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
