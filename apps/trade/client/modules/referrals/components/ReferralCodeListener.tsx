import { REFERRAL_QUERY_PARAM } from 'client/modules/referrals/consts';
import {
  blitzReferralCodeAtom,
  vertexReferralCodeAtom,
} from 'client/store/referralsStore';
import { clientEnv } from 'common/environment/clientEnv';
import { useAtom } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Populates the referral code atom with the referral code from the URL query
 */
export function ReferralCodeListener() {
  const [, setBlitzCode] = useAtom(blitzReferralCodeAtom);
  const [, setVertexCode] = useAtom(vertexReferralCodeAtom);
  const searchParams = useSearchParams();

  const possibleCodeFromQuery = searchParams.get(REFERRAL_QUERY_PARAM);

  useEffect(() => {
    switch (clientEnv.base.brandName) {
      case 'vertex':
        const vertexCode = getCodeIfExists(possibleCodeFromQuery);
        if (vertexCode) {
          setVertexCode(vertexCode);
        }
        break;
      case 'blitz':
        const blitzCode = getCodeIfExists(possibleCodeFromQuery);
        if (blitzCode) {
          setBlitzCode(blitzCode);
        }
        break;
    }
  }, [possibleCodeFromQuery, setBlitzCode, setVertexCode]);

  return null;
}

function getCodeIfExists(possibleCode: string | string[] | null) {
  if (typeof possibleCode === 'string' && possibleCode.trim()) {
    return possibleCode.trim();
  }
}
