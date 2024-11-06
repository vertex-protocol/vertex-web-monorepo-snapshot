import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { DiscList } from '@vertex-protocol/web-ui';
import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/consts';
import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';

export function ReferralTierDetailsTooltipContent() {
  return (
    <div className="flex flex-col gap-y-2">
      <TierInfo
        tierNumber={1}
        referredTakerVolume="<$5M"
        requiredStakedAmount={0}
        commissionPercentage={
          FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierOne
        }
      />
      <TierInfo
        tierNumber={2}
        referredTakerVolume=">$5M"
        requiredStakedAmount={10000}
        commissionPercentage={
          FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierTwo
        }
      />
      <TierInfo
        tierNumber={3}
        referredTakerVolume=">$10M"
        requiredStakedAmount={50000}
        commissionPercentage={
          FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierThree
        }
      />
      <TierInfo
        tierNumber={4}
        referredTakerVolume=">$20M"
        requiredStakedAmount={150000}
        commissionPercentage={
          FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierFour
        }
      />
      <TierInfo
        tierNumber={5}
        referredTakerVolume=">$40M"
        requiredStakedAmount={500000}
        commissionPercentage={
          FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierFive
        }
      />
    </div>
  );
}

function TierInfo({
  tierNumber,
  referredTakerVolume,
  requiredStakedAmount,
  commissionPercentage,
}: {
  tierNumber: number;
  requiredStakedAmount: number;
  commissionPercentage: number;
  /**
   * Pre-formatted string
   */
  referredTakerVolume: string;
}) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <span className="text-text-primary underline">Tier {tierNumber}</span>
      <DiscList.Container>
        <InfoDiscListItem label="Taker Volume" content={referredTakerVolume} />
        <InfoDiscListItem
          label="Amount Staked"
          content={`${formatNumber(requiredStakedAmount, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })} ${VRTX_TOKEN_INFO.symbol}`}
        />
        <InfoDiscListItem
          label="Commission"
          content={`${commissionPercentage}%`}
        />
      </DiscList.Container>
    </div>
  );
}

function InfoDiscListItem({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <DiscList.Item>
      <span className="text-text-primary">{label}:</span>{' '}
      <span className="text-text-secondary">{content}</span>
    </DiscList.Item>
  );
}
