import { useQuery } from '@tanstack/react-query';
import { ChainEnv, VERTEX_ABIS } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  useIsChainEnvType,
  usePrimaryChainPublicClient,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { zeroAddress } from 'viem';

export function accountTokenClaimStateQueryKey(
  chainEnv?: ChainEnv,
  address?: string,
) {
  return createQueryKey('accountTokenClaimState', chainEnv, address);
}

export interface AccountTokenClaimStateData {
  // The index is the epoch with (LBA_AIRDROP_EPOCH + 1) being the first epoch for vesting rewards, and LBA_AIRDROP_EPOCH being the amount claimed to the LBA
  // Total # of tokens claimed per epoch
  claimedPerEpoch: BigDecimal[];
  // Total # of tokens available to be claimed per epoch
  totalClaimablePerEpoch: BigDecimal[];
  // Rewards for participating in LBA liquidity that have been claimed
  claimedLbaRewards: BigDecimal;
  // Rewards for for participating in LBA liquidity that can be claimed
  claimableLbaRewards: BigDecimal;
}

/**
 * A multicall query that returns a summary of an address' state in the LBA pool
 */
export function useAccountTokenClaimState() {
  const { isArb } = useIsChainEnvType();
  const vertexClient = usePrimaryChainVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();

  const disabled = !vertexClient || !publicClient || !isArb;
  const addressForQuery = address ?? zeroAddress;

  const queryFn = async (): Promise<AccountTokenClaimStateData> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const lbaAddress = vertexClient.context.contractAddresses.vrtxLba;
    const airdropAddress = vertexClient.context.contractAddresses.vrtxAirdrop;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          address: airdropAddress,
          abi: VERTEX_ABIS['vrtxAirdrop'],
          args: [addressForQuery],
          functionName: 'getClaimed',
        },
        {
          address: lbaAddress,
          abi: VERTEX_ABIS['vrtxLba'],
          args: [addressForQuery],
          functionName: 'getClaimableRewards',
        },
        {
          address: lbaAddress,
          abi: VERTEX_ABIS['vrtxLba'],
          args: [addressForQuery],
          functionName: 'getClaimedRewards',
        },
      ],
    });

    const claimVrtxProofsResponse =
      await vertexClient.context.indexerClient.getClaimVrtxMerkleProofs({
        address: addressForQuery,
      });

    return {
      claimedPerEpoch: multicallResult[0].map(toBigDecimal),
      totalClaimablePerEpoch: claimVrtxProofsResponse.map(
        (epoch) => epoch.totalAmount,
      ),
      claimableLbaRewards: toBigDecimal(multicallResult[1]),
      claimedLbaRewards: toBigDecimal(multicallResult[2]),
    };
  };

  return useQuery({
    queryKey: accountTokenClaimStateQueryKey(primaryChainEnv, addressForQuery),
    queryFn,
    enabled: !disabled,
    // Refetch logic should handle query updates
  });
}
