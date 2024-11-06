import {
  LIBRARY_AVATAR_SRC_BY_ID,
  LIBRARY_AVATARS,
} from 'client/modules/subaccounts/avatarLibraryData';
import { EnsAvatarImage } from 'client/modules/subaccounts/components/EnsAvatarImage';
import { useEnsProfile } from 'client/modules/subaccounts/hooks/useEnsProfile';
import { ProfileAvatar } from 'client/modules/subaccounts/types';
import Image from 'next/image';
import { WithClassnames } from '@vertex-protocol/web-common';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';
import { getSubaccountIdentityIconId } from 'client/modules/subaccounts/utils/getSubaccountIdentityIconId';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

interface Props extends WithClassnames {
  avatar: ProfileAvatar;
  size: number;
  /**
   * Used in combination with the currently connected `address` to create a
   * unique identity icon pattern. If not provided, the current subaccount's
   * name is used.
   */
  subaccountName?: string;
}

export function ProfileAvatarIcon({
  avatar,
  size,
  className,
  subaccountName,
}: Props) {
  const {
    currentSubaccount: { address, name: currentSubaccountName },
  } = useSubaccountContext();

  const identityIconId = getSubaccountIdentityIconId(
    address,
    subaccountName ?? currentSubaccountName,
  );

  const { ensAvatar } = useEnsProfile();

  const profileAvatar = (() => {
    if (avatar.type === 'ens' && !!ensAvatar) {
      return (
        <EnsAvatarImage width={size} height={size} ensAvatar={ensAvatar} />
      );
    } else if (avatar.type === 'library') {
      const selectedAvatar =
        LIBRARY_AVATAR_SRC_BY_ID[avatar.id] ?? LIBRARY_AVATARS[0];

      return (
        <Image
          src={selectedAvatar.src}
          height={size}
          width={size}
          alt="avatar"
          className="rounded-full"
          // leaving previewAvatar unoptimized to keep quality
          unoptimized
        />
      );
    } else {
      return <IdentityIcon size={size} identifier={identityIconId} />;
    }
  })();

  return <div className={className}>{profileAvatar}</div>;
}
