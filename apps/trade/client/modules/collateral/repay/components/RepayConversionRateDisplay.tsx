import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';

interface Props {
  market: AnnotatedSpotMarket | undefined;
  repayConversionPrice: BigDecimal | undefined;
}

export function RepayConversionRateDisplay({
  className,
  market,
  repayConversionPrice,
}: WithClassnames<Props>) {
  const { primaryQuoteToken } = useVertexMetadataContext();

  // Add a placeholder to prevent the UI from shrinking when the conversion rate isn't loaded
  // Without this, the dropdown menu is clipped
  if (!market || !repayConversionPrice) {
    return <div className="h-4" />;
  }

  const formattedConversionPrice = formatNumber(repayConversionPrice, {
    formatSpecifier: getMarketPriceFormatSpecifier(market.priceIncrement),
  });

  return (
    <div
      className={joinClassNames(
        'text-2xs text-text-secondary flex items-center gap-x-1.5',
        className,
      )}
    >
      <DefinitionTooltip
        definitionId="repayConvertEstimatedPrice"
        decoration={{ icon: { size: 14 } }}
      />
      {`1 ${market.metadata.token.symbol} ≈ ${formattedConversionPrice} ${primaryQuoteToken.symbol}`}
    </div>
  );
}
