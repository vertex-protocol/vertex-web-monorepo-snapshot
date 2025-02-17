import { getChainEnvName } from '@vertex-protocol/react-client';
import { EdgeAnnotatedSpotMarket } from 'client/hooks/types';

/**
 * This function appends the chain name to the spot market token name so it can be differentiated across multiple chains.
 * @param market
 * @returns
 */
export function getSpotMarketTokenName(market: EdgeAnnotatedSpotMarket) {
  const tokenName = market.metadata.token.symbol;

  const chainEnvName = getChainEnvName(market.chainEnv);

  return `${tokenName} (${chainEnvName})`;
}
