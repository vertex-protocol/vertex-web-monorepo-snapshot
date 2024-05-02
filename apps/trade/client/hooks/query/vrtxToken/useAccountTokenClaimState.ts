import { useQuery } from '@tanstack/react-query';
import { IAirdrop__factory, ILBA__factory } from '@vertex-protocol/client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useEVMContext,
  useIsChainType,
  usePrimaryChainPublicClient,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { ZeroAddress } from 'ethers';
import { Address } from 'viem';

export function accountTokenClaimStateQueryKey(address?: string) {
  return createQueryKey('accountTokenClaimState', address);
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
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const disabled =
    !vertexClient || !publicClient || !isArb || !enableSubaccountQueries;
  const addressForQuery = address ?? ZeroAddress;

  const queryFn = async (): Promise<AccountTokenClaimStateData> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const lbaAddress = vertexClient.context.contractAddresses
      .vrtxLba as Address;
    const airdropAddress = vertexClient.context.contractAddresses
      .vrtxAirdrop as Address;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          address: airdropAddress,
          abi: IAirdrop__factory.abi,
          args: [addressForQuery as Address],
          functionName: 'getClaimed',
        },
        {
          address: lbaAddress,
          abi: ILBA__factory.abi,
          args: [addressForQuery as Address],
          functionName: 'getClaimableRewards',
        },
        {
          address: lbaAddress,
          abi: ILBA__factory.abi,
          args: [addressForQuery as Address],
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
    queryKey: accountTokenClaimStateQueryKey(addressForQuery),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
