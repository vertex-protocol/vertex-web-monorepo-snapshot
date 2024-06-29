import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { WithChildren } from '@vertex-protocol/web-common';
import {
  ARB_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { vertexReferralCodeAtom } from 'client/store/referralsStore';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { USDC_ARB_ONE } from 'common/productMetadata/arbitrum/tokens';
import { PRIMARY_QUOTE_SYMBOLS } from 'common/productMetadata/primaryQuoteSymbols';
import { Token } from 'common/productMetadata/types';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Address } from 'viem';

interface FuulReferralsContextData {
  /**
   * Referral code in the URL query param on initial launch of the app
   */
  referralCodeForSession: string | undefined;
  setReferralCodeForSession: Dispatch<SetStateAction<string | undefined>>;
  apiKey: string;
  /**
   * The token that rewards are paid in (USDC)
   */
  payoutToken: Token;
  /**
   * Volumes are tracked in this currency
   */
  volumeAmountSymbol: string;
  /**
   * The address to execute claiming rewards
   */
  claimContractAddress: Address;
  /**
   * The address of the Fuul contract for Vertex
   */
  projectAddress: Address;
  /**
   * Subgraph endpoint to query on-chain rewards
   */
  subgraphEndpoint: string;
  /**
   * Chain env corresponding to the chain that rewards are claimed on
   */
  rewardsChainEnv: ChainEnv;
}

const FuulReferralsContext = createContext<FuulReferralsContextData>(
  {} as FuulReferralsContextData,
);

Fuul.init({ apiKey: SENSITIVE_DATA.fuulApiKey });

export function FuulReferralsProvider({ children }: WithChildren) {
  const isEnabled = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);
  const { mutate: mutateSendPageView } = useMutation({
    mutationFn: ({ route }: { route: string }) => Fuul.sendPageview(route),
  });
  const { asPath } = useRouter();

  const [referralCodeForSession, setReferralCodeForSession] = useAtom(
    vertexReferralCodeAtom,
  );

  // Send page view on route change
  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    mutateSendPageView({ route: asPath });
  }, [asPath, isEnabled, mutateSendPageView]);

  const value = useMemo(
    (): FuulReferralsContextData =>
      ({
        referralCodeForSession: referralCodeForSession,
        setReferralCodeForSession: setReferralCodeForSession,
        apiKey: SENSITIVE_DATA.fuulApiKey,
        payoutToken: USDC_ARB_ONE,
        volumeAmountSymbol: PRIMARY_QUOTE_SYMBOLS.usdc,
        claimContractAddress: '0xC38E3A10B5818601b29c83F195E8b5854AAE45aF',
        projectAddress: '0xc063390e478c5b230d4d06283d90930c0af9cc96',
        subgraphEndpoint:
          'https://subgraph.satsuma-prod.com/64a0e71a7397/fuul-team--611570/arbitrum/api',
        rewardsChainEnv: 'arbitrum',
      }) as const,
    [referralCodeForSession, setReferralCodeForSession],
  );

  return (
    <FuulReferralsContext.Provider value={value}>
      {children}
    </FuulReferralsContext.Provider>
  );
}

// Hook to consume context
export const useFuulReferralsContext = () => useContext(FuulReferralsContext);
