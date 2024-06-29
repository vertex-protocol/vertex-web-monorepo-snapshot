import { REFERRAL_QUERY_PARAM } from 'client/modules/referrals/consts';
import { blitzReferralCodeAtom, vertexReferralCodeAtom, } from 'client/store/referralsStore';
import { clientEnv } from 'common/environment/clientEnv';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Populates the referral code atom with the referral code from the URL query
 */
export function ReferralCodeListener() {
  const [, setBlitzCode] = useAtom(blitzReferralCodeAtom);
  const [, setVertexCode] = useAtom(vertexReferralCodeAtom);
  const { query } = useRouter();

  const possibleCodeFromQuery = query[REFERRAL_QUERY_PARAM];

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
  }, [possibleCodeFromQuery, query, setBlitzCode, setVertexCode]);

  return null;
}

function getCodeIfExists(possibleCode: string | string[] | undefined) {
  if (typeof possibleCode === 'string' && possibleCode.trim()) {
    return possibleCode.trim();
  }
}
