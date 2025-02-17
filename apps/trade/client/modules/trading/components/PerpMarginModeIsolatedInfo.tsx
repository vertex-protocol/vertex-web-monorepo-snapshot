import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { DiscList } from '@vertex-protocol/web-ui';

export function PerpMarginModeIsolatedInfo() {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  return (
    <DiscList.Container>
      <DiscList.Item>Margin is isolated to one position.</DiscList.Item>
      <DiscList.Item>
        Only {primaryQuoteSymbol} can be used as margin.
      </DiscList.Item>
      <DiscList.Item>Max 1 isolated position per market.</DiscList.Item>
    </DiscList.Container>
  );
}
