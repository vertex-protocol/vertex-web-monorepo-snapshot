import { BigDecimals } from 'client/utils/BigDecimals';
import {
  bigDecimalComparator,
  booleanComparator,
} from 'client/utils/comparators';
import { TradeSwitcherItem } from './types';

// A sort fn that compares 24-hour trading volume of two markets
export function volumeComparator(a: TradeSwitcherItem, b: TradeSwitcherItem) {
  const volumeA = a.volume24h ?? BigDecimals.ZERO;
  const volumeB = b.volume24h ?? BigDecimals.ZERO;
  // Sort by volume descending
  return bigDecimalComparator(volumeA, volumeB) * -1;
}

// A sort fn that compares favorited status of two markets, if they are the same, then sort by volume
export function isFavoritedComparator(
  a: TradeSwitcherItem,
  b: TradeSwitcherItem,
) {
  // If both are favorited or both are not favorited, sort by volume
  if (a.isFavorited === b.isFavorited) {
    return volumeComparator(a, b);
  }
  // If only one is favorited, sort by it
  return booleanComparator(a.isFavorited, b.isFavorited);
}
