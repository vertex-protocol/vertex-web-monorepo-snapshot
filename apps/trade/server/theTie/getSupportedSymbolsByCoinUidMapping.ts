import { TOKEN_ICONS } from '@vertex-protocol/metadata';
import { fetchV1Data } from 'server/theTie/fetchV1Data';

// set of tickers for tokens that we support (eg. 'BTC' ticker for TOKEN_ICONS.btc)
// this method is less than ideal, should be reworked when we have a better way to get all symbols
const SUPPORTED_TOKEN_TICKERS = new Set(
  Object.keys(TOKEN_ICONS).map((token) => token.toUpperCase()),
);

/**
 * The Tie API response schema for the /coins endpoint
 */
interface TheTieCoinsResponse {
  data: TheTieCoinUidItem[];
}

/**
 * For each coin returned by The Tie, we're only interested in the coin's ticker and its coin_uid
 *
 * Example: {ticker: "BTC", uid: "bitcoin"}
 */
interface TheTieCoinUidItem {
  ticker: string;
  uid: string;
}

type TheTieCoinTickerByCoinUid = Map<string, string>;

// use a promise to ensure that we only fetch the coin uids once (~550kb)
let fetchingPromise: Promise<void> | undefined;

const cachedSupportedCoinUids: TheTieCoinTickerByCoinUid = new Map<
  string,
  string
>();

/**
 * getSupportedSymbolsByCoinUidMapping returns a map of tokens we support where each key is The Tie's coin_uid
 * with the value its ticker/symbol (eg. 'BTC' for Bitcoin).
 * It returns a cached map if it was already fetched, otherwise it fetches the data once.
 *
 * Example: { 'bitcoin': 'BTC', 'ethereum': 'ETH', ... }
 *
 * @returns {TheTieCoinTickerByCoinUid} a map of coin uids to their tickers
 */
export async function getSupportedSymbolsByCoinUidMapping(): Promise<
  Readonly<TheTieCoinTickerByCoinUid>
> {
  if (!fetchingPromise) {
    // there's no promise fetching coin uids yet, start one
    fetchingPromise = (async () => {
      try {
        const resp = await fetchV1Data<TheTieCoinsResponse>('/coins');

        resp?.data
          .filter((coin: TheTieCoinUidItem) => {
            // include this coin id if its ticker matches one of our supported tokens
            return SUPPORTED_TOKEN_TICKERS.has(coin.ticker);
          })
          .forEach((coin: TheTieCoinUidItem) => {
            // add the coin uid to ticker mapping in the cached map
            cachedSupportedCoinUids.set(coin.uid, coin.ticker);
          });
      } catch (e) {
        // we catch and rethrow the error to ensure that fetchingPromise is reset
        fetchingPromise = undefined;
        throw e;
      }
    })();
  }

  await fetchingPromise;

  return cachedSupportedCoinUids;
}
