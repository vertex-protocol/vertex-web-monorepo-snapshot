import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider, Icons, TextButton } from '@vertex-protocol/web-ui';
import { MarketInfoCard } from 'client/components/MarketInfoCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { MarketInfoCardsContainer } from 'client/modules/trading/components/MarketInfoCardsContainer';
import { useSpotMarketInfoCards } from 'client/pages/SpotTrading/hooks/useSpotMarketInfoCards';
import { signDependentValue } from 'client/utils/signDependentValue';

export function SpotMarketInfoCards({ className }: WithClassnames) {
  const { show } = useDialog();
  const { productId, spotMarketInfo } = useSpotMarketInfoCards();

  return (
    <MarketInfoCardsContainer className={className}>
      <MarketInfoCard
        valueClassName="flex items-center gap-x-1 text-sm"
        value={
          <>
            {signDependentValue(spotMarketInfo?.latestPriceChange, {
              positive: <Icons.CaretUpFill className="text-positive" />,
              negative: <Icons.CaretDownFill className="text-negative" />,
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
          </>
        }
        flashOnChangeKey={spotMarketInfo?.currentPrice}
      />
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
        flashOnChangeKey={spotMarketInfo?.priceChangeFrac24hr}
      />
      <Divider vertical className="h-6" />
      <MarketInfoCard
        label="24h Volume"
        labelPostfix={spotMarketInfo?.quoteSymbol}
        value={formatNumber(spotMarketInfo?.quoteVolume24hr, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
        flashOnChangeKey={spotMarketInfo?.quoteVolume24hr}
      />
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
