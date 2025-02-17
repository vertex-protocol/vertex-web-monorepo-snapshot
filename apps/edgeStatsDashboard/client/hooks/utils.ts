import { ChainEnvWithEdge } from 'client/hooks/types';
import { clone } from 'lodash';

/**
 * Gets record keyed by ChainEnvWithEdge with provided initialValue
 * @param initialValue
 * @returns
 */
export function getRecordKeyedByChainEnvWithEdge<TValue>(
  initialValue: TValue,
): Record<ChainEnvWithEdge, TValue> {
  return {
    // The clone function ensures that a new instance of initialValue is created for each key to prevent unintended shared references between the properties in the returned object.
    local: clone(initialValue),
    arbitrumTestnet: clone(initialValue),
    mantleTestnet: clone(initialValue),
    blastTestnet: clone(initialValue),
    arbitrum: clone(initialValue),
    mantle: clone(initialValue),
    blast: clone(initialValue),
    seiTestnet: clone(initialValue),
    sei: clone(initialValue),
    baseTestnet: clone(initialValue),
    base: clone(initialValue),
    sonicTestnet: clone(initialValue),
    sonic: clone(initialValue),
    beraTestnet: clone(initialValue),
    abstractTestnet: clone(initialValue),
    abstract: clone(initialValue),
    edge: clone(initialValue),
  };
}
