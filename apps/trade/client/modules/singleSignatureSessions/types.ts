import { PrimaryChainID } from '@vertex-protocol/web-data';
import { Wallet } from 'ethers';

export interface SubaccountSignOncePreference {
  type: 'sign_once';
  authorizedWallet?: Wallet;
  rememberMe: boolean;
}

export interface SubaccountSignAlwaysPreference {
  type: 'sign_always';
}

export type SubaccountSigningPreference =
  | SubaccountSignOncePreference
  | SubaccountSignAlwaysPreference;

export type SubaccountSigningPreferenceType =
  SubaccountSigningPreference['type'];

export type SavedSubaccountSigningPreference =
  | {
      type: 'sign_once';
      // Can be undefined if "Remember Me" was enabled or if local storage was changed
      privateKey?: string;
      rememberMe: boolean;
    }
  | {
      type: 'sign_always';
    };

export type SavedSigningPreferenceBySubaccountKey = Record<
  string,
  SavedSubaccountSigningPreference
>;
