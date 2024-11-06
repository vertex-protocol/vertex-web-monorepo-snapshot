import { ProfileAvatar } from 'client/modules/subaccounts/types';

/**
 * The name used for the first subaccount we create on the FE.
 * It's always included in the UI's lists of subaccounts.
 */
export const PRIMARY_SUBACCOUNT_NAME = 'default';

export const DEFAULT_SUBACCOUNT_AVATAR: ProfileAvatar = { type: 'default' };

export const SUBACCOUNT_QUOTE_TRANSFER_FEE = 1;

export const SUBACCOUNT_QUOTE_TRANSFER_MIN_AMOUNT_WITH_FEE =
  5 + SUBACCOUNT_QUOTE_TRANSFER_FEE;
