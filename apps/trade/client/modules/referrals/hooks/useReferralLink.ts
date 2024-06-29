import { useBaseUrl } from 'client/hooks/util/useBaseUrl';
import { REFERRAL_QUERY_PARAM } from 'client/modules/referrals/consts';
import { useMemo } from 'react';

interface Params {
  referralCode: string | undefined | null;
}

interface UseReferralLink {
  /**
   * Base URL including the query param.
   * @example app.vertexprotocol.com?ref=
   */
  baseUrlWithQueryParam: string;
  /**
   * Full referral link including the referral code.
   * @example app.vertexprotocol.com?ref=1234
   */
  referralLink: string;
}

export function useReferralLink({ referralCode }: Params) {
  const baseUrl = useBaseUrl();

  return useMemo((): UseReferralLink => {
    const baseUrlWithQueryParam = `${baseUrl}?${REFERRAL_QUERY_PARAM}=`;
    const referralLink = `${baseUrlWithQueryParam}${referralCode ?? ''}`;

    return {
      baseUrlWithQueryParam,
      referralLink,
    };
  }, [baseUrl, referralCode]);
}
