import { SharedProductMetadata } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { get } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  productId: number;
  pointsMultiplier: number;
  metadata: SharedProductMetadata;
  marketName: string;
}

export function BlitzBoostedMarketItem({
  productId,
  pointsMultiplier,
  metadata,
  marketName,
}: Props) {
  const productTradingLinks = useProductTradingLinks();

  return (
    <div className="flex items-center gap-x-3 text-xs">
      <Image
        src={metadata.icon.asset}
        alt={metadata.symbol}
        className="h-6 w-auto"
      />
      <LinkButton
        as={Link}
        colorVariant="primary"
        href={get(productTradingLinks, productId, undefined)?.link ?? ''}
      >
        {marketName}
      </LinkButton>
      <div className="text-positive ml-auto">{pointsMultiplier}x points</div>
    </div>
  );
}
