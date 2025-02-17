import { useSonicPoints } from 'client/hooks/query/points/useSonicPoints';
import { useSubaccountReferralCode } from 'client/hooks/query/subaccount/useSubaccountReferralCode';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useReferralLink } from 'client/modules/referrals/useReferralLink';

export function useSonicPointsEarnReferralsCard() {
  const { data: referralCodeData } = useSubaccountReferralCode();
  const { data: sonicPointsData } = useSonicPoints();

  const isConnected = useIsConnected();
  const requiresFirstDeposit = useRequiresInitialDeposit();
  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode: referralCodeData?.referralCode,
    isFuul: false,
  });

  return {
    baseUrlWithQueryParam,
    referralLink,
    isConnected,
    requiresFirstDeposit,
    referralCode: referralCodeData?.referralCode,
    usersReferred: sonicPointsData?.usersReferred,
  };
}
