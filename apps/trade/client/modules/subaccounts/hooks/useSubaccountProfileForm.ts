import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useEnsProfile } from 'client/modules/subaccounts/hooks/useEnsProfile';
import { useSavedSubaccountSettings } from 'client/modules/subaccounts/hooks/useSavedSubaccountSettings';
import {
  EnsAvatarData,
  ProfileAvatar,
  ProfileErrorType,
  SubaccountProfile,
} from 'client/modules/subaccounts/types';
import { getDefaultSubaccountUsername } from 'client/modules/subaccounts/utils/getDefaultSubaccountUsername';
import { watchFormError } from 'client/utils/form/watchFormError';
import { isEqual } from 'lodash';
import { useCallback } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export interface UseSubaccountProfileForm {
  form: UseFormReturn<SubaccountProfile>;
  // Data
  /**
   * The subaccount name the profile is being saved for. Depending on whether
   * we are editing or adding an account, this could either be the current
   * subaccount's name, or the new subaccount's name, respectively.
   */
  profileSubaccountName: string;
  ensAvatar: EnsAvatarData;
  // Form state
  watchedUsername: string;
  watchedAvatar: ProfileAvatar;
  isFormDirty: boolean;
  formError: ProfileErrorType | undefined;
  validateUsername: (username: string) => ProfileErrorType | undefined;
  handleSubmit: () => void;
  resetChanges: () => void;
}

const usernameSchema = z
  .string()
  .min(0)
  .max(24)
  .regex(/^[\w ]*?$/);

interface Params {
  subaccountName?: string;
  onSubmit?: () => void;
  isNewSubaccount?: boolean;
}

export function useSubaccountProfileForm({
  subaccountName,
  onSubmit,
  isNewSubaccount,
}: Params): UseSubaccountProfileForm {
  const { saveSubaccountProfile } = useSavedSubaccountSettings();
  const { currentSubaccount, getSubaccountProfile } = useSubaccountContext();
  const { ensAvatar } = useEnsProfile();

  const profileSubaccountName = subaccountName ?? currentSubaccount.name;
  const { username, avatar } = getSubaccountProfile(profileSubaccountName);

  // Form state
  const useProfileForm = useForm<SubaccountProfile>({
    mode: 'onChange',
    // If we're adding a new subaccount, start the username input off blank.
    // If the user leaves the input blank, we will assign them a default.
    defaultValues: { username: isNewSubaccount ? '' : username, avatar },
  });

  const watchedUsername = useProfileForm.watch('username');
  const watchedAvatar = useProfileForm.watch('avatar');

  const usernameError: ProfileErrorType | undefined = watchFormError(
    useProfileForm,
    'username',
  );

  const formError = usernameError;

  const onSubmitForm = (values: SubaccountProfile) => {
    const valuesWithDefaultUsername = {
      ...values,
      // Assign a deafult username if the input was left blank.
      username: values.username
        ? values.username
        : getDefaultSubaccountUsername(profileSubaccountName),
    };

    // If the username was left blank, upon form submit the username input won't
    // show the default username and `isFormDirty` won't return `false` unless we
    // manually set it to the default.
    useProfileForm.setValue('username', valuesWithDefaultUsername.username);

    saveSubaccountProfile(profileSubaccountName, valuesWithDefaultUsername);
    onSubmit?.();
  };

  // Username validation
  const validateUsername = useCallback((username: string) => {
    if (!usernameSchema.safeParse(username).success) {
      return 'username_error';
    }
  }, []);

  const resetChanges = () => {
    useProfileForm.setValue('username', username);
    useProfileForm.setValue('avatar', avatar);
  };

  const didUsernameChange = !isEqual(watchedUsername, username);
  const didAvatarChange = !isEqual(watchedAvatar, avatar);
  const isFormDirty = didUsernameChange || didAvatarChange;

  return {
    form: useProfileForm,
    watchedUsername,
    watchedAvatar,
    handleSubmit: useProfileForm.handleSubmit(onSubmitForm),
    formError,
    validateUsername,
    profileSubaccountName,
    resetChanges,
    isFormDirty,
    ensAvatar,
  };
}
