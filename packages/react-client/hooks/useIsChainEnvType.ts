import { useVertexMetadataContext } from '../context';

export function useIsChainEnvType() {
  const {
    primaryChainEnvMetadata: { chainEnvType },
  } = useVertexMetadataContext();

  const isArb = chainEnvType === 'arbitrum';
  const isBase = chainEnvType === 'base';
  const isBlast = chainEnvType === 'blast';
  const isMantle = chainEnvType === 'mantle';
  const isSei = chainEnvType === 'sei';
  const isSonic = chainEnvType === 'sonic';
  const isAvax = chainEnvType === 'avax';

  return {
    isArb,
    isBase,
    isBlast,
    isMantle,
    isSei,
    isSonic,
    isAvax,
  };
}
