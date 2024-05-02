import { BigDecimal } from '@vertex-protocol/client';
import { LINKS } from 'client/modules/brand/links';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
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
  const { protocolToken } = useVertexMetadataContext();

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
            color="white"
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
        <RewardsCard.MetricStackedItem
          label="Total Staked"
          value={poolTotalStaked}
          symbol={protocolToken.symbol}
          formatSpecifier={CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED}
        />
        <RewardsCard.MetricStackedItem
          label="% of Liquid Supply"
          value={poolLiquidSupplyFraction}
          formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <RewardsCard.MetricStackedItem
          label="voVRTX Pool Size"
          definitionId="stakingPoolSize"
          value={poolTotalScore}
          symbol={VOVRTX_INFO.symbol}
          formatSpecifier={CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED}
        />
        <RewardsCard.MetricStackedItem
          label="Avg. Staking Rewards"
          definitionId="stakingPoolAvgStakingRewards"
          value={poolAvgApr}
          formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <RewardsCard.MetricStackedItem
          label="7d Protocol Fees Distribution"
          definitionId="stakingFeeDistribution"
          value={lastRewardsDistributionAmount}
          symbol={usdcSymbol}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
      </RewardsCard.MetricsPane>
    </RewardsCard.Container>
  );
}
