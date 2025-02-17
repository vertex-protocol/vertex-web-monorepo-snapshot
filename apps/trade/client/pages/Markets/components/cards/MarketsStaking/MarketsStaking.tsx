'use client';

import {
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useStakingV2Rewards } from 'client/modules/staking/hooks/useStakingV2Rewards';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';

import cardBg from 'client/pages/Markets/components/cards/MarketsStaking/staking-card-bg.png';

export function MarketsStaking() {
  const {
    protocolTokenMetadata: {
      token: { symbol: protocolTokenSymbol },
    },
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const {
    apr: stakingV2Apr,
    lastUsdcDistributionAmount,
    isLoading,
  } = useStakingV2Rewards();

  return (
    <MarketsCardContent
      title={`${protocolTokenSymbol} Staking`}
      bgImage={cardBg}
      contentClassName="flex items-center justify-between px-3.5 sm:px-7"
      isLoading={isLoading}
    >
      <ValueWithLabel.Vertical
        sizeVariant="sm"
        sizeVariantOverrides={{ value: 'lg' }}
        label="Staking Apr"
        value={stakingV2Apr}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
      <ValueWithLabel.Vertical
        className="items-end"
        sizeVariant="sm"
        sizeVariantOverrides={{ value: 'lg' }}
        label="Last Distribution"
        value={lastUsdcDistributionAmount}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_SI_3SF}
        valueEndElement={primaryQuoteSymbol}
      />
    </MarketsCardContent>
  );
}
