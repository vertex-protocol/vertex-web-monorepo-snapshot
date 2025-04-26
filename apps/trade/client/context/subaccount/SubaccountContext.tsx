import {
  AppSubaccount,
  UpdateSigningPreferenceFn,
} from 'client/context/subaccount/types';
import { SubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { createContext, use } from 'react';

export interface SubaccountContextData {
  /**
   * Subaccount Name defaults to `default`.
   */
  currentSubaccount: AppSubaccount;
  /**
   * Returns the current subaccount's saved profile or the default
   * profile if not found.
   */
  currentSubaccountProfile: SubaccountProfile;
  /**
   * Returns the saved profile for the given subaccount name or the
   * default profile if not found. Note, if returning the default
   * profile, the object won't be stable, so depending on where / how
   * you're using it, you may need to memoize.
   */
  getSubaccountProfile: (subaccountName: string) => SubaccountProfile;
  /**
   * Existing subaccount names created on the FE for the current address.
   */
  appSubaccountNames: string[];
  /**
   * `true` if the user has NOT already added the max number of FE subaccounts.
   */
  canAddSubaccount: boolean;
  signingPreference: {
    current?: SubaccountSigningPreference;
    didLoadPersistedValue: boolean;
    update: UpdateSigningPreferenceFn;
  };

  setCurrentSubaccountName(name: string): void;
}

export const SubaccountContext = createContext<SubaccountContextData>(
  {} as SubaccountContextData,
);

export const useSubaccountContext = () => use(SubaccountContext);
