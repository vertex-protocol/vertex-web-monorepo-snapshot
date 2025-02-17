import { ChainEnv } from '@vertex-protocol/client';

/**
 * Uses the `chainEnv` and `subaccountName` to build a key for accessing
 * subaccount data in local storage.
 */
export function getSubaccountKey(chainEnv: ChainEnv, subaccountName: string) {
  return `${chainEnv}_${subaccountName}`;
}
