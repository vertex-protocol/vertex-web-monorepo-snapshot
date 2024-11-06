import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { get } from 'lodash';
import Link from 'next/link';

export function StakingTradeButton() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const productTradingLinks = useProductTradingLinks();

  const vrtxTradingLink =
    get(productTradingLinks, protocolTokenMetadata.productId, undefined)
      ?.link ?? '';

  return (
    <SecondaryButton
      className="min-w-40"
      size="base"
      as={Link}
      href={vrtxTradingLink}
    >
      Buy {protocolTokenMetadata.token.symbol}
    </SecondaryButton>
  );
}
