import { ProfileAvatar } from '../../userProfile/types';
import { LIBRARY_AVATAR_SRC_BY_ID } from '../../userProfile/avatarLibraryData';

export function isValidProfileAvatar(
  maybeAvatar: Partial<ProfileAvatar> | undefined,
): maybeAvatar is ProfileAvatar {
  if (!maybeAvatar) {
    return false;
  }
  switch (maybeAvatar.type) {
    case 'library':
      return Object.keys(LIBRARY_AVATAR_SRC_BY_ID).includes(
        maybeAvatar.id ?? '',
      );
    case 'default':
    case 'ens':
      // Default / ENS settings don't have an ID
      return true;
  }
  return false;
}
