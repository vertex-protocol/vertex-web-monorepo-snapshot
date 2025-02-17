import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';
import { first } from 'lodash';

export function fuulReferrerForAddressQueryKey(address?: string) {
  return createQueryKey('fuulReferrerForAddress', address);
}

/**
 * Returns the referrer for the current user - i.e the user who referred the current user. Returns null if the user is not referred by anyone.
 */
export function useFuulReferrerForAddress() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: fuulReferrerForAddressQueryKey(addressForQuery),
    queryFn: async (): Promise<string | null> => {
      const userAffiliatesResponse = await Fuul.getUserAffiliates({
        user_address: addressForQuery,
      });
      const userAffiliate = first(userAffiliatesResponse);

      // User is not referred by anyone
      if (userAffiliate == null) {
        return null;
      }

      // Query for any custom referral code that the referrer might have set
      const affiliateReferralCode = await Fuul.getAffiliateCode(
        userAffiliate.affiliate_address,
      );

      return affiliateReferralCode ?? userAffiliate.affiliate_address;
    },
    // The referrer shouldn't change
    refetchInterval: (query) => (query.state.data ? false : 30000),
  });
}
