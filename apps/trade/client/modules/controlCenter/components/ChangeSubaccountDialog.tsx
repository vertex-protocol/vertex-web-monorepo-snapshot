import { useEVMContext } from '@vertex-protocol/web-data';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { CompactInput } from 'client/components/Input/CompactInput';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { isAddress } from 'ethers';
import { useState } from 'react';

export function ChangeSubaccountDialog() {
  const { hide } = useDialog();

  const { readOnlyAddressOverride, setReadOnlyAddressOverride } =
    useEVMContext();
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
  const disabled = (() => {
    // Allow empty address override (i.e. defaults to connected wallet)
    const invalidAddress = !!cleanedAddress && !isAddress(cleanedAddress);
    // Empty subaccount name is also valid
    return invalidAddress;
  })();

  const onSaveClicked = () => {
    if (disabled) {
      return;
    }
    setCurrentSubaccountName(cleanedSubaccountName);
    setReadOnlyAddressOverride(cleanedAddress);
    hide();
  };

  const addressField = (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-text-secondary text-xs">Address Override</h2>
      <div>
        <CompactInput
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
  );

  const subaccountField = (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-text-secondary text-xs">Subaccount Name</h2>
      <CompactInput
        value={subaccountNameInput}
        placeholder="default"
        onChange={(e) => setSubaccountNameInput(e.target.value)}
      />
    </div>
  );

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>
        <div onClick={onTitleClick}>Subaccount</div>
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        {showAddressInput && addressField}
        {subaccountField}
        <PrimaryButton size="lg" disabled={disabled} onClick={onSaveClicked}>
          Save
        </PrimaryButton>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
