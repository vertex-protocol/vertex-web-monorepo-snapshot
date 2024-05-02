import { WithClassnames } from '@vertex-protocol/web-common';
import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useVrtxMarketCard } from './hooks/useVrtxMarketCard';
import { VrtxMarketMetrics } from './VrtxMarketMetrics';
import { VrtxPriceChart } from './VrtxPriceChart';
import { VrtxPriceHeaderMetric } from './VrtxPriceHeaderMetric';

export function VrtxMarketCard({ className }: WithClassnames) {
  const {
    tokens,
    currentPrice,
    liquidTokenSupply,
    marketCapUsd,
    marketPriceFormatSpecifier,
    pastDayPriceChangeFrac,
    pastDayVolumeQuote,
    percentStaked,
    onTradeClick,
  } = useVrtxMarketCard();

  return (
    <RewardsCard.Container className={className}>
      <RewardsCard.Header
        endElement={
          <RewardsCard.HeaderLinkButton
            color="white"
            onClick={onTradeClick}
            withExternalIcon
          >
            Trade
          </RewardsCard.HeaderLinkButton>
        }
        contentWrapperClassName="flex items-center gap-x-2"
      >
        <TokenPairIcons
          first={{
            alt: tokens.protocolToken.symbol,
            src: tokens.protocolToken.icon.asset,
          }}
          second={{
            alt: tokens.primaryQuoteToken.symbol,
            src: tokens.primaryQuoteToken.icon.asset,
          }}
          size={24}
        />
        <span>
          {tokens.protocolToken.symbol}-{tokens.primaryQuoteToken.symbol} Market
        </span>
      </RewardsCard.Header>
      <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
        <div className="flex flex-col gap-y-3 sm:flex-1">
          <VrtxPriceHeaderMetric
            currentPrice={currentPrice}
            pastDayPriceChangeFrac={pastDayPriceChangeFrac}
            priceFormatSpecifier={marketPriceFormatSpecifier}
          />
          <VrtxPriceChart
            className="sm:flex-1"
            minHeightClassName="min-h-[180px]"
          />
        </div>
        <VrtxMarketMetrics
          // Right padding to add a bit more space to the metrics
          className="pr-4"
          pastDayVolumeQuote={pastDayVolumeQuote}
          marketCapUsd={marketCapUsd}
          liquidTokenSupply={liquidTokenSupply}
          percentStaked={percentStaked}
        />
      </div>
    </RewardsCard.Container>
  );
}
