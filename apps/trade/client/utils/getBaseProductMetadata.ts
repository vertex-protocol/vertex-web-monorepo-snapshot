import {
  BaseProductMetadata,
  PerpProductMetadata,
  SpotProductMetadata,
} from 'common/productMetadata/types';

/**
 * Get the base product metadata
 * @param metadata - SpotProductMetadata | PerpProductMetadata
 * @returns the base metadata between both spot and perp products - BaseProductMetadata
 * */
export function getBaseProductMetadata(
  metadata: SpotProductMetadata | PerpProductMetadata,
): BaseProductMetadata {
  if ('token' in metadata) {
    return {
      name: metadata.token.name,
      symbol: metadata.token.symbol,
      icon: metadata.token.icon,
    };
  }
  return {
    name: metadata.name,
    symbol: metadata.symbol,
    icon: metadata.icon,
  };
}
