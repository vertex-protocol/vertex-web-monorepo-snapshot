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
          alt: metadata.base.name,
          src: metadata.base.icon.asset,
        }}
        second={{
          alt: metadata.quote.name,
          src: metadata.quote.icon.asset,
        }}
        size={25}
      />
      <div className="flex flex-col">
        <span className="text-text-primary text-sm">{marketName}</span>
        <span className="text-accent leading-3">POOL</span>
      </div>
    </div>
  );
}
