import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { LINKS } from 'common/brandMetadata/links/links';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { VOVRTX_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  poolTotalStaked: BigDecimal | undefined;
  poolLiquidSupplyFraction: BigDecimal | undefined;
  poolTotalScore: BigDecimal | undefined;
  poolAvgApr: BigDecimal | undefined;
  lastRewardsDistributionAmount: BigDecimal | undefined;
  usdcSymbol: string;
}

export function TokenStakingPoolStats({
  poolTotalStaked,
  poolLiquidSupplyFraction,
  poolTotalScore,
  poolAvgApr,
  lastRewardsDistributionAmount,
  usdcSymbol,
}: Props) {
  const { protocolTokenMetadata } = useVertexMetadataContext();

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
          className="h-10 w-10"
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
          value={poolAvgApr}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Vertical
          label="7d Protocol Fees Distribution"
          tooltip={{ id: 'stakingFeeDistribution' }}
          value={lastRewardsDistributionAmount}
          valueEndElement={usdcSymbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
      </RewardsCard.MetricsPane>
    </RewardsCard.Container>
  );
}
