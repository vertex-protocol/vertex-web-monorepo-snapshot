import { zeroAddress } from 'viem';

/**
 * Returns an id for use with `IdentityIcon` that allows it to generate a unique
 * avatar pattern for each subaccount.
 *
 * Note, technically `address` can be `undefined`, though in practice we should
 * only be invoking this fn when we already have an `address`.
 */
export function getSubaccountIdentityIconId(
  address: string | undefined = zeroAddress,
  subaccountName: string,
) {
  return `${address}${subaccountName}`;
}
