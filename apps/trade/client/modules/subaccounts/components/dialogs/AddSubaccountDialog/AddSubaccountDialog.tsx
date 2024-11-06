import {
  Divider,
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AddSubaccountDialogStepHeader } from 'client/modules/subaccounts/components/dialogs/AddSubaccountDialog/AddSubaccountDialogStepHeader';
import { SubaccountProfileFormInputs } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/SubaccountProfileFormInputs';
import { useSubaccountProfileForm } from 'client/modules/subaccounts/hooks/useSubaccountProfileForm';
import { getAppSubaccountName } from 'client/modules/subaccounts/utils/getAppSubaccountName';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';
import { useCallback } from 'react';

export function AddSubaccountDialog() {
  const { appSubaccountNames, setCurrentSubaccountName } =
    useSubaccountContext();
  const { hide, show } = useDialog();

  const subaccountName = getAppSubaccountName(appSubaccountNames.length);

  const onSubmit = useCallback(() => {
    setCurrentSubaccountName(subaccountName);
  }, [setCurrentSubaccountName, subaccountName]);

  const {
    form,
    formError,
    watchedUsername,
    watchedAvatar,
    handleSubmit,
    validateUsername,
    profileSubaccountName,
    ensAvatar,
  } = useSubaccountProfileForm({
    subaccountName,
    onSubmit,
    isNewSubaccount: true,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            className="text-sm"
            colorVariant="primary"
            as={Link}
            href={LINKS.multipleSubaccountsDocs}
            withExternalIcon
            external
          >
            Docs
          </LinkButton>
        }
      >
        Add Account
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <AddSubaccountDialogStepHeader
          stepNumber={1}
          heading="Account Details"
          subheading="You can edit your details later."
        />
        <SubaccountProfileFormInputs
          form={form}
          formError={formError}
          watchedUsername={watchedUsername}
          watchedAvatar={watchedAvatar}
          validateUsername={validateUsername}
          profileSubaccountName={profileSubaccountName}
          ensAvatar={ensAvatar}
        />
        <Divider />
        <AddSubaccountDialogStepHeader
          stepNumber={2}
          heading="Fund Account"
          subheading="Please fund your account to finish creating it."
        />
        <div className="flex flex-col gap-y-3">
          <PrimaryButton
            onClick={() => {
              handleSubmit();
              show({ type: 'deposit', params: {} });
            }}
          >
            Deposit Funds
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              handleSubmit();
              show({
                type: 'subaccount_quote_transfer',
                params: { recipientSubaccountName: subaccountName },
              });
            }}
          >
            Transfer From Another Account
          </SecondaryButton>
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
