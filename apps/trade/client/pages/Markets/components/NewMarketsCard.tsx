import { ProductEngineType } from '@vertex-protocol/client';
import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { useNewMarkets } from 'client/hooks/markets/useNewMarkets';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import Image from 'next/image';
import { ReactNode } from 'react';

interface MarketListContainerProps {
  title: string;
  content: ReactNode;
}

function MarketListContainer({ title, content }: MarketListContainerProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-text-primary w-max text-sm font-medium">
        {title}
      </span>
      <div
        className={joinClassNames(
          'grid w-max gap-x-8 gap-y-3.5',
          'grid-cols-2 lg:grid-flow-col lg:grid-cols-none lg:grid-rows-2',
        )}
      >
        {content}
      </div>
    </div>
  );
}

interface MarketListItemProps {
  iconSrc: NextImageSrc;
  alt: string;
  productId: number;
  marketName: string;
}

function MarketListItem({
  iconSrc,
  alt,
  productId,
  marketName,
}: MarketListItemProps) {
  const pushTradePage = usePushTradePage();

  return (
    <div className="flex w-max items-center gap-x-2.5">
      <Image src={iconSrc} alt={alt} width={16} height={16} />
      <LinkButton
        color="white"
        className="text-sm"
        onClick={() =>
          pushTradePage({
            productId: productId,
          })
        }
      >
        {marketName}
      </LinkButton>
    </div>
  );
}

export function NewMarketsCard() {
  const allNewMarkets = useNewMarkets();

  const newMarkets = (() => {
    return (
      <MarketListContainer
        title="New Markets"
        content={
          <>
            {allNewMarkets.map((market) => {
              if (market.type === ProductEngineType.SPOT) {
                return (
                  <MarketListItem
                    key={market.metadata.marketName}
                    iconSrc={market.metadata.token.icon.asset}
                    alt={market.metadata.token.symbol}
                    productId={market.productId}
                    marketName={market.metadata.marketName}
                  />
                );
              } else {
                return (
                  <MarketListItem
                    key={market.metadata.marketName}
                    iconSrc={market.metadata.icon.asset}
                    alt={market.metadata.symbol}
                    productId={market.productId}
                    marketName={market.metadata.marketName}
                  />
                );
              }
            })}
          </>
        }
      />
    );
  })();

  // Render null if no new markets
  if (!allNewMarkets.length) {
    return null;
  }

  return (
    <Card className="bg-overlay-accent/20 ring-accent min-w-max p-4">
      {newMarkets}
    </Card>
  );
}
