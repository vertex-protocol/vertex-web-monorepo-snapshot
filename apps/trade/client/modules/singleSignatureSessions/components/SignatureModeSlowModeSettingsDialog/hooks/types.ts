import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { UseFormReturn } from 'react-hook-form';

export interface SignatureModeSlowModeSettingsFormValues {
  selectedMode: SubaccountSigningPreferenceType;
  privateKey: string;
}

export type SignatureModeSlowModeSettingsFormErrorType = 'invalid_private_key';

export type SignatureModeSlowModeSettingsActionButtonState =
  | BaseActionButtonState
  | 'approve_success';

export type SignatureModeSlowModeSettingsAction =
  // Correct linked signer is already configured, just need to save to local state
  | 'save_locally'
  // Requires approval of fee
  | 'approve'
  // Requires a slow mode tx
  | 'execute_slow_mode'
  // Everything is synced
  | 'no_action_required';

export interface UseSignatureModeSlowModeSettingsDialog {
  form: UseFormReturn<SignatureModeSlowModeSettingsFormValues>;
  formError: SignatureModeSlowModeSettingsFormErrorType | undefined;
  userAction: SignatureModeSlowModeSettingsAction;
  buttonState: SignatureModeSlowModeSettingsActionButtonState;

  validatePrivateKey(
    input: string,
  ): SignatureModeSlowModeSettingsFormErrorType | undefined;

  setRandomPrivateKey(): void;

  onEnableSingleSignatureChange(value: boolean): void;

  onSubmit(): void;
}
