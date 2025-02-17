import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';
import { MarketsCardItemButton } from 'client/pages/Markets/components/cards/MarketsCardItemButton';
import { useMarketsTopPredictedFunding } from 'client/pages/Markets/components/cards/MarketsTopPredictedFunding/useMarketsTopPredictedFunding';
import Image from 'next/image';

export function MarketsTopPredictedFunding() {
  const { topPredictedFundingRates, isLoading } =
    useMarketsTopPredictedFunding();
  const productTradingLinks = useProductTradingLinks();

  return (
    <MarketsCardContent
      title="Top Predicted Funding"
      subtitle="Annualized"
      isLoading={isLoading}
    >
      <div className="grid grid-cols-2 gap-2">
        {topPredictedFundingRates?.map(
          ({ metadata, annualizedFundingRate, productId }) => {
            return (
              <MarketsCardItemButton
                key={metadata.marketName}
                href={productTradingLinks?.[productId].link}
                label={
                  <>
                    <Image
                      src={metadata.icon.asset}
                      alt={metadata.symbol}
                      className="size-4"
                    />
                    {metadata.marketName}
                  </>
                }
                value={annualizedFundingRate}
                valueClassName={
                  annualizedFundingRate.isNegative()
                    ? 'text-negative'
                    : 'text-positive'
                }
                numberFormatSpecifier={
                  PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP
                }
              />
            );
          },
        )}
      </div>
    </MarketsCardContent>
  );
}
