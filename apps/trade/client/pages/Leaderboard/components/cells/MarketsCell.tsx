import { joinClassNames } from '@vertex-protocol/web-common';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SharedProductMetadata } from '@vertex-protocol/metadata';
import Image from 'next/image';

export function MarketsCell({ markets }: { markets: SharedProductMetadata[] }) {
  const [displayedMarkets, overflowMarkets] = [
    markets.slice(0, 4),
    markets.slice(4, markets.length),
  ];

  return (
    <TableCell>
      {displayedMarkets.map((market) => (
        <Image
          key={market.marketName}
          className="-mr-2 size-6"
          src={market.icon.asset}
          alt={market.marketName}
        />
      ))}
      {/* Only show 4 market icons, anything more we show it as a number */}
      {overflowMarkets.length > 0 && (
        <div
          className={joinClassNames(
            'flex items-center justify-center',
            'bg-surface-2 size-6 rounded-full',
            'text-2xs text-white',
          )}
        >
          +{overflowMarkets.length}
        </div>
      )}
    </TableCell>
  );
}
