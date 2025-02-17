import {
  EDGE_REFERRAL_PARAM,
  FUUL_REFERRAL_PARAM,
} from 'client/modules/referrals/consts';
import {
  edgeReferralCodeAtom,
  fuulReferralCodeAtom,
} from 'client/store/referralsStore';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Populates the referral code atom with the referral code from the URL query
 */
export function ReferralCodeListener() {
  const [, setEdgeReferralCode] = useAtom(edgeReferralCodeAtom);
  const [, setFuulReferralCode] = useAtom(fuulReferralCodeAtom);

  const searchParams = useSearchParams();

  /**
   * We have to distinguish how to handle the referral codes since we use multiple platforms for the service
   */

  // Vertex and Blitz referral codes use "referral"
  const referralCode = searchParams.get(EDGE_REFERRAL_PARAM);

  useEffect(() => {
    // If the referral code is present in the URL, set it in the atom
    if (referralCode) {
      setEdgeReferralCode(referralCode.trim());
    }
  }, [referralCode, setEdgeReferralCode]);

  // Fuul referral codes use "referrer"
  const fuulReferralCode = searchParams.get(FUUL_REFERRAL_PARAM);

  useEffect(() => {
    // If a Fuul referral code is present in the URL, set it in the Fuul referral code atom
    if (fuulReferralCode) {
      setFuulReferralCode(fuulReferralCode.trim());
    }
  }, [fuulReferralCode, setFuulReferralCode]);

  return null;
}
