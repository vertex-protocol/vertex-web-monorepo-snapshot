import { ProductEngineType } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import Image from 'next/image';
import Link from 'next/link';

interface MarketDetailsCardProps {
  marketData: StaticMarketData;
}

export function MarketDetailsCard({ marketData }: MarketDetailsCardProps) {
  const isPerp = marketData.type === ProductEngineType.PERP;

  const iconSrc = isPerp
    ? marketData.metadata.icon.asset
    : marketData.metadata.token.icon.asset;

  return (
    <div
      className={joinClassNames(
        `flex flex-col gap-y-1.5 rounded px-3.5 py-3`,
        `bg-surface-1`,
      )}
    >
      <div className="flex items-center gap-x-2.5">
        <Image
          src={iconSrc}
          alt={marketData.metadata.marketName}
          className="h-auto w-7"
        />
        <div className="flex flex-col text-xs">
          <span className="text-text-primary">
            {marketData.metadata.marketName}
          </span>
          <span className="text-text-tertiary">
            {marketData.metadata.marketDetails.subtitle}
          </span>
        </div>
      </div>
      <Divider />
      <div className="text-text-tertiary flex flex-col gap-y-3.5 text-xs">
        <span>{marketData.metadata.marketDetails.description}</span>
        <span>
          Description provided by{' '}
          <LinkButton
            color="white"
            as={Link}
            href={marketData.metadata.marketDetails.cmcLink}
            external
          >
            CoinMarketCap
          </LinkButton>
        </span>
      </div>
    </div>
  );
}
