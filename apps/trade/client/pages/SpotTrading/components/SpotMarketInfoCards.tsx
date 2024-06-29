import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { MarketInfoCard } from 'client/components/MarketInfoCard';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { ElixirEntryPoint } from 'client/modules/trading/components/ElixirEntryPoint';
import { MarketInfoCardsContainer } from 'client/modules/trading/components/MarketInfoCardsContainer';
import { useSpotMarketInfoCards } from 'client/pages/SpotTrading/hooks/useSpotMarketInfoCards';
import { signDependentValue } from 'client/utils/signDependentValue';

export function SpotMarketInfoCards({ className }: WithClassnames) {
  const { trackEvent } = useAnalyticsContext();
  const { productId, spotMarketInfo } = useSpotMarketInfoCards();

  return (
    <MarketInfoCardsContainer className={className}>
      <MarketInfoCard
        value={
          <div className="text-text-primary flex h-max items-center gap-x-2 text-sm">
            {signDependentValue(spotMarketInfo?.latestPriceChange, {
              positive: <Icons.BsCaretUpFill className="text-positive" />,
              negative: <Icons.BsCaretDownFill className="text-negative" />,
              zero: null,
            })}
            <div
              className={joinClassNames(
                'flex items-baseline gap-x-1',
                signDependentValue(spotMarketInfo?.latestPriceChange, {
                  positive: 'text-positive',
                  negative: 'text-negative',
                  zero: 'text-text-secondary',
                }),
              )}
            >
              <DefinitionTooltip definitionId="lastPrice" decoration="none">
                {formatNumber(spotMarketInfo?.currentPrice, {
                  formatSpecifier:
                    spotMarketInfo?.priceFormatSpecifier ??
                    CustomNumberFormatSpecifier.NUMBER_AUTO,
                })}
              </DefinitionTooltip>
              <span className="text-text-tertiary text-3xs">
                {formatNumber(spotMarketInfo?.currentPriceValueUsd, {
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
              className={signDependentValue(spotMarketInfo?.priceChange24hr, {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-secondary',
              })}
            >
              {formatNumber(spotMarketInfo?.priceChangeFrac24hr, {
                formatSpecifier:
                  PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
              })}
            </div>
          }
        />
        <Divider vertical className="h-6" />
        <MarketInfoCard
          label="24h Volume"
          labelPostfix={spotMarketInfo?.quoteSymbol}
          value={formatNumber(spotMarketInfo?.quoteVolume24hr, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        />
        {/* Pushed to the very right for large screens */}
        <Divider vertical className="flex h-6 lg:hidden" />
        {/* Padding and margin layout for larger/smaller screens */}
        <div className="pr-3 lg:ml-auto lg:pr-0">
          <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
            <ElixirEntryPoint
              productId={productId}
              onClick={() =>
                trackEvent({
                  type: 'elixir_entrypoint_clicked',
                  data: {
                    entrypoint: 'spot',
                  },
                })
              }
            />
          </ChainSpecificContent>
        </div>
      </div>
    </MarketInfoCardsContainer>
  );
}
