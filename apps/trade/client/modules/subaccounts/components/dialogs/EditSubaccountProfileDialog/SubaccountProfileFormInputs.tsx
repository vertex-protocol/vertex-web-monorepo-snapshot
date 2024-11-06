import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { AvatarTypeSelector } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/AvatarTypeSelector';
import { LibraryAvatarList } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/LibraryAvatarList';
import { SubaccountProfilePreview } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/SubaccountProfilePreview';
import { UsernameInput } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/usernameSection/UsernameInput';
import { UseSubaccountProfileForm } from 'client/modules/subaccounts/hooks/useSubaccountProfileForm';
import { useUsernameErrorTooltipContent } from 'client/modules/subaccounts/hooks/useUsernameErrorTooltipContent';

interface Props
  extends WithClassnames<
    Omit<
      UseSubaccountProfileForm,
      'isFormDirty' | 'handleSubmit' | 'resetChanges'
    >
  > {
  showProfilePreview?: boolean;
}

export function SubaccountProfileFormInputs({
  className,
  form,
  formError,
  watchedUsername,
  watchedAvatar,
  validateUsername,
  profileSubaccountName,
  ensAvatar,
  showProfilePreview,
}: Props) {
  const usernameErrorTooltipContent = useUsernameErrorTooltipContent({
    formError,
  });

  return (
    <div className={joinClassNames('flex flex-col gap-y-4', className)}>
      {showProfilePreview && (
        <SubaccountProfilePreview
          watchedUsername={watchedUsername}
          watchedAvatar={watchedAvatar}
          subaccountName={profileSubaccountName}
        />
      )}
      <UsernameInput
        form={form}
        validateUsername={validateUsername}
        error={usernameErrorTooltipContent}
      />
      <BrandSpecificContent enabledBrands={['vertex']}>
        <AvatarTypeSelector
          form={form}
          watchedAvatar={watchedAvatar}
          subaccountName={profileSubaccountName}
          ensAvatar={ensAvatar}
        />
        {watchedAvatar.type === 'library' && (
          <LibraryAvatarList form={form} watchedAvatar={watchedAvatar} />
        )}
      </BrandSpecificContent>
    </div>
  );
}
