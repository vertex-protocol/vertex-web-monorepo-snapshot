/**
 * Product IDs that are referenced in multiple places in the codebase.
 */
export const KNOWN_PRODUCT_IDS = {
  wethMantleSepolia: 3,
  wethMantle: 93,
  wethBase: 117,
  blast: 113,
  blastPerp: 114,
  wethBlastSepolia: 3,
  wethBlast: 91,
  wethArb: 3,
  wmnt: 109,
  wsei: 115,
  trumpWinArb: 121,
  harrisWinArb: 125,
  trumpWinBase: 123,
  harrisWinBase: 127,
  degenPerp: 140,
} as const;

export const ELECTION_PRODUCT_IDS: number[] = [
  KNOWN_PRODUCT_IDS.trumpWinArb,
  KNOWN_PRODUCT_IDS.harrisWinArb,
  KNOWN_PRODUCT_IDS.trumpWinBase,
  KNOWN_PRODUCT_IDS.harrisWinBase,
];
