import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Divider,
  formatDurationMillis,
  Icons,
  TextButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { MarketInfoCard } from 'client/components/MarketInfoCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { SentimentLabel } from 'client/modules/sentiment/components/SentimentLabel';
import { useAllMarketsSentiment } from 'client/modules/sentiment/hooks/useAllMarketsSentiment';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { MarketInfoCardsContainer } from 'client/modules/trading/components/MarketInfoCardsContainer';
import { usePerpMarketInfoCards } from 'client/pages/PerpTrading/hooks/usePerpMarketInfoCards';
import { signDependentValue } from 'client/utils/signDependentValue';
import { MARKET_SENTIMENT_PROVIDER } from 'common/environment/integrations/marketSentimentProvider';
import Image from 'next/image';

export function PerpMarketInfoCards({ className }: WithClassnames) {
  const { show } = useDialog();
  const { data: allMarketsSentiment } = useAllMarketsSentiment();
  const { productId, millisToNextFunding, perpMarketInfo, quoteSymbol } =
    usePerpMarketInfoCards();

  const marketSentiment = perpMarketInfo?.metadata.symbol
    ? allMarketsSentiment?.[perpMarketInfo.metadata.symbol]
    : undefined;

  return (
    <MarketInfoCardsContainer className={className}>
      <MarketInfoCard
        valueClassName="flex items-center gap-x-1 text-sm"
        value={
          <>
            {signDependentValue(perpMarketInfo?.latestPriceChange, {
              positive: <Icons.CaretUpFill className="text-positive" />,
              negative: <Icons.CaretDownFill className="text-negative" />,
              zero: null,
            })}
            <div
              className={joinClassNames(
                'flex items-baseline gap-x-1',
                signDependentValue(perpMarketInfo?.latestPriceChange, {
                  positive: 'text-positive',
                  negative: 'text-negative',
                  zero: 'text-text-secondary',
                }),
              )}
            >
              <DefinitionTooltip definitionId="lastPrice" decoration="none">
                {formatNumber(perpMarketInfo?.marketPrice, {
                  formatSpecifier: perpMarketInfo?.priceFormatSpecifier,
                })}
              </DefinitionTooltip>
              <span className="text-text-tertiary text-3xs">
                {formatNumber(perpMarketInfo?.marketPriceValueUsd, {
                  formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                })}
              </span>
            </div>
          </>
        }
        flashOnChangeKey={perpMarketInfo?.marketPrice}
      />
      <Divider vertical className="h-7" />
      <MarketInfoCard
        label="24h Change"
        flashOnChangeKey={perpMarketInfo?.priceChangeFrac24hr}
        value={
          <div
            className={signDependentValue(perpMarketInfo?.priceChangeFrac24hr, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-secondary',
            })}
          >
            {formatNumber(perpMarketInfo?.priceChangeFrac24hr, {
              formatSpecifier:
                PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
            })}
          </div>
        }
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="24h Volume"
        labelPostfix={quoteSymbol}
        value={formatNumber(perpMarketInfo?.quoteVolume24hr, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
        flashOnChangeKey={perpMarketInfo?.quoteVolume24hr}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="Oracle Price"
        definitionTooltipId="oraclePrice"
        value={formatNumber(perpMarketInfo?.oraclePrice, {
          formatSpecifier: perpMarketInfo?.priceFormatSpecifier,
        })}
        flashOnChangeKey={perpMarketInfo?.oraclePrice}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="Spot Index Price"
        definitionTooltipId="perpUnderlyingSpotIndexPrice"
        value={formatNumber(perpMarketInfo?.indexPrice, {
          formatSpecifier: perpMarketInfo?.priceFormatSpecifier,
        })}
        flashOnChangeKey={perpMarketInfo?.indexPrice}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="Open Interest"
        labelPostfix={quoteSymbol}
        definitionTooltipId="perpOpenInterest"
        value={formatNumber(perpMarketInfo?.openInterestQuote, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
        flashOnChangeKey={perpMarketInfo?.openInterestQuote}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="Predicted Funding"
        definitionTooltipId="perpFundingRate1h"
        value={
          <div
            className={signDependentValue(
              perpMarketInfo?.fundingRates?.hourly,
              {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-secondary',
              },
            )}
          >
            {formatNumber(perpMarketInfo?.fundingRates?.hourly, {
              formatSpecifier:
                PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP,
            })}
          </div>
        }
        flashOnChangeKey={perpMarketInfo?.fundingRates?.hourly}
      />
      <MarketInfoCard
        label="Countdown"
        value={formatDurationMillis(millisToNextFunding, {
          formatSpecifier: TimeFormatSpecifier.MM_SS,
        })}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="Annualized Funding"
        value={
          <div
            className={signDependentValue(
              perpMarketInfo?.fundingRates?.annualized,
              {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-secondary',
              },
            )}
          >
            {formatNumber(perpMarketInfo?.fundingRates?.annualized, {
              formatSpecifier:
                PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
            })}
          </div>
        }
      />

      {/* Show market sentiment if available */}
      {marketSentiment && (
        <>
          <Divider vertical className="h-6" />
          <div className="flex items-center gap-x-1 px-2">
            {MARKET_SENTIMENT_PROVIDER.logo && (
              <Image
                src={MARKET_SENTIMENT_PROVIDER.logo}
                alt={MARKET_SENTIMENT_PROVIDER.name}
                className="w-10"
              />
            )}
            <MarketInfoCard
              label="24h Sentiment"
              // This seems to be required for proper width on webkit. Without this, the divider to the right will be squished right to the label
              className="w-max"
              definitionTooltipId="sentimentLabel"
              value={<SentimentLabel score={marketSentiment.sentiment['1d']} />}
            />
          </div>
        </>
      )}

      {/* Market details entrypoint is pushed to the very right for large screens */}
      <Divider vertical className="ml-auto h-6" />
      <TextButton
        className="px-2 text-xs"
        startIcon={<Icons.Info />}
        onClick={() => {
          if (!productId) {
            return;
          }
          show({
            type: 'market_details',
            params: {
              productId,
            },
          });
        }}
      >
        Market Details
      </TextButton>
    </MarketInfoCardsContainer>
  );
}
