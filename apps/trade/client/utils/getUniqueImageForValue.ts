import { createHash } from 'crypto';
import Identicon from 'identicon.js';

/**
 * Function to generate a unique image for a given value
 * @param value string to generate unique image for
 * @returns base64 encoded image
 */
export function getUniqueImageForValue(value: string | undefined) {
  return new Identicon(
    createHash('sha256')
      .update(value ?? '')
      .digest('hex'),
    {
      format: 'svg',
      background: [0, 0, 0, 0],
    },
  ).toString();
}
