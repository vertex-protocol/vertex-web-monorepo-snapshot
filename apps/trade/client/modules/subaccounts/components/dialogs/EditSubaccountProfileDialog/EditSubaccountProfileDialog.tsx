import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EditSubaccountProfileActionButtons } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/EditSubaccountProfileActionButtons';
import { SubaccountProfileFormInputs } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/SubaccountProfileFormInputs';
import { useSubaccountProfileForm } from 'client/modules/subaccounts/hooks/useSubaccountProfileForm';

export interface EditSubaccountProfileDialogParams {
  subaccountName?: string;
}

export function EditSubaccountProfileDialog({
  subaccountName,
}: EditSubaccountProfileDialogParams) {
  const { hide } = useDialog();
  const {
    form,
    formError,
    watchedUsername,
    watchedAvatar,
    handleSubmit,
    validateUsername,
    profileSubaccountName,
    resetChanges,
    isFormDirty,
    ensAvatar,
  } = useSubaccountProfileForm({ subaccountName });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Edit Account</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={handleSubmit}>
          <SubaccountProfileFormInputs
            form={form}
            formError={formError}
            watchedUsername={watchedUsername}
            watchedAvatar={watchedAvatar}
            validateUsername={validateUsername}
            profileSubaccountName={profileSubaccountName}
            ensAvatar={ensAvatar}
            showProfilePreview
          />
          <EditSubaccountProfileActionButtons
            className="border-stroke w-full border-t"
            resetChanges={resetChanges}
            isFormDirty={isFormDirty}
          />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
