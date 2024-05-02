import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { SavedUserProfile } from 'client/modules/userProfile/types';
import { useCallback } from 'react';

export function useSavedUserProfile() {
  const { savedUserSettings, setSavedUserSettings, didLoadPersistedValue } =
    useSavedUserSettings();

  const savedUsername = savedUserSettings.profile.username;
  const savedAvatar = savedUserSettings.profile.avatar;

  // Save user profile
  const saveUserProfile = useCallback(
    (data: SavedUserProfile) => {
      setSavedUserSettings((prev) => ({
        ...prev,
        profile: {
          username: data.username,
          avatar: data.avatar,
        },
      }));
    },
    [setSavedUserSettings],
  );

  return {
    savedUsername,
    savedAvatar,
    saveUserProfile,
    didLoadPersistedValue,
  };
}
