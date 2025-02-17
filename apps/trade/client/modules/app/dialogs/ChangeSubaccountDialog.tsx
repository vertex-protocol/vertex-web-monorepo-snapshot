import { CompactInput, Input, PrimaryButton } from '@vertex-protocol/web-ui';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSavedGlobalState } from 'client/modules/localstorage/globalState/useSavedGlobalState';
import { useState } from 'react';
import { isAddress } from 'viem';

export function ChangeSubaccountDialog() {
  const { hide } = useDialog();

  const {
    savedGlobalState: { readOnlyAddressOverride },
    setSavedGlobalState,
  } = useSavedGlobalState();
  const setReadOnlyAddressOverride = (address: string) => {
    setSavedGlobalState((prev) => {
      prev.readOnlyAddressOverride = address;
      return prev;
    });
  };

  const {
    currentSubaccount: { name: currentSubaccountName },
    setCurrentSubaccountName,
  } = useSubaccountContext();

  // We need to hide address input for most MM's and only show it for a subset of trusted users
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [addressInput, setAddressInput] = useState(readOnlyAddressOverride);
  const [subaccountNameInput, setSubaccountNameInput] = useState(
    currentSubaccountName,
  );

  const onTitleClick = useRepeatedClickCountHandler({
    handler: (count) => {
      if (count === 3) {
        setShowAddressInput(true);
      }
    },
  });

  const cleanedAddress = addressInput.trim();
  const cleanedSubaccountName = subaccountNameInput.trim();
  const saveButtonDisabled = (() => {
    // Allow empty address override (i.e. defaults to connected wallet)
    const invalidAddress = !!cleanedAddress && !isAddress(cleanedAddress);

    // Allow empty subaccount names
    return invalidAddress;
  })();

  const onSaveClicked = () => {
    if (saveButtonDisabled) {
      return;
    }
    setCurrentSubaccountName(cleanedSubaccountName);
    setReadOnlyAddressOverride(cleanedAddress);
    hide();
  };

  const addressField = showAddressInput ? (
    <div className="flex flex-col gap-y-2">
      <Input.Label className="text-xs" htmlFor="subaccountAddress">
        Address Override
      </Input.Label>
      <div>
        <CompactInput
          name="subaccountAddress"
          value={addressInput}
          placeholder="0x..."
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <p className="text-2xs text-text-tertiary ml-0.5 mt-0.5">
          View a read-only version of the app for another address. Leave blank
          to use your own account.
        </p>
      </div>
    </div>
  ) : null;

  const subaccountField = (
    <div className="flex flex-col gap-y-2">
      <Input.Label className="text-xs" htmlFor="subaccountName">
        Subaccount Name
      </Input.Label>
      <CompactInput
        name="subaccountName"
        value={subaccountNameInput}
        placeholder="Enter name"
        onChange={(e) => setSubaccountNameInput(e.target.value)}
      />
    </div>
  );

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        <div onClick={onTitleClick}>Subaccount</div>
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        {addressField}
        {subaccountField}
        <PrimaryButton disabled={saveButtonDisabled} onClick={onSaveClicked}>
          Save
        </PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
