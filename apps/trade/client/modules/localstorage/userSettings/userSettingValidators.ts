import { LIBRARY_AVATAR_SRC_BY_ID } from 'client/modules/subaccounts/avatarLibraryData';
import { ProfileAvatar } from 'client/modules/subaccounts/types';

export function isValidProfileAvatar(
  maybeAvatar: Partial<ProfileAvatar> | undefined,
): maybeAvatar is ProfileAvatar {
  if (!maybeAvatar || !maybeAvatar.type) {
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
}
