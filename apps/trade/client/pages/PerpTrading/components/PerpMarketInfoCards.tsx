import {
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
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
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { MarketInfoCardsContainer } from 'client/modules/trading/components/MarketInfoCardsContainer';
import { usePerpMarketInfoCards } from 'client/pages/PerpTrading/hooks/usePerpMarketInfoCards';
import { FundingRatePeriodSelect } from 'client/modules/trading/components/FundingRatePeriodSelect';
import { useFundingRatePeriod } from 'client/modules/trading/hooks/useFundingRatePeriod';

export function PerpMarketInfoCards({ className }: WithClassnames) {
  const { show } = useDialog();
  const { productId, millisToNextFunding, perpMarketInfo, quoteSymbol } =
    usePerpMarketInfoCards();
  const { fundingRatePeriod } = useFundingRatePeriod();
  const fundingRate = perpMarketInfo?.fundingRates?.[fundingRatePeriod];

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
        flashOnChangeKey={perpMarketInfo?.priceChangeFrac24h}
        value={
          <div
            className={signDependentValue(perpMarketInfo?.priceChangeFrac24h, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-secondary',
            })}
          >
            {formatNumber(perpMarketInfo?.priceChangeFrac24h, {
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
        value={formatNumber(perpMarketInfo?.quoteVolume24h, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
        flashOnChangeKey={perpMarketInfo?.quoteVolume24h}
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
          <div className="flex gap-x-1">
            <div
              className={signDependentValue(fundingRate, {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-secondary',
              })}
            >
              {formatNumber(fundingRate, {
                formatSpecifier:
                  PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP,
              })}
            </div>
            {/* Reduce padding to make it fit within infobar */}
            <FundingRatePeriodSelect className="py-0" />
          </div>
        }
        flashOnChangeKey={fundingRate}
      />
      <MarketInfoCard
        label="Next Funding"
        value={formatDurationMillis(millisToNextFunding, {
          formatSpecifier: TimeFormatSpecifier.MM_SS,
        })}
      />

      {/* Market details entrypoint is pushed to the very right for large screens */}
      <Divider vertical className="ml-auto h-6" />
      <TextButton
        colorVariant="secondary"
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
