import { useEVMContext } from '@vertex-protocol/web-data';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useSavedUserProfile } from 'client/modules/userProfile/hooks/useSavedUserProfile';
import { watchFormError } from 'client/utils/form/watchFormError';
import { isEqual } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import {
  EnsAvatarData,
  ProfileAvatar,
  ProfileErrorType,
  SavedUserProfile,
} from '../types';
import { useEnsProfile } from './useEnsProfile';

interface UseEditUserProfileForm {
  form: UseFormReturn<SavedUserProfile>;
  // Data
  address: string | undefined;
  ensAvatar: EnsAvatarData;
  didLoadPersistedValue: boolean;
  // Form state
  watchedUsername: string | undefined;
  watchedAvatar: ProfileAvatar | undefined;
  isFormDirty: boolean;
  formError: ProfileErrorType | undefined;
  validateUsername: (username: string) => ProfileErrorType | undefined;
  onSubmit: () => void;
  resetChanges: () => void;
  clearUsername: () => void;
}

const usernameSchema = z
  .string()
  .min(0)
  .max(24)
  .regex(/^[\w ]*?$/);

export function useEditUserProfileForm(): UseEditUserProfileForm {
  const { trackEvent } = useAnalyticsContext();
  const { savedUsername, savedAvatar, saveUserProfile, didLoadPersistedValue } =
    useSavedUserProfile();
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const { ensAvatar } = useEnsProfile();

  // Form state
  const useProfileForm = useForm<SavedUserProfile>({
    mode: 'onChange',
  });

  // Keeps form state up to date when savedUsername & savedAvatar changes
  useEffect(() => {
    if (!didLoadPersistedValue) {
      return;
    }
    useProfileForm.setValue('username', savedUsername);
    useProfileForm.setValue('avatar', savedAvatar);
  }, [savedUsername, savedAvatar, didLoadPersistedValue, useProfileForm]);

  // These are undefined because no default values are provided - they should be synced with the saved values after load
  const watchedUsername: string | undefined = useProfileForm.watch('username');
  const watchedAvatar: ProfileAvatar | undefined =
    useProfileForm.watch('avatar');

  const usernameError: ProfileErrorType | undefined = watchFormError(
    useProfileForm,
    'username',
  );

  const formError = usernameError;

  const onSubmitForm = (values: SavedUserProfile) => {
    saveUserProfile(values);
    trackEvent({ type: 'user_profile_edited', data: {} });
  };

  // Username validation
  const validateUsername = useCallback((username: string) => {
    if (!usernameSchema.safeParse(username).success) {
      return 'username_error';
    }
  }, []);

  const resetChanges = () => {
    useProfileForm.setValue('username', savedUsername);
    useProfileForm.setValue('avatar', savedAvatar);
  };

  const clearUsername = () => {
    useProfileForm.setValue('username', '');
  };

  const didUsernameChange =
    didLoadPersistedValue && !isEqual(watchedUsername, savedUsername);
  const didAvatarChange =
    didLoadPersistedValue && !isEqual(watchedAvatar, savedAvatar);
  const isFormDirty = didUsernameChange || didAvatarChange;

  return {
    form: useProfileForm,
    watchedUsername,
    watchedAvatar,
    onSubmit: useProfileForm.handleSubmit(onSubmitForm),
    formError,
    validateUsername,
    address,
    resetChanges,
    isFormDirty,
    clearUsername,
    ensAvatar,
    didLoadPersistedValue,
  };
}
