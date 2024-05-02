import { joinClassNames } from '@vertex-protocol/web-common';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { DIALOG_PADDING } from 'client/components/BaseDialog/consts';
import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ActionButtons } from 'client/modules/userProfile/components/EditUserProfileDialog/ActionButtons';
import { UserProfilePreview } from 'client/modules/userProfile/components/EditUserProfileDialog/UserProfilePreview';
import { AvatarTypeSelector } from 'client/modules/userProfile/components/EditUserProfileDialog/avatarSection/AvatarTypeSelector';
import { LibraryAvatarList } from 'client/modules/userProfile/components/EditUserProfileDialog/avatarSection/LibraryAvatarList';
import { UsernameInput } from 'client/modules/userProfile/components/EditUserProfileDialog/usernameSection/UsernameInput';
import { useEditUserProfileForm } from 'client/modules/userProfile/hooks/useEditUserProfileForm';
import { useUsernameErrorTooltipContent } from '../../hooks/useUsernameErrorTooltipContent';

export function EditUserProfileDialog() {
  const { hide } = useDialog();
  const {
    form,
    formError,
    watchedUsername,
    watchedAvatar,
    onSubmit,
    validateUsername,
    address,
    resetChanges,
    isFormDirty,
    clearUsername,
    ensAvatar,
    didLoadPersistedValue,
  } = useEditUserProfileForm();

  const usernameErrorTooltipContent = useUsernameErrorTooltipContent({
    formError,
  });

  // only render dialog to avoid flicker on UI when watched values are updated to saved values
  if (
    !didLoadPersistedValue ||
    watchedUsername == null ||
    watchedAvatar == null
  ) {
    return null;
  }

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Account Details</BaseDialog.Title>
      {/*Applying px-0 & py-0 here to overide default padding. We want vertical scrollbar to ignore padding on side and top.*/}
      <BaseDialog.Body className="px-0 py-0">
        <Form onSubmit={onSubmit}>
          <div
            className={joinClassNames(
              'flex max-h-[460px] flex-col gap-y-5 overflow-y-auto overflow-x-hidden',
              DIALOG_PADDING.horizontal,
              DIALOG_PADDING.bodyVertical,
            )}
          >
            <UserProfilePreview
              watchedUsername={watchedUsername}
              address={address}
              watchedAvatar={watchedAvatar}
            />
            <UsernameInput
              form={form}
              validateUsername={validateUsername}
              watchedUsername={watchedUsername}
              clearUsername={clearUsername}
              error={usernameErrorTooltipContent}
            />
            <AvatarTypeSelector
              form={form}
              watchedAvatar={watchedAvatar}
              address={address}
              ensAvatar={ensAvatar}
            />
            {watchedAvatar.type === 'library' && (
              <LibraryAvatarList form={form} watchedAvatar={watchedAvatar} />
            )}
          </div>
          <ActionButtons
            className={joinClassNames(
              'border-stroke w-full border-t',
              DIALOG_PADDING.horizontal,
              DIALOG_PADDING.bodyVertical,
            )}
            resetChanges={resetChanges}
            isFormDirty={isFormDirty}
          />
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
