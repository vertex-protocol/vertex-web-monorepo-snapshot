'use client';

import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/consts';
import { useAddressReferralRewards } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';
import { ReferralTier } from 'client/modules/referrals/types';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import tier1Icon from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/assets/tier-1-icon.svg';
import tier2Icon from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/assets/tier-2-icon.svg';
import tier3Icon from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/assets/tier-3-icon.svg';
import tier4Icon from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/assets/tier-4-icon.svg';
import tier5Icon from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/assets/tier-5-icon.svg';
import Image from 'next/image';

const TIER_DATA = {
  'Tier 1': {
    icon: tier1Icon,
    label: 'Tier 1',
    commission: `${FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierOne}% commission`,
  },
  'Tier 2': {
    icon: tier2Icon,
    label: 'Tier 2',
    commission: `${FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierTwo}% commission`,
  },
  'Tier 3': {
    icon: tier3Icon,
    label: 'Tier 3',
    commission: `${FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierThree}% commission`,
  },
  'Tier 4': {
    icon: tier4Icon,
    label: 'Tier 4',
    commission: `${FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierFour}% commission`,
  },
  'Tier 5': {
    icon: tier5Icon,
    label: 'Tier 5',
    commission: `${FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierFour}% commission`,
  },
} as const satisfies Record<ReferralTier, unknown>;

export function ReferralsTierInfo() {
  const { data: referralRewardsData } = useAddressReferralRewards();

  const { icon, label, commission } =
    TIER_DATA[referralRewardsData?.tier ?? 'Tier 1'];

  return (
    <div className="flex items-center gap-x-1.5">
      <Image
        src={icon}
        alt="Tier"
        className="h-5 w-auto sm:h-6"
        priority
        quality={100}
      />
      <div className="flex items-baseline gap-x-1.5">
        <DefinitionTooltip
          contentWrapperClassName="text-text-primary text-sm sm:text-base"
          definitionId="referralsTierDetails"
        >
          {label}
        </DefinitionTooltip>
        <span className="text-text-tertiary text-xs sm:text-sm">
          {commission}
        </span>
      </div>
    </div>
  );
}