import { useBaseUrl } from 'client/hooks/util/useBaseUrl';
import {
  EDGE_REFERRAL_PARAM,
  FUUL_REFERRAL_PARAM,
} from 'client/modules/referrals/consts';
import { useMemo } from 'react';

interface Params {
  referralCode: string | undefined | null;
  isFuul: boolean;
}

interface UseReferralLink {
  /**
   * Base URL including the query param.
   * @example app.vertexprotocol.com?[referral/referrer]=
   */
  baseUrlWithQueryParam: string;
  /**
   * Full referral link including the referral code.
   * @example app.vertexprotocol.com?[referral/referrer]=1234
   */
  referralLink: string;
}

export function useReferralLink({ referralCode, isFuul }: Params) {
  const baseUrl = useBaseUrl();

  const queryParam = isFuul ? FUUL_REFERRAL_PARAM : EDGE_REFERRAL_PARAM;

  return useMemo((): UseReferralLink => {
    const baseUrlWithQueryParam = `${baseUrl}?${queryParam}=`;
    const referralLink = `${baseUrlWithQueryParam}${referralCode ?? ''}`;

    return {
      baseUrlWithQueryParam,
      referralLink,
    };
  }, [baseUrl, referralCode, queryParam]);
}
