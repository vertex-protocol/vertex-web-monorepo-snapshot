import { InputValidatorFn } from '@vertex-protocol/web-common';
import { ConnectCustomWalletErrorType } from 'client/modules/app/dialogs/onboarding/connectCustomWallet/types';
import {
  addressValidator,
  privateKeyValidator,
} from 'client/utils/inputValidators';

export const validateAddress: InputValidatorFn<
  string,
  ConnectCustomWalletErrorType
> = (val) => {
  if (!val) {
    return;
  }
  if (!addressValidator.safeParse(val).success) {
    return 'invalid_input';
  }
};
export const validatePrivateKey: InputValidatorFn<
  string,
  ConnectCustomWalletErrorType
> = (val) => {
  if (!val) {
    return;
  }
  if (!privateKeyValidator.safeParse(val).success) {
    return 'invalid_input';
  }
};
