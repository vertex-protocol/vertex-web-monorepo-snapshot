import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { PairMetadata } from 'client/modules/pools/types';

export function LpInfoPanelTokenPairHeader({
  metadata,
}: {
  metadata: PairMetadata | undefined;
}) {
  if (!metadata) {
    return null;
  }

  const marketName = `${metadata.base.symbol}-${metadata.quote.symbol}`;

  return (
    <div className="flex items-center gap-x-2">
      <TokenPairIcons
        first={{
          alt: metadata.base.symbol,
          src: metadata.base.icon.asset,
        }}
        second={{
          alt: metadata.quote.symbol,
          src: metadata.quote.icon.asset,
        }}
        size={25}
      />
      <div className="flex flex-col">
        <span className="text-text-primary">{marketName}</span>
        <span className="text-accent text-xs">POOL</span>
      </div>
    </div>
  );
}
