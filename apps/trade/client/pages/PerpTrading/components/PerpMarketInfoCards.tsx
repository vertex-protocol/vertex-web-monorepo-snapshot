import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { MarketInfoCard } from 'client/components/MarketInfoCard';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { ElixirEntryPoint } from 'client/modules/trading/components/ElixirEntryPoint';
import { MarketInfoCardsContainer } from 'client/modules/trading/components/MarketInfoCardsContainer';
import { usePerpMarketInfoCards } from 'client/pages/PerpTrading/hooks/usePerpMarketInfoCards';
import { formatNumber } from '@vertex-protocol/react-client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

export const PerpMarketInfoCards = ({ className }: WithClassnames) => {
  const { trackEvent } = useAnalyticsContext();
  const { productId, millisToNextFunding, perpMarketInfo, quoteSymbol } =
    usePerpMarketInfoCards();

  return (
    <MarketInfoCardsContainer className={className}>
      <MarketInfoCard
        value={
          <div className="text-text-primary flex h-max items-center gap-x-2 text-sm">
            {signDependentValue(perpMarketInfo?.latestPriceChange, {
              positive: <Icons.BsCaretUpFill className="text-positive" />,
              negative: <Icons.BsCaretDownFill className="text-negative" />,
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
          </div>
        }
      />
      <div className="flex w-full items-center gap-x-3 px-3">
        <Divider vertical className="h-7" />
        <MarketInfoCard
          label="24h Change"
          value={
            <div
              className={signDependentValue(
                perpMarketInfo?.priceChangeFrac24hr,
                {
                  positive: 'text-positive',
                  negative: 'text-negative',
                  zero: 'text-text-secondary',
                },
              )}
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
        />
        <Divider vertical className="h-6" />
        <MarketInfoCard
          label="Oracle Price"
          definitionTooltipId="oraclePrice"
          value={formatNumber(perpMarketInfo?.oraclePrice, {
            formatSpecifier: perpMarketInfo?.priceFormatSpecifier,
          })}
        />
        <Divider vertical className="h-6" />
        <MarketInfoCard
          label="Spot Index Price"
          definitionTooltipId="perpUnderlyingSpotIndexPrice"
          value={formatNumber(perpMarketInfo?.indexPrice, {
            formatSpecifier: perpMarketInfo?.priceFormatSpecifier,
          })}
        />
        <Divider vertical className="h-6" />
        <MarketInfoCard
          label="Open Interest"
          labelPostfix={quoteSymbol}
          definitionTooltipId="perpOpenInterest"
          value={formatNumber(perpMarketInfo?.openInterestQuote, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
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
        />
        <MarketInfoCard
          label="Countdown"
          value={formatTimestamp(millisToNextFunding, {
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
        <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
          {/* Pushed to the very right for large screens */}
          <Divider vertical className="flex h-6 sm:hidden" />
          {/* Padding and margin layout for larger/smaller screens */}
          <div className="pr-3 lg:ml-auto lg:pl-4 lg:pr-0">
            <ElixirEntryPoint
              productId={productId}
              onClick={() =>
                trackEvent({
                  type: 'elixir_entrypoint_clicked',
                  data: {
                    entrypoint: 'perps',
                  },
                })
              }
            />
          </div>
        </ChainSpecificContent>
      </div>
    </MarketInfoCardsContainer>
  );
};
