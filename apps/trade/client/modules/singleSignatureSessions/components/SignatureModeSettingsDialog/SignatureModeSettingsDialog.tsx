import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SignatureModeDisable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeDisable1CTDialogContent';
import { SignatureModeEnable1CTDialogContent } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeEnable1CTDialogContent';
import { useEffect, useState } from 'react';

export function SignatureModeSettingsDialog() {
  const { hide } = useDialog();
  const { signingPreference } = useSubaccountContext();
  const signingPreferenceIsSignOnce =
    signingPreference.current?.type === 'sign_once';

  const [showDisable1CTContent, setShowDisable1CTContent] = useState<boolean>(
    signingPreferenceIsSignOnce,
  );

  // Ensure that content stays in sync with signing preference on initial load
  useEffect(() => {
    if (!signingPreference.didLoadPersistedValue) {
      return;
    }

    setShowDisable1CTContent(signingPreferenceIsSignOnce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signingPreference.didLoadPersistedValue]);

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>1-Click Trading</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        {showDisable1CTContent ? (
          <SignatureModeDisable1CTDialogContent
            onDisableSuccess={() => setShowDisable1CTContent(false)}
          />
        ) : (
          <SignatureModeEnable1CTDialogContent
            onEnableSuccess={() => setShowDisable1CTContent(true)}
          />
        )}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
