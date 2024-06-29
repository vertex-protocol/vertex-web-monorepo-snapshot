import { PrimaryChainID } from '@vertex-protocol/react-client';
import {
  SubaccountSignAlwaysPreference,
  SubaccountSignOncePreference,
} from 'client/modules/singleSignatureSessions/types';

export interface Subaccount {
  name: string;
  chainId: PrimaryChainID;
  // Not defined if not connected
  address?: string;
}

export type UpdateSigningPreferenceFn = (
  newVal:
    | Required<SubaccountSignOncePreference>
    | SubaccountSignAlwaysPreference,
) => void;
