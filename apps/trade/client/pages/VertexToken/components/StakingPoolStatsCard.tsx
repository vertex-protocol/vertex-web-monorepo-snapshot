'use client';

import { VOVRTX_INFO } from '@vertex-protocol/metadata';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useTokenStakingPool } from 'client/modules/rewards/hooks/useTokenStakingPool';
import { LINKS } from 'common/brandMetadata/links/links';
import Image from 'next/image';
import Link from 'next/link';

export function StakingPoolStatsCard() {
  const {
    poolTotalScore,
    poolTotalStaked,
    poolLiquidSupplyFraction,
    primaryQuoteToken,
    protocolTokenMetadata,
    poolAprAvg,
    lastRewardsDistributionAmount,
  } = useTokenStakingPool();
  const { isOnProtocolTokenChainEnv } = useSwitchToProtocolTokenChainEnv();

  if (!isOnProtocolTokenChainEnv) {
    return null;
  }

  return (
    <RewardsCard.Container>
      <RewardsCard.Header
        contentWrapperClassName="flex items-center gap-x-2"
        endElement={
          <RewardsCard.HeaderLinkButton
            as={Link}
            external
            href={LINKS.stats}
            withExternalIcon
            colorVariant="primary"
            className="text-xs"
          >
            Protocol Revenue
          </RewardsCard.HeaderLinkButton>
        }
      >
        <Image
          src={VOVRTX_INFO.icon.asset}
          alt={VOVRTX_INFO.symbol}
          className="h-10 w-auto"
        />
        Staking Pool Stats
      </RewardsCard.Header>
      <RewardsCard.MetricsPane>
        <ValueWithLabel.Vertical
          label="Total Staked"
          value={poolTotalStaked}
          valueEndElement={protocolTokenMetadata.token.symbol}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
        />
        <ValueWithLabel.Vertical
          label="% of Liquid Supply"
          value={poolLiquidSupplyFraction}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Vertical
          label="voVRTX Pool Size"
          tooltip={{ id: 'stakingPoolSize' }}
          value={poolTotalScore}
          valueEndElement={VOVRTX_INFO.symbol}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
        />
        <ValueWithLabel.Vertical
          label="Avg. Staking Rewards"
          tooltip={{ id: 'stakingPoolAvgStakingRewards' }}
          value={poolAprAvg}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Vertical
          label="7d Protocol Fees Distribution"
          tooltip={{ id: 'stakingFeeDistribution' }}
          value={lastRewardsDistributionAmount}
          valueEndElement={primaryQuoteToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
      </RewardsCard.MetricsPane>
    </RewardsCard.Container>
  );
}
