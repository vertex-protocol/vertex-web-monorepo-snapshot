import { getChainEnvName } from '@vertex-protocol/react-client';
import { EdgeAnnotatedMarket } from 'client/hooks/types';

/**
 * This function appends the chain name to the market name for spot markets with identical names across multiple chains.
 * For perp markets on the edge chain environment, the chain name is omitted.
 * @param market
 * @returns
 */
export function getMarketName(market: EdgeAnnotatedMarket) {
  const marketName = market.metadata.marketName;

  if (market.chainEnv === 'edge') {
    return marketName;
  }

  const chainEnvName = getChainEnvName(market.chainEnv);

  return `${marketName} (${chainEnvName})`;
}
