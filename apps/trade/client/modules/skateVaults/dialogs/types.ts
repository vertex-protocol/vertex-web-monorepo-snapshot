import { Address } from 'viem';

export interface SkateVaultDialogParams {
  vaultAddress: Address;
  vaultName: string;
}

export type SkateVaultFormErrorType = 'invalid_input' | 'max_exceeded';
