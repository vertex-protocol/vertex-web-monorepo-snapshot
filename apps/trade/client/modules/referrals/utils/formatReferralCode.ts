import { truncateAddress } from '@vertex-protocol/web-common';
import { isAddress } from 'ethers';

/**
 * Formats a referral code for display.
 * Fuul defaults to user addresses for referral codes, in which case, we truncate the address.
 * For custom referral codes, we return the code as is.
 *
 * @param referralCode
 */
export function formatReferralCode(referralCode: string | undefined): string {
  if (!referralCode) {
    return '';
  }

  return isAddress(referralCode) ? truncateAddress(referralCode) : referralCode;
}
