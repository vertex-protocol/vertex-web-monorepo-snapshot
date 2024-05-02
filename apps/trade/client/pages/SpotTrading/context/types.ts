import { BaseOrderFormValues } from 'client/modules/trading/types';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';

export type SpotOrderFormUserStateError =
  | UserStateError
  // User needs to agree to spot leverage
  | 'requires_accept_leverage';

export type SpotOrderFormValues = BaseOrderFormValues;
