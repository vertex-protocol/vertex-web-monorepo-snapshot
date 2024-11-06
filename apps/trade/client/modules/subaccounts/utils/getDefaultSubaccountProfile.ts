import { DEFAULT_SUBACCOUNT_AVATAR } from 'client/modules/subaccounts/consts';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { getDefaultSubaccountUsername } from 'client/modules/subaccounts/utils/getDefaultSubaccountUsername';

export function getDefaultSubaccountProfile(
  subaccountName: string,
): SubaccountProfile {
  return {
    avatar: DEFAULT_SUBACCOUNT_AVATAR,
    username: getDefaultSubaccountUsername(subaccountName),
  };
}
