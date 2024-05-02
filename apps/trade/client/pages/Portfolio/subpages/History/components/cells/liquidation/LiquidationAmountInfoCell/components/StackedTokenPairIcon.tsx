import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { PairMetadata } from 'client/modules/pools/types';
import Image from 'next/image';

export interface Props {
  metadata: PairMetadata;
}

export function StackedTokenPairIcon({
  metadata,
  className,
}: WithClassnames<Props>) {
  return (
    <div
      className={joinClassNames('relative flex h-fit flex-col pt-5', className)}
    >
      <Image
        width={28}
        height={28}
        src={metadata.quote.icon.asset}
        alt={metadata.quote.symbol}
        className="bg-surface-1 ring-stroke relative bottom-px rounded-full ring-2"
      />
      {/* This component is ordered last so we don't need to worry about z-index causing issues elsewhere */}
      <Image
        width={28}
        height={28}
        src={metadata.base.icon.asset}
        alt={metadata.base.symbol}
        className="bg-surface-1 ring-stroke absolute top-px rounded-full ring-2"
      />
    </div>
  );
}
