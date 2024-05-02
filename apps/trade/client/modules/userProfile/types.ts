import { LIBRARY_AVATARS } from './avatarLibraryData';

type VertexLibraryAvatarID = (typeof LIBRARY_AVATARS)[number]['id'];

export interface VertexLibraryProfileAvatar {
  type: 'library';
  id: VertexLibraryAvatarID;
}

export type ProfileAvatar =
  | {
      type: 'ens';
    }
  | {
      type: 'default';
    }
  | VertexLibraryProfileAvatar;

export type ProfileAvatarType = ProfileAvatar['type'];

export type ProfileErrorType = 'username_error';

export type EnsAvatarData = string | null | undefined;

export interface SavedUserProfile {
  avatar: ProfileAvatar;
  username: string;
}
