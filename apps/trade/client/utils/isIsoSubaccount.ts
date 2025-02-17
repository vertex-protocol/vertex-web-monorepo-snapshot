import { subaccountFromHex } from '@vertex-protocol/client';

export function isIsoSubaccountHex(subaccountHex: string) {
  const { subaccountName } = subaccountFromHex(subaccountHex);
  return isIsoSubaccountName(subaccountName);
}

export function isIsoSubaccountName(subaccountName: string) {
  // UTF8 and hex representation
  return subaccountName.endsWith('iso') || subaccountName.endsWith('69736f');
}
