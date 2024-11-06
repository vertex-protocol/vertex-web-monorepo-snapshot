import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';

/**
 * Returns a FE-created subaccount name given its index.
 */
export function getAppSubaccountName(subaccountIndex: number) {
  if (!subaccountIndex) {
    return PRIMARY_SUBACCOUNT_NAME;
  }

  return `${PRIMARY_SUBACCOUNT_NAME}_${subaccountIndex}`;
}
