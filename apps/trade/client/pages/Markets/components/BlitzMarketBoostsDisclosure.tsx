'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Card,
  COMMON_TRANSPARENCY_COLORS,
  Icons,
  TextButton,
} from '@vertex-protocol/web-ui';
import { NewPill } from 'client/components/NewPill';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { BlitzBoostedMarketItem } from 'client/modules/rewards/components/BlitzBoostedMarketItem';
import { useBlitzMarketBoosts } from 'client/modules/rewards/hooks/useBlitzMarketBoosts';

export function BlitzMarketBoostsDisclosure({ className }: WithClassnames) {
  const isBlitz = useIsEnabledForBrand(['blitz']);
  const marketBoosts = useBlitzMarketBoosts();
  const { shouldShow, dismiss } = useShowUserDisclosure('blitz_market_boosts');

  if (!isBlitz || !shouldShow || !marketBoosts?.length) {
    return null;
  }

  return (
    <Card
      className={joinClassNames(
        'relative',
        COMMON_TRANSPARENCY_COLORS.borderAccent,
        'flex flex-col items-start gap-y-3',
        'p-4 text-xs lg:text-sm',
        COMMON_TRANSPARENCY_COLORS.bgAccent,
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        <NewPill />
        <div className="text-text-primary text-base sm:text-base">
          Market Boosts 🔥
        </div>
      </div>
      <p className="text-text-tertiary">
        Trade these markets, earn extra rewards
      </p>
      <div
        className={joinClassNames(
          'flex flex-col gap-y-3',
          'sm:flex-row sm:gap-x-12',
          'text-sm',
        )}
      >
        {marketBoosts.map(
          ({ productId, metadata, marketName, pointsMultiplier }) => (
            <BlitzBoostedMarketItem
              key={productId}
              productId={productId}
              metadata={metadata}
              marketName={marketName}
              pointsMultiplier={pointsMultiplier}
            />
          ),
        )}
      </div>
      <TextButton
        startIcon={<Icons.X />}
        onClick={dismiss}
        className="absolute right-3 top-3 p-1"
      />
    </Card>
  );
}
