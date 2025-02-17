import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function addressFuulReferralCodeQueryKey(address?: string) {
  return createQueryKey('addressFuulReferralCode', address);
}

/**
 * Returns referral code data for the current address
 */
export function useAddressFuulReferralCode() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressFuulReferralCodeQueryKey(addressForQuery),
    queryFn: async () => {
      const customReferralCode = await Fuul.getAffiliateCode(addressForQuery);

      return {
        referralCode: customReferralCode ?? address,
        isCustom: !!customReferralCode,
      };
    },
    // Referral codes rarely change, and we should be refetching on referral code changes
    refetchInterval: (query) => (query.state.data ? false : 30000),
  });
}
