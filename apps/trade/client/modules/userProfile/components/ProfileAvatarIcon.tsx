import {
  LIBRARY_AVATAR_SRC_BY_ID,
  LIBRARY_AVATARS,
} from 'client/modules/userProfile/avatarLibraryData';
import { EnsAvatarImage } from 'client/modules/userProfile/components/EnsAvatarImage';
import { useEnsProfile } from 'client/modules/userProfile/hooks/useEnsProfile';
import { ProfileAvatar } from 'client/modules/userProfile/types';
import Image from 'next/image';
import { useEVMContext } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';

interface Props extends WithClassnames {
  avatar: ProfileAvatar;
  size: number;
}

export function ProfileAvatarIcon({ avatar, size, className }: Props) {
  const {
    connectionStatus: { address },
  } = useEVMContext();
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
      return <IdentityIcon size={22} identifier={address} />;
    }
  })();

  return <div className={className}>{profileAvatar}</div>;
}
