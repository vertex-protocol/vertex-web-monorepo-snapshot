import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from 'client/components/LinkButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/consts';
import { ReferralTier } from 'client/modules/referrals/types';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';
import tier1Icon from './assets/tier-1-icon.svg';
import tier2Icon from './assets/tier-2-icon.svg';
import tier3Icon from './assets/tier-3-icon.svg';

interface Props extends WithClassnames {
  numReferredUsers: number | undefined;
  referredVolumeUsdc: BigDecimal | undefined;
  tier: ReferralTier | undefined;
  volumeAmountSymbol: string;
}

export function ReferralsOverviewCard({
  numReferredUsers,
  referredVolumeUsdc,
  volumeAmountSymbol,
  tier,
  className,
}: Props) {
  return (
    <ReferralsCard
      title="Overview"
      titleEndElement={<TierInfo tier={tier} />}
      className={className}
    >
      <div className="flex gap-x-10">
        <ValueWithLabel.Vertical
          label="Sign Ups"
          value={numReferredUsers}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
        <ValueWithLabel.Vertical
          label="Taker Volume"
          value={referredVolumeUsdc}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          valueEndElement={volumeAmountSymbol}
        />
      </div>
      <div className="text-text-tertiary mt-auto text-sm">
        Tiers are based on referral taker volume over the past 60 days.{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.fuulReferralsDocs}
          external
        >
          Learn more
        </LinkButton>
      </div>
    </ReferralsCard>
  );
}

function TierInfo({ tier }: { tier: ReferralTier | undefined }) {
  const { icon, label, commission } = TIER_DATA[tier ?? 'Tier 1'];

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
        <span className="text-text-primary text-sm sm:text-base">{label}</span>
        <span className="text-text-tertiary text-xs sm:text-sm">
          {commission}
        </span>
      </div>
    </div>
  );
}

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
} as const satisfies Record<ReferralTier, unknown>;
