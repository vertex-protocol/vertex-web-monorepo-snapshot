import { referralCodeAtom } from 'client/store/rewardsStore';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Populates the referral code atom with the referral code from the URL query
 */
export function ReferralCodeListener() {
  const [, setReferralCodeAtomValue] = useAtom(referralCodeAtom);
  const {
    query: { referral },
  } = useRouter();

  useEffect(() => {
    if (typeof referral === 'string' && referral.trim()) {
      setReferralCodeAtomValue(referral.trim());
    }
  }, [referral, setReferralCodeAtomValue]);

  return null;
}
