import { useSubaccountReferralCode } from 'client/hooks/query/subaccount/useSubaccountReferralCode';
import { useBaseUrl } from 'client/hooks/util/useBaseUrl';

// This is synced with `ReferralCodeListener`
const REFERRAL_CODE_QUERY_KEY = '?referral=';

export function useReferralLink() {
  const { data: referralCodeData } = useSubaccountReferralCode();
  const baseUrl = useBaseUrl();

  if (!referralCodeData?.referralCode) {
    return undefined;
  }
  return baseUrl + REFERRAL_CODE_QUERY_KEY + referralCodeData.referralCode;
}
