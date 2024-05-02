import {
  SubaccountSignAlwaysPreference,
  SubaccountSignOncePreference,
} from 'client/modules/singleSignatureSessions/types';

export interface Subaccount {
  name: string;
  // Not defined if not connected
  address?: string;
}

export type UpdateSigningPreferenceFn = (
  newVal:
    | Required<SubaccountSignOncePreference>
    | SubaccountSignAlwaysPreference,
) => void;
