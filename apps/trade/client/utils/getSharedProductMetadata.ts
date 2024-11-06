import {
  SharedProductMetadata,
  PerpProductMetadata,
  SpotProductMetadata,
} from '@vertex-protocol/metadata';

/**
 * Get the shared product metadata
 * @param metadata - SpotProductMetadata | PerpProductMetadata
 * @returns the shared metadata between both spot and perp products - SharedProductMetadata
 * */
export function getSharedProductMetadata(
  metadata: SpotProductMetadata | PerpProductMetadata,
): SharedProductMetadata {
  if ('token' in metadata) {
    return {
      marketName: metadata.marketName,
      symbol: metadata.token.symbol,
      icon: metadata.token.icon,
    };
  }
  return {
    marketName: metadata.marketName,
    symbol: metadata.symbol,
    icon: metadata.icon,
  };
}
