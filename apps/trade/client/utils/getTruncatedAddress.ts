import { join, slice } from 'lodash';

export function getTruncatedAddress(
  address: string,
  digits = 5,
  separator = '…',
  prefix = '0x',
) {
  return join(
    [
      ...slice(address, 0, digits + prefix.length),
      separator,
      ...slice(address, -digits),
    ],
    '',
  );
}
