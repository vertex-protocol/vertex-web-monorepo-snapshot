import { BigDecimals, IndexerMarketSnapshot } from '@vertex-protocol/client';
import { mapValues } from 'lodash';

/**
 * Computes the total trading fees for each product ID by subtracting the cumulative sequencer fees
 * from the cumulative taker fees in a market snapshot.
 *
 * @param {IndexerMarketSnapshot | undefined} marketSnapshot - The market snapshot data containing
 * cumulative fees and other related information. If undefined, the function returns an empty object.
 * @returns {Object} - An object mapping each product ID to its total trading fees.
 * The total trading fees are calculated as:
 * `cumulativeTakerFee - cumulativeSequencerFee` for each product ID.
 */
export function getTotalTradingFeesByProductId(
  marketSnapshot: IndexerMarketSnapshot | undefined,
) {
  return mapValues(
    marketSnapshot?.cumulativeTakerFees,
    (cumulativeTakerFee, productId) => {
      const productIdAsNum = Number(productId);
      const cumulativeSequencerFee =
        marketSnapshot?.cumulativeSequencerFees?.[productIdAsNum] ??
        BigDecimals.ZERO;

      return cumulativeTakerFee.minus(cumulativeSequencerFee);
    },
  );
}
