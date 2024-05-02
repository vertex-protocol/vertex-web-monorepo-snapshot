import { useQuery } from '@tanstack/react-query';
import { IERC20__factory } from '@vertex-protocol/client';
import {
  BigDecimal,
  sumBigDecimalBy,
  toBigDecimal,
} from '@vertex-protocol/utils';
import {
  createQueryKey,
  useIsChainType,
  usePrimaryChainPublicClient,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { Address } from 'viem';

export function vrtxTokenSupplyQueryKey() {
  return createQueryKey('vrtxTokenSupply');
}

interface Data {
  totalSupply: BigDecimal;
  liquidSupply: BigDecimal;
}

// These are valid ONLY on mainnet (this has the side-effect that totalSupply == liquidSupply on other chain envs)
const ILLIQUID_MAINNET_TOKEN_HOLDERS: Address[] = [
  '0xab7ad93C596Bf955Dc160A7b666D9709727eB7d8',
  '0x106db71d0e45B505927F8c8eE80DC5aCCF312C17',
  '0x3A1c3BD93B32553b1A1571d1907D6D0431222302',
  '0x5376B5C0ff22Df0aEFC50C99b5685EE8a368c661',
  '0xD567E52fF9549a1639E0212b7dD981aB93baae49',
  '0xF7BebFbA3D11474fE30CFf05fB538Ab3FEB54f13',
  '0xeD8411A7A1a297073f132ea0e99048A20d92fD4e',
  '0xB00A436b34D92F14Da7Fea274eF6E553758d408F',
  '0x657e6d2073A99aF61952beb7EE564169616b90C1',
];

export function useVrtxTokenSupply() {
  const { isArb } = useIsChainType();
  const vertexClient = useVertexClient();
  const publicClient = usePrimaryChainPublicClient();

  const disabled = !vertexClient || !publicClient || !isArb;

  return useQuery({
    queryKey: vrtxTokenSupplyQueryKey(),
    queryFn: async (): Promise<Data> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const supplyBI =
        await vertexClient.context.contracts.vrtxToken.totalSupply();
      const supply = toBigDecimal(supplyBI);

      // Separate illiquid multicall for better type inference
      const illiquidBalancesMulticallResult = await publicClient.multicall({
        allowFailure: false,
        contracts: ILLIQUID_MAINNET_TOKEN_HOLDERS.map((address) => {
          return {
            address: vertexClient.context.contractAddresses
              .vrtxToken as Address,
            abi: IERC20__factory.abi,
            functionName: 'balanceOf',
            args: [address],
          };
        }),
      });

      return {
        totalSupply: supply,
        liquidSupply: supply.minus(
          sumBigDecimalBy(illiquidBalancesMulticallResult, (i) =>
            toBigDecimal(i),
          ),
        ),
      };
    },
    enabled: !disabled,
    // No refetching needed as total supply is immutable and illiquid balances rarely change
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    refetchInterval: false,
  });
}
