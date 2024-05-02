import { useQuery } from '@tanstack/react-query';
import { IERC20__factory } from '@vertex-protocol/client';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  useEnableSubaccountQueries,
  useEVMContext,
  useIsChainType,
  usePrimaryChainPublicClient,
} from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { Token } from 'common/productMetadata/types';
import { ZeroAddress } from 'ethers';
import { Address } from 'viem';

export function lbaTokenWalletBalancesQueryKey(address?: string) {
  return createQueryKey('lbaTokenWalletBalances', address);
}

interface TokenWithBalance extends Token {
  balanceAmount: BigDecimal;
}

interface Data {
  vrtx: TokenWithBalance;
  usdc: TokenWithBalance;
}

export function useLbaTokenWalletBalances() {
  const { isArb } = useIsChainType();
  const publicClient = usePrimaryChainPublicClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const { primaryQuoteToken, protocolToken } = useVertexMetadataContext();
  const enableSubaccountQueries = useEnableSubaccountQueries();

  const addressForQuery = address ?? ZeroAddress;
  const disabled = !publicClient || !isArb || !enableSubaccountQueries;

  const queryFn = async (): Promise<Data> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const commonMulticallArgs = {
      abi: IERC20__factory.abi,
      args: [addressForQuery as Address],
      functionName: 'balanceOf',
    } as const;

    const multicallResult = await publicClient.multicall({
      allowFailure: false,
      contracts: [
        {
          address: primaryQuoteToken.address as Address,
          ...commonMulticallArgs,
        },
        {
          address: protocolToken.address as Address,
          ...commonMulticallArgs,
        },
      ],
    });

    return {
      usdc: {
        balanceAmount: toBigDecimal(multicallResult[0]),
        ...primaryQuoteToken,
      },
      vrtx: {
        balanceAmount: toBigDecimal(multicallResult[1]),
        ...protocolToken,
      },
    };
  };

  return useQuery({
    queryKey: lbaTokenWalletBalancesQueryKey(addressForQuery),
    queryFn,
    refetchInterval: 10000,
    enabled: !disabled,
  });
}
