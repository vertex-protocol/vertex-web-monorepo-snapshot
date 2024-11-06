import { join, slice } from 'lodash';

export function truncateMiddle(str: string, maxLengthPerSide = 4, prefix = '') {
  if (str.length <= maxLengthPerSide * 2 + prefix.length) {
    return str;
  }

  return join(
    [
      ...slice(str, 0, maxLengthPerSide + prefix.length),
      '…',
      ...slice(str, -maxLengthPerSide),
    ],
    '',
  );
}

export function truncateAddress(address: string) {
  return truncateMiddle(address, 4, '0x');
}
