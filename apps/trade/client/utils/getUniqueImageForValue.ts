import { sha256, toBytes } from 'viem';
import Identicon from 'identicon.js';

/**
 * Function to generate a unique image for a given value
 * @param value string to generate unique image for
 * @returns base64 encoded image
 */
export function getUniqueImageForValue(value: string | undefined) {
  // A strong random hash is required for the identicon to look very different
  // for a similar value (eg. only difference is 1 character in subaccount name)
  // substring(2) is used to strip the 0x prefix
  const hash = sha256(toBytes(value ?? ''), 'hex').substring(2);
  return new Identicon(hash, {
    format: 'svg',
    background: [0, 0, 0, 0],
  }).toString();
}
