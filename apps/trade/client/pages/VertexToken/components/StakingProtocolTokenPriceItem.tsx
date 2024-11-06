import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { formatNumber } from '@vertex-protocol/react-client';
import { Value } from '@vertex-protocol/web-ui';
import BigDecimal from 'bignumber.js';
import { TokenPairIcons } from 'client/components/TokenPairIcons';

interface Props {
  marketPrice: BigDecimal | undefined;
  marketName: string | undefined;
  marketPriceFormatSpecifier: string;
  valueClassName?: string;
}

export function StakingProtocolTokenPriceItem({
  marketPrice,
  marketName,
  marketPriceFormatSpecifier,
  valueClassName,
}: Props) {
  const { protocolTokenMetadata, primaryQuoteToken } =
    useVertexMetadataContext();

  return (
    <div className="flex items-center gap-x-2.5">
      <TokenPairIcons
        first={{
          src: protocolTokenMetadata.token.icon.asset,
          alt: protocolTokenMetadata.token.symbol,
        }}
        second={{
          src: primaryQuoteToken.icon.asset,
          alt: primaryQuoteToken.symbol,
        }}
        size={24}
      />
      <div className="flex flex-col gap-y-px">
        <span className="text-text-primary text-sm">{marketName}</span>
        <Value sizeVariant="xs" className={valueClassName}>
          {formatNumber(marketPrice, {
            formatSpecifier: marketPriceFormatSpecifier,
          })}
        </Value>
      </div>
    </div>
  );
}
