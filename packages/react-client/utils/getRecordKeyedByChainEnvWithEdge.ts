import { clone } from 'lodash';
import { ChainEnvWithEdge } from '../types';
import { ALL_CHAIN_ENVS } from '@vertex-protocol/client';

/**
 * Gets record keyed by ChainEnvWithEdge with provided initialValue
 * @param initialValue
 * @returns
 */
export function getRecordKeyedByChainEnvWithEdge<TValue>(
  initialValue: TValue,
): Record<ChainEnvWithEdge, TValue> {
  // The clone function ensures that a new instance of initialValue is created for each key to prevent unintended shared references between the properties in the returned object.
  return ([...ALL_CHAIN_ENVS, 'edge'] as const).reduce(
    (acc, chainEnvWithEdge) => {
      acc[chainEnvWithEdge] = clone(initialValue);
      return acc;
    },
    {} as Record<ChainEnvWithEdge, TValue>,
  );
}
