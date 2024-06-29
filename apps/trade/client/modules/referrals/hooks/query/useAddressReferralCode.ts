import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';

export function addressReferralCodeQueryKey(address?: string) {
  return createQueryKey('addressReferralCode', address);
}

/**
 * Returns referral code data for the current address
 */
export function useAddressReferralCode() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();

  const addressForQuery = address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressReferralCodeQueryKey(addressForQuery),
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
