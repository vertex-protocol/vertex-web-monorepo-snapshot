import { PrimaryChainID } from '@vertex-protocol/react-client';

/**
 * Uses the `chainId` and `subaccountName` to build a key for accessing
 * subaccount data in local storage.
 */
export function getSubaccountKey(
  chainId: PrimaryChainID,
  subaccountName: string,
) {
  return `${chainId}_${subaccountName}`;
}
