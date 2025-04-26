import { TimeInSeconds } from '@vertex-protocol/client';

/**
 * Product IDs that will be delisted soon, used to show relevant information in the UI
 */
export const PENDING_DELIST_PERP_PRODUCT_IDS: Set<number> = new Set();

// Thursday, February 13, 2025 2:00:00 PM UTC
export const DELIST_REDUCE_ONLY_TIME_MILLIS = 1739455200000;
// Thursday, February 20, 2025 2:00:00 PM UTC
export const DELIST_TIME_MILLIS =
  DELIST_REDUCE_ONLY_TIME_MILLIS + TimeInSeconds.DAY * 7 * 1000;

export const DELISTED_PRODUCT_IDS: Set<number> = new Set([
  // SCR
  138,
  // ZRO
  132,
  // ATOM
  86,
  // STX
  68,
  // DEGEN
  140,
  // BRETT
  144,
]);
