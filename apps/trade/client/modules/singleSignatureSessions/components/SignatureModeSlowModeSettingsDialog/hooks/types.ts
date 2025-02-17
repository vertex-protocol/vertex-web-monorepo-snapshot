import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { UseFormReturn } from 'react-hook-form';

export interface SignatureModeSlowModeSettingsFormValues {
  selectedMode: SubaccountSigningPreferenceType;
  privateKey: string;
}

export type SignatureModeSlowModeSettingsFormErrorType =
  | 'invalid_private_key'
  | 'insufficient_balance_for_fee';

export type SignatureModeSlowModeSettingsActionButtonState =
  | BaseActionButtonState
  | 'approve_success';

export type SignatureModeSlowModeSettingsAction =
  // Either needs to save local state (if 1CT is already configured) or turning off 1CT when currently on (1CT key can be used to turn off 1CT)
  | 'save_without_tx'
  // Requires approval of fee
  | 'requires_fee_approval'
  // Requires a slow mode tx
  | 'execute_slow_mode';

export interface UseSignatureModeSlowModeSettingsDialog {
  form: UseFormReturn<SignatureModeSlowModeSettingsFormValues>;
  formError: SignatureModeSlowModeSettingsFormErrorType | undefined;
  privateKeyInputError: SignatureModeSlowModeSettingsFormErrorType | undefined;
  /**
   * Undefined means that input is not sufficient to determine the user action, or no action is required
   */
  userAction: SignatureModeSlowModeSettingsAction | undefined;
  buttonState: SignatureModeSlowModeSettingsActionButtonState;

  validatePrivateKey(
    input: string,
  ): SignatureModeSlowModeSettingsFormErrorType | undefined;

  setRandomPrivateKey(): void;

  onEnableSingleSignatureChange(value: boolean): void;

  onSubmit(): void;
}
