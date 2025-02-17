import { useVertexMetadataContext } from '../context';

export function useIsChainEnvType() {
  const {
    primaryChainMetadata: { chainEnvType },
  } = useVertexMetadataContext();

  const isArb = chainEnvType === 'arbitrum';
  const isBase = chainEnvType === 'base';
  const isBlast = chainEnvType === 'blast';
  const isMantle = chainEnvType === 'mantle';
  const isSei = chainEnvType === 'sei';
  const isSonic = chainEnvType === 'sonic';

  return {
    isArb,
    isBase,
    isBlast,
    isMantle,
    isSei,
    isSonic,
  };
}
